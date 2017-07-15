title: Control
---

## Global Control Level

To expand your empire in the game world, you need to develop your main game indicator – your **Global Control Level** (GCL). It affects two important factors: 

*   **Your CPU Limit.** You begin the game with a 30 CPU limit which allows you to control just a small number of creeps. However, you gain 10 CPU with each GCL level achieved until your limit reaches 300 CPU. Then it stops increasing.
*   **The amount of rooms you can control.** For example, to control 3 rooms, you need to have GCL 3.

Your current Global Control Level is displayed at your [overview page](https://screeps.com/a/#!/overview).

![](img/gcl-cpu.png)

## Room Controller Level

In order to build any facilities in a room, you need to control it. In the majority of rooms (but not all), there are special objects called **Room Controllers**. In your first room, the Controller is owned by you by default. Any neutral Controller can be [claimed](/api/#Creep.claimController) by your creeps with the `CLAIM` body part, which instantly puts the room under your control.

![](img/c1.png)

A newly-seized Controller allows to build one spawn in the room. In order for you to build extra spawns, roads, and extensions, you have to upgrade the Room Controller Level (RCL) by pumping the energy into the controller using [`Creep.upgradeController`](/api/#Creep.upgradeController) method.

![](img/c2.png)

## Available structures per RCL

<table>
<tbody>
<tr>
<th style="width: 10%;">RCL</th>
<th style="width: 15%;">Energy to upgrade</th>
<th>Structures</th>
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
<td>Roads, 5 Containers, 1 Spawn, 5 Extensions (50 capacity), Ramparts (300K max hits), Walls</td>
</tr>
<tr>
<td>3</td>
<td>135,000</td>
<td>Roads, 5 Containers, 1 Spawn, 10 Extensions (50 capacity), Ramparts (1M max hits), Walls, 1 Tower</td>
</tr>
<tr>
<td>4</td>
<td>405,000</td>
<td>Roads, 5 Containers, 1 Spawn, 20 Extensions (50 capacity), Ramparts (3M max hits), Walls, 1 Tower, Storage</td>
</tr>
<tr>
<td>5</td>
<td>1,215,000</td>
<td>Roads, 5 Containers, 1 Spawn, 30 Extensions (50 capacity), Ramparts (10M max hits), Walls, 2 Towers, Storage, 2 Links</td>
</tr>
<tr>
<td>6</td>
<td>3,645,000</td>
<td>Roads, 5 Containers, 1 Spawn, 40 Extensions (50 capacity), Ramparts (30M max hits), Walls, 2 Towers, Storage, 3 Links, Extractor, 3 Labs, Terminal</td>
</tr>
<tr>
<td>7</td>
<td>10,935,000</td>
<td>Roads, 5 Containers, 2 Spawns, 50 Extensions (100 capacity), Ramparts (100M max hits), Walls, 3 Towers, Storage, 4 Links, Extractor, 6 Labs, Terminal</td>
</tr>
<tr>
<td>8</td>
<td>—</td>
<td>Roads, 5 Containers, 3 Spawns, 60 Extensions (200 capacity), Ramparts (300M max hits), Walls, 6 Towers, Storage, 6 Links, Extractor, 10 Labs, Terminal, Observer, Power Spawn</td>
</tr>
</tbody>
</table>

## Attacking controllers

A Controller cannot be damaged or destroyed. However, a Controller not affected by an [`upgradeController`](/api/#Creep.upgradeController) action will run a downgrade timer losing 2,000 game ticks at RCL 1, or 5,000 game ticks at RCL 2 to 150,000 game ticks at RCL 8. All timers are listed in [`StructureController`](/api/#StructureController) prototype. As soon as its level reaches 0, it becomes neutral, and another player can reclaim it. Make sure that you upgrade your controllers from time to time to keep their levels!

You can attack another player's controller downgrade timer by applying [`attackController`](/api/#Creep.attackController) on it.

![](img/controllerDowngrade.png)

## Raising GCL

Upgrading GCL requires pumping energy into your Controllers – GCL grows in parallel with the level of your Controllers. Any contribution to any of your Controllers affects your GCL, even if the Controller is fully upgraded to the level 8.

Having upgraded your GCL once, you will never lose it. Even after complete fail in the game and loss of all your rooms, your GCL is stored in your account forever. It allows you to respawn at a new place and quickly regain your former glory.

If some day in the future you plan to claim a room that requires a higher GCL than you have, you can still [reserve](/api/#Creep.reserveController) its controller. Also, reserving controller in a neutral room restores energy sources to their full capacity.
