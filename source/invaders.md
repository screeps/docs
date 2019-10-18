title: NPC 入侵者 
---

每个被开采的房间都有一个内置的计数器，终值大约为**100,000单位的能量**（再加上一些随机因素）。当计数器达到终值，在房间的任意一个出入口会生产一个系统控制的creep，其目标是猎杀你的creeps。它大部分时间不会理睬你的建筑物，一旦某个建筑物挡了它的道，它就会试图摧毁该建筑物。这些creep可以使用[`attack`](/api/#Creep.attack), [`rangedAttack`](/api/#Creep.rangedAttack), 和 [`dismantle`](/api/#Creep.dismantle)，但是不会跨房间游走。

![](img/invader.png)

这些creep最重要的特点是只会出现在**通向中立房间的出口**，如果出口通向的房间被你（或者其他人）控制，或者是一个被预定的房间，creep入侵者将不会出现在该的出口。如果该房间的所有的出口都是这种类型，那么就不会产生任何入侵者

目前，NPC入侵者的攻击不会产生任何邮件提醒，因为即便在一个普通的开采房间中，一天内也会有若干次入侵。

## 袭击

有 10% 几率你会遇到不止一个入侵者，你将遇到 2 至 5 个结伴的入侵者。每个入侵者都会有各自的角色：近战，远程或者治疗者。远程攻击者和近战攻击者的行为完全不同：他们会试图和你的creep保持距离。治疗者的作用是治疗其他入侵成员。同样的某些creep会受到![](//static.screeps.com/upload/mineral-icons/UH.png), ![](//static.screeps.com/upload/mineral-icons/KO.png), ![](//static.screeps.com/upload/mineral-icons/LO.png), ![](//static.screeps.com/upload/mineral-icons/ZH.png) 或 ![](//static.screeps.com/upload/mineral-icons/GO.png) 的强化。

## creep入侵者类型

有两种creep入侵者类型：

*   轻型creep，出现在中立、被预定和房间控制等级3以内的房间里。
*   重型creep，出现在房间控制等级4级及以上的房间里。

<style>
.invaders td {
    border-top: 1px solid #333;
    background-color: #222;
    color: #ccc;
}
</style>

<table class=invaders>
<tbody>
<tr>
<td width="15%"> </td>
<td style="text-align: center;">RCL < 4</td>
<td style="text-align: center;">RCL ≥ 4</td>
</tr>
<tr>
<td style="text-align: left;">Melee</td>
<td style="text-align: center;">![](img/smallMelee.png)</td>
<td style="text-align: center;">![](img/bigMelee.png)</td>
</tr>
<tr>
<td style="text-align: left;">Ranged</td>
<td style="text-align: center;">![](img/smallRanged.png)</td>
<td style="text-align: center;">![](img/bigRanged.png)</td>
</tr>
<tr>
<td style="text-align: left;">Healer</td>
<td style="text-align: center;">![](img/smallHealer.png)</td>
<td style="text-align: center;">![](img/bigHealer.png)</td>
</tr>
</tbody>
</table>

## 测试

你可使用在右侧面板上的“Invasion（入侵）”控制器手动生成NPC入侵者，用来测试你的防御系统。

![](img/chrome_2016-11-24_14-55-59.png)

## Strongholds

If invaders started raiding your rooms, check your map sector &mdash; there will be their home base somewhere. 
This NPC Stronghold can be attacked and destroyed, which will cause invaders to stop appearing in your rooms until the next stronghold spawns.

Each NPC Stronghold has the `EFFECT_COLLAPSE_TIMER` on every structure. A new stronghold will appear somewhere in the sector almost immediately after the previous one has collapsed.
If you destroy the stronghold, its ruins will remain with the same effect timer which gives you some invader-free time.

There are many stronghold types. Each type has different structures layout and defenders AI. 
You can estimate stronghold's difficulty by checking the `level` property on the [`StructureInvaderCore`](/api/#StructureInvaderCore).

![](img/stronghold1.png) ![](img/stronghold5.png)

There is one more reason to conquer an NPC Stronghold &mdash; it contains resources in its treasury. 
Every stronghold has a few containers, and the core structure ruin also will contain resources after you destroy it. 
Here is an example of a level 5 stronghold loot:

![](img/stronghold_loot5.png) ![](img/stronghold_loot1.png) ![](img/stronghold_loot2.png) ![](img/stronghold_loot3.png) ![](img/stronghold_loot4.png)

An active NPC Stronghold not only spawns invader creeps in the sector but also spawns lesser cores in rooms nearby every few thousands of ticks.
Such cores will not have any structures or creeps, but will reserve the controller so that you cannot harvest energy in this room without destroying the core first. 

![](img/invader-core-expand.gif)