title: Creeps
---

和其他RTS游戏一样，你的可控制单位被称为 **Creeps**。但是 Screeps 炫酷的地方在于共有7种**身体部件**可为你所用以构建你的专属Creep，每个单位上最多可以有 50 个部件。可以利用此机制构造出不同类型的 Creeps：普通工人，能够在几个 tick 内建造或修复结构的巨型建筑机器，大容量运输单位，快速廉价的侦察兵，装备精良的具有再生能力的战斗机等。没有做不到，只有想不到。

![](img/bodyparts.png)

不过要注意的是 Creep 的生命时间只有 1500 个游戏 tick （大约 30-60 分钟，具体取决于每个游戏 tick 时间），然后它会死掉。 因此，你不仅需要控制现有的小兵，还需要设计 Creep 的更替方式。

标准的 Spawn 只能产生花费不超过 **300 单位能量**的基本 Creep。想要生产高级的 Creep 就需要建造 **Spawn 扩展**，每个 Spawn 扩展可使 Spawn 的**能量存储容量多 50**，从而生产更高级的 Creep 。

Spawn扩展的放置位置不重要，只需要和 Spawn 在一个房间里就行了，并且一个扩展可以被多个 Spawn 共同使用。生产 Creep 前需要 Spawn 和扩展里有足够多的能量。

一个房间里可以放置的扩展数量取决于房间的控制水平。详细的说明在[控制](/control.html)里。

## Creeps 能力

每个 Creep 的能力由 Creep 的构造部件决定：

*   <code style="background: #333; color: #ffe56d;">WORK</code> – 收集能量，建造和修复结构，升级控制器的能力。
*   <code style="background: #333; color: #a9b7c6;">MOVE</code> – 移动的能力。
*   <code style="background: #333; color: #777;">CARRY</code> – 运输能源的能力。
*   <code style="background: #333; color: #f93842;">ATTACK</code> – 短距离攻击的能力。
*   <code style="background: #333; color: #5d80b2;">RANGED_ATTACK</code> – 长距离攻击的能力。
*   <code style="background: #333; color: #65fd62;">HEAL</code> – 治疗其他单位的能力。
*   <code style="background: #333; color: #b99cfb;">CLAIM</code> - 控制领土的能力。
*   <code style="background: #333; color: #fff;">TOUGH</code> – “空”部件的唯一作用是防御。


每种能力的强弱取决于对应部件的数量。以工作效率为例，有 3 个 `WORK` 部件的Creep的工件效率是只有一个 `WORK` 部件的 3 倍。这同样适用于其他部件。

## 移动力

除了 `MOVE` 外， Creep 的每一个构造部件都有重量：带的部件越多，移动速度越慢。每个部件（除了 `MOVE`）都都会产生疲劳值：在道路上为 1 点，平原上为 2 点，沼泽里为 10 点。每一个 MOVE 部件每个游戏 tick 会减少 2  点疲劳值，当 Creep 的疲劳值大于 0 时无法移动。

{% note info %}
如果要保证 Creep 每个游戏 tick 能移动一格，需要计算除 `MOVE` 外的所有部件的 疲劳值的和并使 `MOVE` 减少的疲劳值不低于这个总和。
{% endnote %}

换句话说，一个 `MOVE` 部件在每个 tick 可以移动其他部件一个方格。如果一个 Creep 的 `MOVE` 部件不足，他的移动力会按比例减速，这可以通过疲劳度来看出。


值得注意的是，没有搬运能源的 `CARRY`部件是不会产生疲劳的。

几个小例子：

*   Creep `[CARRY, WORK, MOVE]` 在没有搬运能量的时候一个 tick 可以跑 1 格，搬了能量以后 2 个 tick 才能跑 1 格。
*   Creep `[TOUGH, ATTACK, ATTACK, MOVE, MOVE, MOVE]` 将以满速（1 个 tick 一格）行动。
*   Creep `[TOUGH, ATTACK, ATTACK, MOVE, MOVE]` 根据四舍五入原则 2 个 tick 移动 1 格。

## 伤害

每个 Creep 可以承受的伤害总量由部件总数决定，每个部件可以增加 100 点耐久。被攻击时，排在前面的部件会被优先攻击，当部件完全损毁时，Creep 就不再有对应能力了。
