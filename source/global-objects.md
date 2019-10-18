title: 全局对象
---

## `Game` 对象

你可以通过全局对象 [`Game`](/api/#Game) 来操作游戏，它的详细介绍可以在 [API 参考](/api/) 中找到。该对象可以使您访问到您 creep 的完整列表、“查阅”房间、传递命令等。

```javascript
var target = Game.spawns.Spawn1;
for(var i in Game.creeps) {
    Game.creeps[i].moveTo(target);
}  
```

tick 的流动不会改变 `Game` 的状态。即使您手动修改了该对象的某个属性，它也不会在游戏中生效。想要修改属性和传递命令只能使用特殊的游戏对象方法。

`Game` 对象在游戏开始时就已经被创建，并且每个 tick 时都会被刷新数据。如果想在 tick 之间存储信息，可以使用 Memory 对象。阅读下一篇文章来了解更多信息。

## `Memory` 对象

每个玩家都可以访问全局对象 `Memory`，并且他/她可以在其中保存任何 JSON 格式的数据。所有写入其中的数据都将自动的使用`JSON.stringify`进行保存并在每个 tick 之间传递。因此，您可以借此来保存设置、决策信息和临时数据。

    Memory.someData = {...};

每个玩家可用的内存容量上限为 **2 MB**。

为了方便您的使用，一些游戏对象已经被链接到了全局的 `Memory` 对象并在其中保存了自己的键。例如，你可以通过 creep 的 `memory` 属性来访问到它的内存：

    Game.creeps.John.memory = {...};

实际上，这个属性是全局对象 `Memory` 上对应键的别名：

    Game.creeps.John.memory.role = 'harvester';
    console.log(Memory.creeps.John.role); // -> 'harvester'

信息被保存记录在 `Memory` 对象中，但是可以通过其他游戏对象上一些对应的键来进行快捷访问。你可以由此来选择更合适的地址寻找方法。

### 在 memory 中保存游戏对象

您不应该在 memory 保存方法或者游戏对象，就像保存在”内存(`Memory`)“中那样。`Memory` 对象被设计用来保存 JSON 数据，并且无法保存活动的对象引用。被保存的对象数据会(因为引用的失效而变得)不再相关。并且，这么做还会浪费您有限的内存。

    // 这是个错误示例！
    var source = creep.pos.findClosestByRange(FIND_SOURCES);
    creep.memory.source = source;
    // ... 
    creep.moveTo(creep.memory.source); // 返回 ERR_INVALID_TARGET (无效目标)

相对于储存活动的对象来说，更好的方法是保存任何游戏对象都拥有的 `id` 属性，然后在需要时使用 [`Game.getObjectById`](/api/#Game.getObjectById) 来重新获取对应的游戏对象：

    // 这是个正确示例
    var source = creep.pos.findClosestByRange(FIND_SOURCES);
    creep.memory.sourceId = source.id;
    // ...
    var source = Game.getObjectById(creep.memory.sourceId);
    creep.moveTo(source); // OK

### 序列化

Memory 对象以字符串形式保存，并在每个 tick 您脚本第一次对其进行访问时借助 `JSON.parse` 方法进行解析。解析所消耗的 CPU 会被当做您的脚本消耗。如果您愿意的话，可以使用全局变量 [`RawMemory`](/api/#RawMemory) 来编写您的序列化/反序列化器。它将把原始内存处理成字符串。实际上，默认的内存工作方式基本等同于下述代码：

    Memory = JSON.parse(RawMemory.get()); //第一次访问 Memory 对象时执行
    // ...您的代码
    RawMemory.set(JSON.stringify(Memory));

您可以使用 [`RawMemory`](/api/#RawMemory) getter/setter 来实现自己的算法。
