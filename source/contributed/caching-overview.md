---
title: 缓存概述
contributed:
    name: tedivm
    link: https://github.com/tedivm
    date: 2017-06-14
---

Screeps 是一个以性能为中心的游戏 - 性能越好，每个 tick 就能完成更多的工作。而缓存则是性能优化中极其重要的元素，在 Screeps 里使用缓存将会让你接触到许多独特的机遇和挑战。

从本质上来说，缓存的概念十分简单 - 通过把昂贵的代码执行结果保存起来，来让之后的调用变得更加简单。缓存还有另外一个好处，它可以使得运行的函数在无法得出结果的时候也正常给出返回值。这里有个简单的例子：缓存寻路结果可以使得 creep 在没有房间视野的情况下也可以正常移动，所以说，缓存可以使代码的性能更好也更加的健壮。

## 数据存储位置

### 内存（Memory）

存储缓存数据最常见位置就是 [Memory](/global-objects.html#Memory-object) 了。只有这里可以真正持久的保存数据 - 存储在 [Memory](/global-objects.html#Memory-object) 中的所有数据会一直保留直到被删除。因此，如果数据非常珍贵或必须保存，则可以把它放到内存里。

[Memory](/global-objects.html#Memory-object) 有两个主要缺点：

*   [Memory](/global-objects.html#Memory-object) 的空间最大只有 2048kb。
*   [Memory](/global-objects.html#Memory-object) 在被首次访问时会使用 JSON.parse 进行数据解析，保存的数据越多，解析开销就越大。

因为这些原因，我们很有必要限制 [Memory](/global-objects.html#Memory-object) 中保存的数据。


### 全局（Global）

[游戏循环](/game-loop.html)架构允许您在 ”loop“ 中定义每个 tick 都会执行的代码。此外，它还允许您在外部定义开销较大的一次性运行代码。这是最常用的`require` 模块 -

    // 仅在新的全局变量新建时执行
    var mod = require('mod');

    module.exports.loop = function() {
        // 每个 tick 都会执行
        mod.foo();
    }

另一个示例说明了如何保存性能损耗较大的函数的执行结果。在第一次执行之后，后续调用都会返回之前缓存下来的结果：

    let runExpensiveCodeResults = false
    function runExpensiveCode() {
        if(!runExpensiveCodeResults) {
            runExpensiveCodeResults = someExpensiveCode();
        }
        return runExpensiveCodeResults;
    }

这两个示例的缺点在于，它们仅在代码首次加载 "require" 时才运行或定义。您可以通过访问 [`global`](https://nodejs.org/api/globals.html#globals_global)  对象来让代码更加简洁，该对象是 Node 中的一个特殊对象，可以在任何地方进行访问。

    function runExpensiveCode() {
        if(!global.runExpensiveCodeResults) {
            global.runExpensiveCodeResults = someExpensiveCode();
        }
        return global.runExpensiveCodeResults;
    }


global 缓存还有一些严格的限制：

*   每个工作阶段都有其自己的 `global` 状态，并且在同一 tick 里你的代码会被至少四个 node 进程调用。这也就意味着当前 tick 的全局数据只有 25% 的几率会持续到下个 tick（尽管可以再次进行添加直到所有的四个 node 上都可以访问到保存的数据）并且已经被删除的数据可能会令人疑惑的再次出现在下个 tick。
*   `global` 对象会定期重置，这意味着所有数据都会被周期性清除。所以 `global` 对象不能视为持久性存储。
*   尽管 `global` 经常会重置对象，但只要按照固定的时间刷新其中保存的数据。那么保存的数据可能会保存比预期更长的时间。

这些限制使得 `global` 对象成为某些类型缓存的理想选择，例如，函数的执行结果始终是相同的，或者使用“老旧”的数据也无关紧要，那么这种就更适合在 `global` 里进行存储。而对于结果可能会更改并且会导致数据变得无效的情况下，就必须将元数据（例如 TTL 或版本标识符）与结果保存在一起来方便进行过期检查。


## 代码引入缓存（Require Cache）

每次调用`require`时其执行结果都会被缓存。这会减少服务器和脚本的运行消耗，因为它避免了每个 tick 都必须编译各种 javascript 模块。require 缓存和 `global` 缓存有着很高的相关性并且会被同时清除。但是在某些情况下，`require` 缓存会被（全部或部分）清除而 `global` 不会。

站在性能的角度来看，`require` 和 `global` 缓存会被清除这个事实意味着 `global resets` 是一个尤其耗费性能的事件。


## 提示

*   请不要随意往 Memory 里添加您的缓存，因为内存解析时间可能会比较昂贵。
*   解析对象要比解析字符串的损耗更大。在储存之前想办法把 [RoomPositions](/api/#RoomPosition) 之类的对象转换为字符串，然后在需要时再将其转换回来。这种操作可能会带来令人惊讶的性能提升。
*   你可以压缩具有重复数据的超大对象例如 [CostMatrixes](/api/#PathFinder-CostMatrix) 来节省大量的内存空间。经常利用这些对象的玩家最好学会使用 [lzstring](http://pieroxy.net/blog/pages/lz-string/index.html)，并且还应该保证最大限度的利用 `global` 缓存来尽可能的减少缓存所需的解压次数。
*   通常来讲，大多数缓存系统会把 TTL 放进 `set` 方法里，但是对于 Screeps 来说，把它放在 `get` 方法里可能更有意义。这样就可以根据需要调整 TTL。例如，可以把没有视野的房间已缓存 Costmax 的 TTL 设置为无限（Infinity）并且对其进行压缩来保证数据始终可用，尽管这些数据可能会比较老旧。
*   不要忘了添加一些逻辑来自动清理过时的缓存信息，不然您的 Memory 将随着时间推移而变得越来越臃肿。
