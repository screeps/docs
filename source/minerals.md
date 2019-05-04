title: 矿物
---

If energy is the basic construction material in the Screeps world, the minerals are its jewels. By mining and processing minerals, you can significantly speed up your economy and boost the effectiveness of your creeps.

Working with minerals consists of 3 steps:

*   **Mining base minerals**
*   **Producing mineral compounds**
*   **Boosting creeps**

## 采矿

There are 7 types of base minerals shown in the picture below.

![](img/minerals-01.png)
 
Each room contains only one mineral type, so in order to handle them effectively you need either access to several suitable rooms or trade relationships with other players.

<img src="img/mining_minerals.png" align="right">A mineral deposit is located in a room at a spot marked by a special symbol. To start mining the deposit, you need to construct the special structure [**Extractor**](/api/#StructureExtractor) on top of it (available at Room Controller Level 6). Upon building it, you can start applying the method [`harvest`](/api/#Creep.harvest) to the deposit thus mining the corresponding mineral in the same way you harvest energy.

## 矿物合成

Base minerals are useless on their own. In order to impart some useful capabilities to them, you have to combine them according to special formulas in the structure called [**Lab**](/api/#StructureLab).

![](img/minerals-02.png)

One reaction requires three labs: two as reagent sources, and the third one as the produce collector. The labs should be within the range of 2 squares from each other. One lab cannot contain more than one mineral type at the same time.

<img src="img/2016-03-09_10-32-33.gif" align="right">

    var labs = room.find(FIND_MY_STRUCTURES, 
        {filter: {structureType: STRUCTURE_LAB}});

    labs[0].runReaction(labs[1], labs[2]);

    // on the next tick...

    console.log(labs[0].mineralType) // -> OH
    console.log(labs[1].mineralType) // -> O
    console.log(labs[2].mineralType) // -> H

## Creep 增强

Apart from running chemical reactions with minerals, a lab can use resulting compounds to permanently upgrade your creeps boosting their specific properties.

Each compound is applied to one body part of the creep of a certain type using the [`StructureLab.boostCreep`](/api/#StructureLab.boostCreep) method according to the table below and boosts the effectiveness of one of the actions of this creep. The boosted part works as two, three, or even four corresponding parts. To boost the whole creep, you need to boost all its parts of the given type.

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
    text-align: center;
}
.minerals td:nth-child(4) {
    min-width: 87px;
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
    font-size: 11px;
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
<th>Time</th>
<th>Body part</th>
<th>Effect</th>
</tr>
<tr class=minerals__divider>
<th colspan="5" align="center">Base compounds</th>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/OH.png)hydroxide</td>
<td>![](//static.screeps.com/upload/mineral-icons/H.png) + ![](//static.screeps.com/upload/mineral-icons/O.png)</td>
<td>20</td>
<td>—</td>
<td>—</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/ZK.png)zynthium keanite</td>
<td>![](//static.screeps.com/upload/mineral-icons/Z.png) + ![](//static.screeps.com/upload/mineral-icons/K.png)</td>
<td>5</td>
<td>—</td>
<td>—</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/UL.png)utrium lemergite</td>
<td>![](//static.screeps.com/upload/mineral-icons/U.png) + ![](//static.screeps.com/upload/mineral-icons/L.png)</td>
<td>5</td>
<td>—</td>
<td>—</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/G.png)ghodium</td>
<td>![](//static.screeps.com/upload/mineral-icons/ZK.png) + ![](//static.screeps.com/upload/mineral-icons/UL.png)</td>
<td>5</td>
<td>—</td>
<td>—</td>
</tr>
<tr class=minerals__divider>
<th colspan="5" align="center">Tier 1 compounds</th>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/UH.png)utrium hydride</td>
<td>![](//static.screeps.com/upload/mineral-icons/U.png) + ![](//static.screeps.com/upload/mineral-icons/H.png)</td>
<td>10</td>
<td>`ATTACK`</td>
<td>+100% `attack` effectiveness</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/UO.png)utrium oxide</td>
<td>![](//static.screeps.com/upload/mineral-icons/U.png) + ![](//static.screeps.com/upload/mineral-icons/O.png)</td>
<td>10</td>
<td>`WORK`</td>
<td>+200% `harvest` effectiveness</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/KH.png)keanium hydride</td>
<td>![](//static.screeps.com/upload/mineral-icons/K.png) + ![](//static.screeps.com/upload/mineral-icons/H.png)</td>
<td>10</td>
<td>`CARRY`</td>
<td>+50 capacity</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/KO.png)keanium oxide</td>
<td>![](//static.screeps.com/upload/mineral-icons/K.png) + ![](//static.screeps.com/upload/mineral-icons/O.png)</td>
<td>10</td>
<td>`RANGED_ATTACK`</td>
<td>+100% `rangedAttack` and `rangedMassAttack` effectiveness</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/LH.png)lemergium hydride</td>
<td>![](//static.screeps.com/upload/mineral-icons/L.png) + ![](//static.screeps.com/upload/mineral-icons/H.png)</td>
<td>15</td>
<td>`WORK`</td>
<td>+50% `repair` and `build` effectiveness without increasing the energy cost</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/LO.png)lemergium oxide</td>
<td>![](//static.screeps.com/upload/mineral-icons/L.png) + ![](//static.screeps.com/upload/mineral-icons/O.png)</td>
<td>10</td>
<td>`HEAL`</td>
<td>+100% `heal` and `rangedHeal` effectiveness</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/ZH.png)zynthium hydride</td>
<td>![](//static.screeps.com/upload/mineral-icons/Z.png) + ![](//static.screeps.com/upload/mineral-icons/H.png)</td>
<td>20</td>
<td>`WORK`</td>
<td>+100% `dismantle` effectiveness</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/ZO.png)zynthium oxide</td>
<td>![](//static.screeps.com/upload/mineral-icons/Z.png) + ![](//static.screeps.com/upload/mineral-icons/O.png)</td>
<td>10</td>
<td>`MOVE`</td>
<td>+100% fatigue decrease speed</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/GH.png)ghodium hydride</td>
<td>![](//static.screeps.com/upload/mineral-icons/G.png) + ![](//static.screeps.com/upload/mineral-icons/H.png)</td>
<td>10</td>
<td>`WORK`</td>
<td>+50% `upgradeController` effectiveness without increasing the energy cost</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/GO.png)ghodium oxide</td>
<td>![](//static.screeps.com/upload/mineral-icons/G.png) + ![](//static.screeps.com/upload/mineral-icons/O.png)</td>
<td>10</td>
<td>`TOUGH`</td>
<td>-30% damage taken</td>
</tr>
<tr class=minerals__divider>
<th colspan="5" align="center">Tier 2 compounds</th>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/UH2O.png)utrium acid</td>
<td>![](//static.screeps.com/upload/mineral-icons/UH.png) + ![](//static.screeps.com/upload/mineral-icons/OH.png)</td>
<td>5</td>
<td>`ATTACK`</td>
<td>+200% `attack` effectiveness</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/UHO2.png)utrium alkalide</td>
<td>![](//static.screeps.com/upload/mineral-icons/UO.png) + ![](//static.screeps.com/upload/mineral-icons/OH.png)</td>
<td>5</td>
<td>`WORK`</td>
<td>+400% `harvest` effectiveness</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/KH2O.png)keanium acid</td>
<td>![](//static.screeps.com/upload/mineral-icons/KH.png) + ![](//static.screeps.com/upload/mineral-icons/OH.png)</td>
<td>5</td>
<td>`CARRY`</td>
<td>+100 capacity</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/KHO2.png)keanium alkalide</td>
<td>![](//static.screeps.com/upload/mineral-icons/KO.png) + ![](//static.screeps.com/upload/mineral-icons/OH.png)</td>
<td>5</td>
<td>`RANGED_ATTACK`</td>
<td>+200% `rangedAttack` and `rangedMassAttack` effectiveness</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/LH2O.png)lemergium acid</td>
<td>![](//static.screeps.com/upload/mineral-icons/LH.png) + ![](//static.screeps.com/upload/mineral-icons/OH.png)</td>
<td>10</td>
<td>`WORK`</td>
<td>+80% `repair` and `build` effectiveness without increasing the energy cost</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/LHO2.png)lemergium alkalide</td>
<td>![](//static.screeps.com/upload/mineral-icons/LO.png) + ![](//static.screeps.com/upload/mineral-icons/OH.png)</td>
<td>5</td>
<td>`HEAL`</td>
<td>+200% `heal` and `rangedHeal` effectiveness</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/ZH2O.png)zynthium acid</td>
<td>![](//static.screeps.com/upload/mineral-icons/ZH.png) + ![](//static.screeps.com/upload/mineral-icons/OH.png)</td>
<td>40</td>
<td>`WORK`</td>
<td>+200% `dismantle` effectiveness</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/ZHO2.png)zynthium alkalide</td>
<td>![](//static.screeps.com/upload/mineral-icons/ZO.png) + ![](//static.screeps.com/upload/mineral-icons/OH.png)</td>
<td>5</td>
<td>`MOVE`</td>
<td>+200% fatigue decrease speed</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/GH2O.png)ghodium acid</td>
<td>![](//static.screeps.com/upload/mineral-icons/GH.png) + ![](//static.screeps.com/upload/mineral-icons/OH.png)</td>
<td>15</td>
<td>`WORK`</td>
<td>+80% `upgradeController` effectiveness without increasing the energy cost</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/GHO2.png)ghodium alkalide</td>
<td>![](//static.screeps.com/upload/mineral-icons/GO.png) + ![](//static.screeps.com/upload/mineral-icons/OH.png)</td>
<td>30</td>
<td>`TOUGH`</td>
<td>-50% damage taken</td>
</tr>
<tr class=minerals__divider>
<th colspan="5" align="center">Tier 3 compounds</th>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/XUH2O.png)catalyzed utrium acid</td>
<td>![](//static.screeps.com/upload/mineral-icons/UH2O.png) + ![](//static.screeps.com/upload/mineral-icons/X.png)</td>
<td>60</td>
<td>`ATTACK`</td>
<td>+300% `attack` effectiveness</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/XUHO2.png)catalyzed utrium alkalide</td>
<td>![](//static.screeps.com/upload/mineral-icons/UHO2.png) + ![](//static.screeps.com/upload/mineral-icons/X.png)</td>
<td>60</td>
<td>`WORK`</td>
<td>+600% `harvest` effectiveness</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/XKH2O.png)catalyzed keanium acid</td>
<td>![](//static.screeps.com/upload/mineral-icons/KH2O.png) + ![](//static.screeps.com/upload/mineral-icons/X.png)</td>
<td>60</td>
<td>`CARRY`</td>
<td>+150 capacity</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/XKHO2.png)catalyzed keanium alkalide</td>
<td>![](//static.screeps.com/upload/mineral-icons/KHO2.png) + ![](//static.screeps.com/upload/mineral-icons/X.png)</td>
<td>60</td>
<td>`RANGED_ATTACK`</td>
<td>+300% `rangedAttack` and `rangedMassAttack` effectiveness</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/XLH2O.png)catalyzed lemergium acid</td>
<td>![](//static.screeps.com/upload/mineral-icons/LH2O.png) + ![](//static.screeps.com/upload/mineral-icons/X.png)</td>
<td>65</td>
<td>`WORK`</td>
<td>+100% `repair` and `build` effectiveness without increasing the energy cost</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/XLHO2.png)catalyzed lemergium alkalide</td>
<td>![](//static.screeps.com/upload/mineral-icons/LHO2.png) + ![](//static.screeps.com/upload/mineral-icons/X.png)</td>
<td>60</td>
<td>`HEAL`</td>
<td>+300% `heal` and `rangedHeal` effectiveness</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/XZH2O.png)catalyzed zynthium acid</td>
<td>![](//static.screeps.com/upload/mineral-icons/ZH2O.png) + ![](//static.screeps.com/upload/mineral-icons/X.png)</td>
<td>160</td>
<td>`WORK`</td>
<td>+300% `dismantle` effectiveness</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/XZHO2.png)catalyzed zynthium alkalide</td>
<td>![](//static.screeps.com/upload/mineral-icons/ZHO2.png) + ![](//static.screeps.com/upload/mineral-icons/X.png)</td>
<td>60</td>
<td>`MOVE`</td>
<td>+300% fatigue decrease speed</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/XGH2O.png)catalyzed ghodium acid</td>
<td>![](//static.screeps.com/upload/mineral-icons/GH2O.png) + ![](//static.screeps.com/upload/mineral-icons/X.png)</td>
<td>80</td>
<td>`WORK`</td>
<td>+100% `upgradeController` effectiveness without increasing the energy cost</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/XGHO2.png)catalyzed ghodium alkalide</td>
<td>![](//static.screeps.com/upload/mineral-icons/GHO2.png) + ![](//static.screeps.com/upload/mineral-icons/X.png)</td>
<td>150</td>
<td>`TOUGH`</td>
<td>-70% damage taken</td>
</tr>
</tbody>
</table>
