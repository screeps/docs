title: NPC Invaders 
---

It seems that intensive mining and industrial development in once virgin regions shattered the environmental balance and enraged mysterious forces we know little about.

## Invader creeps

Every room where energy is mined has an inner counter at approximately **100,000 units of mined energy** (plus some random variable). After this counter times out, a new game-controlled creep appears at one of the room exits with the goal of hunting your creeps. It will not touch your structures most of the time, but if a structure gets on its way, it will try to destroy it. This creep can use [`attack`](/api/#Creep.attack), [`rangedAttack`](/api/#Creep.rangedAttack), and [`dismantle`](/api/#Creep.dismantle). It is unable to move between rooms. 

![](img/invader.png)

An important feature of these creeps is that they can appear only at **exits to neutral rooms**. If the target room is under your (or someone else’s) control or it is a reserved room, an invader creep will never appear at this exit. If all exits in the room are of this kind, invaders cannot appear at all.

Currently, NPC invaders attacks do not generate any e-mail notifications, since generally they appear several times a day even in a single room if it's being actively harvested.

## Raids

There is a 10% chance that you will get not only a lone Invader but a whole company of them, from 2 to 5. Each Invader has its own role: melee attacker, ranged attacker, or healer. Ranged attackers are different from melee ones in their behavior: they try to stay at a distance from your creeps. The function of healers is evidently to heal other raid members. Also, some creeps may be boosted with ![](//static.screeps.com/upload/mineral-icons/UH.png), ![](//static.screeps.com/upload/mineral-icons/KO.png), ![](//static.screeps.com/upload/mineral-icons/LO.png), or ![](//static.screeps.com/upload/mineral-icons/ZH.png).

## Invader creep types

There are two sizes of invader creeps:

*   Light creeps that appear in neutral, reserved, and claimed rooms up to level 3.
*   Heavy creeps that appear in claimed rooms level 4 and above.

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

## Testing

Note that you can use "Invasion" controls in the room side panel in order to create NPC invaders manually and test your defences.

![](img/chrome_2016-11-24_14-55-59.png)
