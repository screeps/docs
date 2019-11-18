title: 控制
---

## 全局控制等级 （Global Control Level; 缩写：GCL）

为了扩展你在游戏世界中的疆土，你需要提升的一个主要指标是 **Global Control Level** （GCL）。他的主要影响有：

* **CPU 限制**。在官方服务器上，每个人开局有 20 个 CPU 的限制，只能控制少量的单位。如果你是订阅（氪金）用户，每提升一个 GCL 等级可以多获得 10 个 CPU 资源，直到达到最大的 300 CPU 限制。
* **控制房间数量**。比如说你想要控制 3 个房间就需要 3 级的 GCL。



你当前的 GCL 等级在 [overview 页面](https://screeps.com/a/#!/overview) 显示.

![](img/gcl-cpu.png)

## 房间控制等级 （Room Control Level; 缩写：RCL）

如果想要在房间里建造设施，首先需要控制这个房间。在大多数房间里都有一个被称为 **房间控制器**（Room Controller）的特殊装置。你第一个房间里的房间控制器默认归你所有，其他的中立房间控制器可以通过带有 `CLAIM` 部件的 creep [占有](/api/#Creep.claimController)以取得房间控制权。

![](img/c1.png)

新占领的房间控制器可以让你在该房间建造一个 Spawn。如果需要建造额外的 Spawn 或者其他扩展就需要通过 [`Creep.upgradeController`](/api/#Creep.upgradeController)给控制器输入能量来提升房间控制器等级 （Room Controller Level，RCL）。

![](img/c2.png)

## RCL 等级对应可建造建筑

<table>
<tbody>
<tr>
<th style="width: 10%;">RCL</th>
<th style="width: 15%;">升级所需能量</th>
<th>建筑</th>
</tr>
<tr>
<td>0</td>
<td>—</td>
<td>Roads, 5 Containers</td>
</tr>
<tr>
<td>1</td>
<td>200</td>
<td>Roads, 5 Containers, 1 Spawn</td>
</tr>
<tr>
<td>2</td>
<td>45,000</td>
<td>Roads, 5 Containers, 1 Spawn, 5 Extensions (50 容量), Ramparts (300K 最大生命值), Walls</td>
</tr>
<tr>
<td>3</td>
<td>135,000</td>
<td>Roads, 5 Containers, 1 Spawn, 10 Extensions (50 容量), Ramparts (1M 最大生命值), Walls, 1 Tower</td>
</tr>
<tr>
<td>4</td>
<td>405,000</td>
<td>Roads, 5 Containers, 1 Spawn, 20 Extensions (50 容量), Ramparts (3M 最大生命值), Walls, 1 Tower, Storage</td>
</tr>
<tr>
<td>5</td>
<td>1,215,000</td>
<td>Roads, 5 Containers, 1 Spawn, 30 Extensions (50 容量), Ramparts (10M 最大生命值), Walls, 2 Towers, Storage, 2 Links</td>
</tr>
<tr>
<td>6</td>
<td>3,645,000</td>
<td>Roads, 5 Containers, 1 Spawn, 40 Extensions (50 容量), Ramparts (30M 最大生命值), Walls, 2 Towers, Storage, 3 Links, Extractor, 3 Labs, Terminal</td>
</tr>
<tr>
<td>7</td>
<td>10,935,000</td>
<td>Roads, 5 Containers, 2 Spawns, 50 Extensions (100 容量), Ramparts (100M 最大生命值), Walls, 3 Towers, Storage, 4 Links, Extractor, 6 Labs, Terminal</td>
</tr>
<tr>
<td>8</td>
<td>—</td>
<td>Roads, 5 Containers, 3 Spawns, 60 Extensions (200 容量), Ramparts (300M 最大生命值), Walls, 6 Towers, Storage, 6 Links, Extractor, 10 Labs, Terminal, Observer, Power Spawn</td>
</tr>
</tbody>
</table>

## 攻击控制器

控制器无法被攻击或毁坏。然而，控制器在没有受到 [`upgradeController`](/api/#Creep.upgradeController) 的作用下会缓慢降级，比如说 RCL1 的时候 20,000 个游戏 tick 会降一级，具体的降级规则看 [`StructureController`](/api/#StructureController)。当 RCL 等级降为 0 时，该房间控制器即变为中立，其他玩家就可以占领了。

当然你可以通过 [`attackController`](/api/#Creep.attackController) 影响别人的 RC 降级计时器。

![](/img/controllerDowngrade.png)

## 提升GCL

升级 GCL 需要向控制器中注入能量，GCL 与控制器的级别是同步增长的，即便控制器已经满级，往控制器中注入能量依旧会使 GCL 上涨。。

一旦 GCL 级别提升就不会再降下来，即使游戏输到一个房间都不剩了。重新开始游戏时 GCL 仍然还是那么多，可以让你领先在起跑线上。

如果一个房间所需的 GCL 比你的高，你仍然可以[保留](/api/#Creep.reserveController) 。此外，在中立房间保留一个控制器能够将能源恢复到最大容量。
