title: 理解游戏循环、游戏时间、帧
---

Screeps 是个实时游戏。它游戏时间不等同于现实时间，而是自从开服以来所有帧的总和。当下的游戏时间可调用([`Game.time`](/api/#Game.time))获得。

就像其他大部分游戏一样， screeps 是由无穷无尽的“帧”（循环、回合）拼接而成的。每一帧内，服务器会轮番处理所有玩家写在 `main` 里的指令，只有当处理完后才会进入下一帧。

接下来我们来介绍一帧的三个阶段，及初始、执行、结束阶段。

![](img/game-loop.png)

在**初始阶段**，服务器会重建所有的游戏对象 (object) 和记录这一帧的游戏状态。比如 creep 的位置，上一帧被下令拆除的建筑，或是 creep 及建筑资源的存量 ([`creep.carry()`](api/#Creep.carry) / [`StructureExtension.energy()`](api/#StructureExtension.energy) / [`StructureContainer.store()`](api/#StructureContainer.store))。

在**执行阶段**，玩家代码的 `main` 及它所调用的模块会被执行，但部分改变游戏状态的指令并不会立即执行。如果玩家在同一帧内先用了 `移动` ([`creep.move()`](api/#Creep.move)) 再用了 `攻击` ([`creep.attack()`](api/#Creep.attack))，creep 发出攻击的位置将会是移动前的位置，因为 creep 的位置属性 (creep.pos) 只能在初始阶段改变。

在**结束阶段**，服务器会处理那些改变游戏状态的指令，然后被传达到下一帧的初始阶段。如果玩家给了相互冲突的指令，像是多个 creep 尝试跑到同一位置，或是边修理边拆除，这些指令会按照[优先级](/simultaneous-actions.html)执行。但是玩家之间的指令并不一定会造成冲突，比如不同玩家的低血量 creep 相互攻击，可能会导致他们同时战死。

## 更多

*   玩家代码 `main` 的执行时间被 CPU 所限制(见[`Game.cpuLimit`](/api/#Game.cpuLimit))

*   已使用 CPU 可由[`Game.getUsedCpu`](/api/#Game.getUsedCpu)获得。
*   游戏内一帧的耗时是由服务器吞吐量决定的。
*   所有运行游戏对象及变量在每一帧后都会被清除重建(见[全局对象](/global-objects.html))
*   由控制台输入的指令遵循同样的规则：所以控制台输入的指令会在 `main` 之后执行。

## 参见

*   [什么是CPU限制](/cpu-limit.html)
*   [服务器结构简览](/architecture.html)
