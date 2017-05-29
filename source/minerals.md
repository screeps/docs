title: Minerals
---

If energy is the basic construction material in the Screeps world, the minerals are its jewels. By mining and processing minerals, you can significantly speed up your economy and boost the effectiveness of your creeps.

Working with minerals consists of 3 steps:

*   **Mining base minerals**
*   **Producing mineral compounds**
*   **Boosting creeps**

## Mining

There are 7 types of base minerals shown in the picture below.

![](img/minerals-01.png)
 
Each room contains only one mineral type, so in order to handle them effectively you need either access to several suitable rooms or trade relationships with other players.

<img src="img/mining_minerals.png" align="right">A mineral deposit is located in a room at a spot marked by a special symbol. To start mining the deposit, you need to construct the special structure **Extractor** on top of it (available at Room Controller Level 6). Upon building it, you can start applying the method `harvest` to the deposit thus mining the corresponding mineral in the same way you harvest energy.

## Mineral compounds

Base minerals are useless on their own. In order to impart some useful capabilities to them, you have to combine them according to special formulas in the structure called **Lab**.

![](img/minerals-02.png)

One reaction requires three labs: two as reagent sources, and the third one as the produce collector. The labs should be within the range of 2 squares from each other. 

A lab can produce 1 unit of produce per tick, so you can build parallel chains of labs in one or more rooms to speed up the process. One lab cannot contain more than one mineral type at the same time.

<img src="img/2016-03-09_10-32-33.gif" align="right">

    var labs = room.find(FIND_MY_STRUCTURES, 
        {filter: {structureType: STRUCTURE_LAB}});

    labs[0].runReaction(labs[1], labs[2]);

    // on the next tick...

    console.log(labs[0].mineralType) // -> OH
    console.log(labs[1].mineralType) // -> O
    console.log(labs[2].mineralType) // -> H

## Creep boosts

Apart from running chemical reactions with minerals, a lab can use resulting compounds to permanently upgrade your creeps boosting their specific properties.

Each compound is applied to one body part of the creep of a certain type using `Structure.boostCreep` method according to the table below and boosts the effectiveness of one of the actions of this creep. The boosted part works as two, three, or even four corresponding parts. To boost the whole creep, you need to boost all its parts of the given type.

Boosting one body part takes 30 mineral compound units and 20 energy units. One body part can be boosted only with one compound type.

<style>
.minerals td {
    border-top: 1px solid #333;
    color: #bbb;
    background-color: #222;
    font-size: 13px;
}
@media (min-width: 1280px) {
    .minerals td:first-child {
        white-space: nowrap;
    }
}
.minerals td:nth-child(2) {
    white-space: nowrap;
}
.minerals td:nth-child(3) {
    min-width: 80px;
}
.minerals code {
    background-color: #333;
    color: #eee;
    word-break: break-all;
}
.minerals img {
    margin-right: 5px;
    vertical-align: middle;
} 
.minerals__divider th {
    background-color: #333;
    color: #ffe099;
    text-align: center;
    font-size: 13px;
}
.minerals__head th {
    background-color: #222;
    color: #ccc;
    font-weight: normal !important;
}
</style>


<table class="minerals">
<colgroup>
<col></col>
<col></col>
<col></col>
<col></col>
</colgroup>
<tbody>
<tr class=minerals__head>
<th>Name</th>
<th>Formula</th>
<th>Body part</th>
<th>Effect</th>
</tr>
<tr class=minerals__divider>
<th colspan="4" align="center">Base compounds</th>
</tr>
<tr>
<td>![](http://static.screeps.com/upload/mineral-icons/OH.png)hydroxide</td>
<td>![](http://static.screeps.com/upload/mineral-icons/H.png) + ![](http://static.screeps.com/upload/mineral-icons/O.png)</td>
<td>—</td>
<td>—</td>
</tr>
<tr>
<td>![](http://static.screeps.com/upload/mineral-icons/ZK.png)zynthium keanite</td>
<td>![](http://static.screeps.com/upload/mineral-icons/Z.png) + ![](http://static.screeps.com/upload/mineral-icons/K.png)</td>
<td>—</td>
<td>—</td>
</tr>
<tr>
<td>![](http://static.screeps.com/upload/mineral-icons/UL.png)utrium lemergite</td>
<td>![](http://static.screeps.com/upload/mineral-icons/U.png) + ![](http://static.screeps.com/upload/mineral-icons/L.png)</td>
<td>—</td>
<td>—</td>
</tr>
<tr>
<td>![](http://static.screeps.com/upload/mineral-icons/G.png)ghodium</td>
<td>![](http://static.screeps.com/upload/mineral-icons/ZK.png) + ![](http://static.screeps.com/upload/mineral-icons/UL.png)</td>
<td>—</td>
<td>—</td>
</tr>
<tr class=minerals__divider>
<th colspan="4" align="center">Tier 1 compounds</th>
</tr>
<tr>
<td>![](http://static.screeps.com/upload/mineral-icons/UH.png)utrium hydride</td>
<td>![](http://static.screeps.com/upload/mineral-icons/U.png) + ![](http://static.screeps.com/upload/mineral-icons/H.png)</td>
<td>`ATTACK`</td>
<td>+100% `attack` effectiveness</td>
</tr>
<tr>
<td>![](http://static.screeps.com/upload/mineral-icons/UO.png)utrium oxide</td>
<td>![](http://static.screeps.com/upload/mineral-icons/U.png) + ![](http://static.screeps.com/upload/mineral-icons/O.png)</td>
<td>`WORK`</td>
<td>+300% `harvest` effectiveness</td>
</tr>
<tr>
<td>![](http://static.screeps.com/upload/mineral-icons/KH.png)keanium hydride</td>
<td>![](http://static.screeps.com/upload/mineral-icons/K.png) + ![](http://static.screeps.com/upload/mineral-icons/H.png)</td>
<td>`CARRY`</td>
<td>+50 capacity</td>
</tr>
<tr>
<td>![](http://static.screeps.com/upload/mineral-icons/KO.png)keanium oxide</td>
<td>![](http://static.screeps.com/upload/mineral-icons/K.png) + ![](http://static.screeps.com/upload/mineral-icons/O.png)</td>
<td>`RANGED_ATTACK`</td>
<td>+100% `rangedAttack` and `rangedMassAttack` effectiveness</td>
</tr>
<tr>
<td>![](http://static.screeps.com/upload/mineral-icons/LH.png)lemergium hydride</td>
<td>![](http://static.screeps.com/upload/mineral-icons/L.png) + ![](http://static.screeps.com/upload/mineral-icons/H.png)</td>
<td>`WORK`</td>
<td>+50% `repair` and `build` effectiveness without increasing the energy cost</td>
</tr>
<tr>
<td>![](http://static.screeps.com/upload/mineral-icons/LO.png)lemergium oxide</td>
<td>![](http://static.screeps.com/upload/mineral-icons/L.png) + ![](http://static.screeps.com/upload/mineral-icons/O.png)</td>
<td>`HEAL`</td>
<td>+100% `heal` and `rangedHeal` effectiveness</td>
</tr>
<tr>
<td>![](http://static.screeps.com/upload/mineral-icons/ZH.png)zynthium hydride</td>
<td>![](http://static.screeps.com/upload/mineral-icons/Z.png) + ![](http://static.screeps.com/upload/mineral-icons/H.png)</td>
<td>`WORK`</td>
<td>+100% `dismantle` effectiveness</td>
</tr>
<tr>
<td>![](http://static.screeps.com/upload/mineral-icons/ZO.png)zynthium oxide</td>
<td>![](http://static.screeps.com/upload/mineral-icons/Z.png) + ![](http://static.screeps.com/upload/mineral-icons/O.png)</td>
<td>`MOVE`</td>
<td>+100% fatigue decrease speed</td>
</tr>
<tr>
<td>![](http://static.screeps.com/upload/mineral-icons/GH.png)ghodium hydride</td>
<td>![](http://static.screeps.com/upload/mineral-icons/G.png) + ![](http://static.screeps.com/upload/mineral-icons/H.png)</td>
<td>`WORK`</td>
<td>+50% `upgradeController` effectiveness without increasing the energy cost</td>
</tr>
<tr>
<td>![](http://static.screeps.com/upload/mineral-icons/GO.png)ghodium oxide</td>
<td>![](http://static.screeps.com/upload/mineral-icons/G.png) + ![](http://static.screeps.com/upload/mineral-icons/O.png)</td>
<td>`TOUGH`</td>
<td>-30% damage taken</td>
</tr>
<tr class=minerals__divider>
<th colspan="4" align="center">Tier 2 compounds</th>
</tr>
<tr>
<td>![](http://static.screeps.com/upload/mineral-icons/UH2O.png)utrium acid</td>
<td>![](http://static.screeps.com/upload/mineral-icons/UH.png) + ![](http://static.screeps.com/upload/mineral-icons/OH.png)</td>
<td>`ATTACK`</td>
<td>+200% `attack` effectiveness</td>
</tr>
<tr>
<td>![](http://static.screeps.com/upload/mineral-icons/UHO2.png)utrium alkalide</td>
<td>![](http://static.screeps.com/upload/mineral-icons/UO.png) + ![](http://static.screeps.com/upload/mineral-icons/OH.png)</td>
<td>`WORK`</td>
<td>+500% `harvest` effectiveness</td>
</tr>
<tr>
<td>![](http://static.screeps.com/upload/mineral-icons/KH2O.png)keanium acid</td>
<td>![](http://static.screeps.com/upload/mineral-icons/KH.png) + ![](http://static.screeps.com/upload/mineral-icons/OH.png)</td>
<td>`CARRY`</td>
<td>+100 capacity</td>
</tr>
<tr>
<td>![](http://static.screeps.com/upload/mineral-icons/KHO2.png)keanium alkalide</td>
<td>![](http://static.screeps.com/upload/mineral-icons/KO.png) + ![](http://static.screeps.com/upload/mineral-icons/OH.png)</td>
<td>`RANGED_ATTACK`</td>
<td>+200% `rangedAttack` and `rangedMassAttack` effectiveness</td>
</tr>
<tr>
<td>![](http://static.screeps.com/upload/mineral-icons/LH2O.png)lemergium acid</td>
<td>![](http://static.screeps.com/upload/mineral-icons/LH.png) + ![](http://static.screeps.com/upload/mineral-icons/OH.png)</td>
<td>`WORK`</td>
<td>+80% `repair` and `build` effectiveness without increasing the energy cost</td>
</tr>
<tr>
<td>![](http://static.screeps.com/upload/mineral-icons/LHO2.png)lemergium alkalide</td>
<td>![](http://static.screeps.com/upload/mineral-icons/LO.png) + ![](http://static.screeps.com/upload/mineral-icons/OH.png)</td>
<td>`HEAL`</td>
<td>+200% `heal` and `rangedHeal` effectiveness</td>
</tr>
<tr>
<td>![](http://static.screeps.com/upload/mineral-icons/ZH2O.png)zynthium acid</td>
<td>![](http://static.screeps.com/upload/mineral-icons/ZH.png) + ![](http://static.screeps.com/upload/mineral-icons/OH.png)</td>
<td>`WORK`</td>
<td>+200% `dismantle` effectiveness</td>
</tr>
<tr>
<td>![](http://static.screeps.com/upload/mineral-icons/ZHO2.png)zynthium alkalide</td>
<td>![](http://static.screeps.com/upload/mineral-icons/ZO.png) + ![](http://static.screeps.com/upload/mineral-icons/OH.png)</td>
<td>`MOVE`</td>
<td>+200% fatigue decrease speed</td>
</tr>
<tr>
<td>![](http://static.screeps.com/upload/mineral-icons/GH2O.png)ghodium acid</td>
<td>![](http://static.screeps.com/upload/mineral-icons/GH.png) + ![](http://static.screeps.com/upload/mineral-icons/OH.png)</td>
<td>`WORK`</td>
<td>+80% `upgradeController` effectiveness without increasing the energy cost</td>
</tr>
<tr>
<td>![](http://static.screeps.com/upload/mineral-icons/GHO2.png)ghodium alkalide</td>
<td>![](http://static.screeps.com/upload/mineral-icons/GO.png) + ![](http://static.screeps.com/upload/mineral-icons/OH.png)</td>
<td>`TOUGH`</td>
<td>-50% damage taken</td>
</tr>
<tr class=minerals__divider>
<th colspan="4" align="center">Tier 3 compounds</th>
</tr>
<tr>
<td>![](http://static.screeps.com/upload/mineral-icons/XUH2O.png)catalyzed utrium acid</td>
<td>![](http://static.screeps.com/upload/mineral-icons/UH2O.png) + ![](http://static.screeps.com/upload/mineral-icons/X.png)</td>
<td>`ATTACK`</td>
<td>+300% `attack` effectiveness</td>
</tr>
<tr>
<td>![](http://static.screeps.com/upload/mineral-icons/XUHO2.png)catalyzed utrium alkalide</td>
<td>![](http://static.screeps.com/upload/mineral-icons/UHO2.png) + ![](http://static.screeps.com/upload/mineral-icons/X.png)</td>
<td>`WORK`</td>
<td>+700% `harvest` effectiveness</td>
</tr>
<tr>
<td>![](http://static.screeps.com/upload/mineral-icons/XKH2O.png)catalyzed keanium acid</td>
<td>![](http://static.screeps.com/upload/mineral-icons/KH2O.png) + ![](http://static.screeps.com/upload/mineral-icons/X.png)</td>
<td>`CARRY`</td>
<td>+150 capacity</td>
</tr>
<tr>
<td>![](http://static.screeps.com/upload/mineral-icons/XKHO2.png)catalyzed keanium alkalide</td>
<td>![](http://static.screeps.com/upload/mineral-icons/KHO2.png) + ![](http://static.screeps.com/upload/mineral-icons/X.png)</td>
<td>`RANGED_ATTACK`</td>
<td>+300% `rangedAttack` and `rangedMassAttack` effectiveness</td>
</tr>
<tr>
<td>![](http://static.screeps.com/upload/mineral-icons/XLH2O.png)catalyzed lemergium acid</td>
<td>![](http://static.screeps.com/upload/mineral-icons/LH2O.png) + ![](http://static.screeps.com/upload/mineral-icons/X.png)</td>
<td>`WORK`</td>
<td>+100% `repair` and `build` effectiveness without increasing the energy cost</td>
</tr>
<tr>
<td>![](http://static.screeps.com/upload/mineral-icons/XLHO2.png)catalyzed lemergium alkalide</td>
<td>![](http://static.screeps.com/upload/mineral-icons/LHO2.png) + ![](http://static.screeps.com/upload/mineral-icons/X.png)</td>
<td>`HEAL`</td>
<td>+300% `heal` and `rangedHeal` effectiveness</td>
</tr>
<tr>
<td>![](http://static.screeps.com/upload/mineral-icons/XZH2O.png)catalyzed zynthium acid</td>
<td>![](http://static.screeps.com/upload/mineral-icons/ZH2O.png) + ![](http://static.screeps.com/upload/mineral-icons/X.png)</td>
<td>`WORK`</td>
<td>+300% `dismantle` effectiveness</td>
</tr>
<tr>
<td>![](http://static.screeps.com/upload/mineral-icons/XZHO2.png)catalyzed zynthium alkalide</td>
<td>![](http://static.screeps.com/upload/mineral-icons/ZHO2.png) + ![](http://static.screeps.com/upload/mineral-icons/X.png)</td>
<td>`MOVE`</td>
<td>+300% fatigue decrease speed</td>
</tr>
<tr>
<td>![](http://static.screeps.com/upload/mineral-icons/XGH2O.png)catalyzed ghodium acid</td>
<td>![](http://static.screeps.com/upload/mineral-icons/GH2O.png) + ![](http://static.screeps.com/upload/mineral-icons/X.png)</td>
<td>`WORK`</td>
<td>+100% `upgradeController` effectiveness without increasing the energy cost</td>
</tr>
<tr>
<td>![](http://static.screeps.com/upload/mineral-icons/XGHO2.png)catalyzed ghodium alkalide</td>
<td>![](http://static.screeps.com/upload/mineral-icons/GHO2.png) + ![](http://static.screeps.com/upload/mineral-icons/X.png)</td>
<td>`TOUGH`</td>
<td>-70% damage taken</td>
</tr>
</tbody>
</table>
