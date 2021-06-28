title: Power
---

Power is a mid-game mechanic opening a whole new trek in the development of your colony: towards increasing its effectiveness rather than the size of colonized territory. This is how its contents look like:

* You mine a special resource called “power.”

* Mined resource is processed in power spawners and increase your account Global Power Level (GPL).

* GPL allows for creation of Power Creeps - special hero units - and development their levels and skills.

## Power Banks

![](img/power_banks.gif)

Power can be gathered from structures called [Power Banks](/api/#StructurePowerBank) that appear from time to time in neutral empty rooms that divide living sectors on the map. Each Power Bank contains a random amount of power that can be obtained by destroying the structure.

## Global Power Level

![](img/gpl.png) 

A room starting from RCL5 gives access to the structure called [Power Spawn](/api/#StructurePowerSpawn). It allows to execute the method [`StructurePowerSpawn.processPower`](/api/#StructurePowerSpawn.processPower). By merging 1 unit of power resource with 10 units of energy, you can increase your **Global Power Level** progress. On reaching a new GPL level, you unlock the possibility to use it to develop your **Power Creeps**.

You can view your GPL on the [Overview page](https://screeps.com/a/#!/overview) in the game, or using the [`Game.gpl`](/api/#Game.gpl) property in the API.  

## Power Creeps

<video autoplay loop muted playsinline>
    <source src="img/pc_anim.mp4" type="video/mp4">
</video>

[Power Creeps](/api/#PowerCreep) (PC) are game units different from regular creeps in the same way as hero units are different from regular ones in strategy games.

PCs are immortal. A newly-created PC is tied to your account and exists in it even if not spawned in the game world. After it dies (out of age or forcibly), it is just returned to your account and you can spawn it again in any of your Power Spawns after expiration of a 8-hours cooldown.

PCs can belong to either of the 3 classes: 

<table>
<tr>
<td style="padding: 10px; background: #141414"><img src="img/operator.png"></td>
<td><strong>Operator</strong><br>
A creep working mainly in the rear, at your base, though it can be used as a saboteur in offensive operations.
</td>
</tr>
<tr style="background: none">
<td style="padding: 10px; background: #141414"><img src="img/commander.png"></td>
<td><strong>Commander</strong><br>
This power creep is not very useful on its own, but it’s a team player. It influences and affects regular creeps, both friendly and hostile.
</td>
</tr>
<tr>
<td style="padding: 10px; background: #141414"><img src="img/executor.png"></td>
<td><strong>Executor</strong><br>
This creep class prefers working alone. Due to its skills, it’s a very effective performer in your economy or as a war machine when defending or attacking.
</td>
</tr> 
</table> 

PCs have 0 to 25 development levels and skills (so-called “**powers**,” like superpowers). With each new level gained, you can add a new available skill or increase the level of any of the existing skills.

You need one free Global Power Level to increase a level of an existing PC. In the same way you can create a new 0-level PC by utilizing one free Global Power Level.

You can use PC skills in any room without a controller, or in a room with a power-enabled controller (see [`PowerCreep.enableRoom`](/api/#PowerCreep.enableRoom)).

Though PCs age and can die of old age, you can resume their time to live instantly and without cost by simply approaching any Power Spawn or Power Bank and executing [`PowerCreep.renew`](/api/#PowerCreep.renew). This allow them to move large distances on the map, provided you find Power Banks to recharge them on time.

{% note warn %}
<strong style="color: #f33">CAUTION</strong>: You can delete a Power Creep from your account (to free up the GPL used and create a new one with it), but this will **decrease your GPL by 1**! The removal of a PC from your account takes 24 hours.
{% endnote %}

## Powers

### Operator

{% powers operator %}

### Commander

Under development.

### Executor 

Under development. 
