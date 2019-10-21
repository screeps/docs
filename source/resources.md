title: Resources
---

There are 4 kinds of resources in the game: **energy**, **minerals**, **power**, and **commodities**. 
Resources can be harvested, processed, traded on the market, carried by creeps, and stored in structures.
All resource kinds have different purposes, and you start playing only with access to the most basic one: energy.

## Energy

{% note info %}
**Where to get:** a [`Source`](/api/#Source) in almost any room. <br>
**How to get:** send a creep with a `WORK` part and [`harvest`](/api/#Creep.harvest) it. <br>
**Needed for:** spawning creeps, building structures.
{% endnote %} 

Energy is the main construction material in the Screeps world. Your base works on energy, so harvesting plenty of it is vital for any colony.
You can harvest energy not only in your home room, but also in other rooms remotely to increase energy income.

## Minerals

{% note info %}
**Where to get:** a [`Mineral`](/api/#Mineral) in almost any room. <br>
**How to get:** build a [`StructureExtractor`](/api/#StructureExtractor), send a creep with a `WORK` part, and [`harvest`](/api/#Creep.harvest) it. <br>
**Needed for:** boosting creeps' capabilities, and also for producing trade commodities.
{% endnote %}

By mining and processing minerals, you can significantly speed up your economy and boost the effectiveness of your creeps.

Working with minerals consists of 3 steps:

### Harvesting

There are 7 types of base minerals shown in the picture below.

![](img/minerals-01.png)
 
Each room contains only one mineral type, so in order to handle them effectively you need either access to several suitable rooms or trade relationships with other players.

<img src="img/mining_minerals.png" align="right">A mineral deposit is located in a room at a spot marked by a special symbol. To start mining the deposit, you need to construct the special structure [**Extractor**](/api/#StructureExtractor) on top of it (available at Room Controller Level 6). Upon building it, you can start applying the method [`harvest`](/api/#Creep.harvest) to the deposit thus mining the corresponding mineral in the same way you harvest energy.

### Mineral compounds

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

### Creep boosts

Apart from running chemical reactions with minerals, a lab can use resulting compounds to permanently upgrade your creeps boosting their specific properties.

Each compound is applied to one body part of the creep of a certain type using the [`StructureLab.boostCreep`](/api/#StructureLab.boostCreep) method according to the table below and boosts the effectiveness of one of the actions of this creep. The boosted part works as two, three, or even four corresponding parts. To boost the whole creep, you need to boost all its parts of the given type.

Boosting one body part takes 30 mineral compound units and 20 energy units. One body part can be boosted only with one compound type.

<style>
.minerals,
.commodities {
    margin-top: 0 !important;
    border: 0 !important;
    width: 100%;
}
.minerals td,
.commodities td {
    border-top: 1px solid #333;
    color: #bbb;
    background-color: #22242b;
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
.minerals img,
.commodities img {
    margin-right: 5px;
    vertical-align: middle;
} 
.minerals__divider th {
    background-color: #333;
    color: #ffe099;
    text-align: center;
    font-size: 13px;
}
.minerals__head th,
.commodities__head th{
    background-color: #22242b;
    color: #ccc;
    font-weight: normal !important;
    font-size: 11px;
}

.commodities em {
    font-style: normal;
    color: #eaeaea;
}
.commodities td {
    padding: 10px 15px !important;
}
</style>

<div class="collapsible-table">

<div class="collapsible-table__header">
<i class="fa fa-plus-square"></i>
<span>Mineral compounds</span>
<em>(click to expand)</em>
</div>

<div class="collapsible-table__content">

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
</div>
</div>


## Power

{% note info %}
**Where to get:** a [`StructurePowerBank`](/api/#StructurePowerBank) in "highway" rooms. <br>
**How to get:** destroy the structure and loot the dropped resource. <br>
**Needed for:** creating Power Creeps.
{% endnote %}

See this article for more info: [Power](power.html).

## Commodities

{% note info %}
**Where to get:** a [`Deposit`](/api/#Deposit) in "highway" rooms. <br>
**How to get:** send a creep with a `WORK` part and [`harvest`](/api/#Creep.harvest) it. <br>
**Needed for:** producing trade commodities and earning credits.
{% endnote %}

Trade commodities are resources that NPC market traders are most interested in. These resources have no other purpose
other than to be sold and generate credits. Producing high-level commodities is the most profitable business in the game.


### Harvesting

You harvest raw commodities from a [`Deposit`](/api/#Deposit) in "highway" rooms that divide living sectors on the map.
There are 4 types of raw resources: Metal, Silicon, Biomass, Mist. 
They are distributed unevenly across the world map: one resource type per map quadrant (NW, NE, SW, SE). 

![](img/commodities.png)

Unlike minerals, these deposits exhaust as you harvest them: the more you harvest, the longer cooldown becomes. 
They vanish when you stop harvesting it after some time, and reappear elsewhere nearby. 
Also, a new deposit will appear in the sector if all other deposits are exhausted below some level.

### Basic commodities

Selling raw resources may be not very profitable. 
This is why it's a better idea to build a [**Factory**](/api/#StructureFactory) (available at RCL 7) in order to [`produce`](/api/#StructureFactory.produce) more complex commodities.

A newly built factory has no level which means it can produce just a few basic commodities out of all kinds of existing resources ("any level" tier in the tables below). 
They also can be used to store resources in a "compressed" form.

<div class="collapsible-table">

<div class="collapsible-table__header">
<i class="fa fa-plus-square"></i>
<span>Compressing commodities</span>
<em>(click to expand)</em>
![](img/commodities1.png)
</div>

<div class="collapsible-table__content"> 
<table class="commodities">
<tbody>
<tr class=commodities__head>
<th>Product</th><th>Factory</th><th>Components</th><th>Cooldown</th>
</tr> 
<tr><td>{% resource 'Utrium bar' %}&nbsp;&times;&nbsp;<em>100</em></td><td>Any level</td><td>![](//static.screeps.com/upload/mineral-icons/U.png)Utrium&nbsp;&times;&nbsp;<em>500</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>200</em></td><td>20&nbsp;ticks</td></tr>
<tr><td>{% resource "Lemergium bar" %}&nbsp;&times;&nbsp;<em>100</em></td><td>Any level</td><td>![](//static.screeps.com/upload/mineral-icons/L.png)Lemergium&nbsp;&times;&nbsp;<em>500</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>200</em></td><td>20&nbsp;ticks</td></tr>
<tr><td>{% resource 'Zynthium bar' %}&nbsp;&times;&nbsp;<em>100</em></td><td>Any level</td><td>![](//static.screeps.com/upload/mineral-icons/Z.png)Zynthium&nbsp;&times;&nbsp;<em>500</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>200</em></td><td>20&nbsp;ticks</td></tr>
<tr><td>{% resource 'Keanium bar' %}&nbsp;&times;&nbsp;<em>100</em></td><td>Any level</td><td>![](//static.screeps.com/upload/mineral-icons/K.png)Keanium&nbsp;&times;&nbsp;<em>500</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>200</em></td><td>20&nbsp;ticks</td></tr>
<tr><td>{% resource 'Ghodium melt' %}&nbsp;&times;&nbsp;<em>100</em></td><td>Any level</td><td>![](//static.screeps.com/upload/mineral-icons/G.png)Ghodium&nbsp;&times;&nbsp;<em>500</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>200</em></td><td>20&nbsp;ticks</td></tr>
<tr><td>{% resource 'Oxidant' %}&nbsp;&times;&nbsp;<em>100</em></td><td>Any level</td><td>![](//static.screeps.com/upload/mineral-icons/O.png)Oxygen&nbsp;&times;&nbsp;<em>500</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>200</em></td><td>20&nbsp;ticks</td></tr>
<tr><td>{% resource 'Reductant' %}&nbsp;&times;&nbsp;<em>100</em></td><td>Any level</td><td>![](//static.screeps.com/upload/mineral-icons/H.png)Hydrogen&nbsp;&times;&nbsp;<em>500</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>200</em></td><td>20&nbsp;ticks</td></tr>
<tr><td>{% resource 'Purifier' %}&nbsp;&times;&nbsp;<em>100</em></td><td>Any level</td><td>![](//static.screeps.com/upload/mineral-icons/X.png)Catalyst&nbsp;&times;&nbsp;<em>500</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>200</em></td><td>20&nbsp;ticks</td></tr>
<tr><td>{% resource 'Battery' %}&nbsp;&times;&nbsp;<em>50</em></td><td>Any level</td><td>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>600</em></td><td>10&nbsp;ticks</td></tr>
</tbody>
</table>

</div>
</div>
 
 You can decompress to recover raw resources when you need them. 
 
 <div class="collapsible-table">
 
 <div class="collapsible-table__header">
 <i class="fa fa-plus-square"></i>
 <span>Decompressing commodities</span>
 <em>(click to expand)</em>
 ![](img/commodities2.png)
 </div>
 
 <div class="collapsible-table__content">
 <table class="commodities">
 <tr class="commodities__head"><th>Product</th><th>Factory</th><th>Components</th><th>Cooldown</th></tr> 
 <tr><td>![](//static.screeps.com/upload/mineral-icons/U.png)Utrium&nbsp;&times;&nbsp;<em>500</em></td><td>Any level</td><td>{% resource 'Utrium bar' %}&nbsp;&times;&nbsp;<em>100</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>200</em></td><td>20&nbsp;ticks</td></tr>
 <tr><td>![](//static.screeps.com/upload/mineral-icons/L.png)Lemergium&nbsp;&times;&nbsp;<em>500</em></td><td>Any level</td><td>{% resource 'Lemergium bar' %}&nbsp;&times;&nbsp;<em>100</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>200</em></td><td>20&nbsp;ticks</td></tr>
 <tr><td>![](//static.screeps.com/upload/mineral-icons/Z.png)Zynthium&nbsp;&times;&nbsp;<em>500</em></td><td>Any level</td><td>{% resource 'Zynthium bar' %}&nbsp;&times;&nbsp;<em>100</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>200</em></td><td>20&nbsp;ticks</td></tr>
 <tr><td>![](//static.screeps.com/upload/mineral-icons/K.png)Keanium&nbsp;&times;&nbsp;<em>500</em></td><td>Any level</td><td>{% resource 'Keanium bar' %}&nbsp;&times;&nbsp;<em>100</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>200</em></td><td>20&nbsp;ticks</td></tr>
 <tr><td>![](//static.screeps.com/upload/mineral-icons/G.png)Ghodium&nbsp;&times;&nbsp;<em>500</em></td><td>Any level</td><td>{% resource 'Ghodium melt' %}&nbsp;&times;&nbsp;<em>100</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>200</em></td><td>20&nbsp;ticks</td></tr>
 <tr><td>![](//static.screeps.com/upload/mineral-icons/O.png)Oxygen&nbsp;&times;&nbsp;<em>500</em></td><td>Any level</td><td>{% resource 'Oxidant' %}&nbsp;&times;&nbsp;<em>100</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>200</em></td><td>20&nbsp;ticks</td></tr>
 <tr><td>![](//static.screeps.com/upload/mineral-icons/H.png)Hydrogen&nbsp;&times;&nbsp;<em>500</em></td><td>Any level</td><td>{% resource 'Reductant' %}&nbsp;&times;&nbsp;<em>100</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>200</em></td><td>20&nbsp;ticks</td></tr>
 <tr><td>![](//static.screeps.com/upload/mineral-icons/X.png)Catalyst&nbsp;&times;&nbsp;<em>500</em></td><td>Any level</td><td>{% resource 'Purifier' %}&nbsp;&times;&nbsp;<em>100</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>200</em></td><td>20&nbsp;ticks</td></tr>
 <tr><td>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>500</em></td><td>Any level</td><td>{% resource 'Battery' %}&nbsp;&times;&nbsp;<em>50</em></td><td>10&nbsp;ticks</td></tr>
 </table> 

 </div>
 </div>
 
 When you gain access to regional deposit resources, you can start producing additional basic commodities from them.
 
<div class="collapsible-table">

<div class="collapsible-table__header">
<i class="fa fa-plus-square"></i>
<span>Basic regional commodities</span>
<em>(click to expand)</em>
![](img/commodities3.png)
</div>

<div class="collapsible-table__content">
<table class="commodities">
<tr class="commodities__head"><th>Product</th><th>Factory</th><th>Components</th><th>Cooldown</th></tr> 
<tr><td>{% resource 'Wire' %}&nbsp;&times;&nbsp;<em>20</em></td><td>Any level</td><td>{% resource 'Utrium bar' %}&nbsp;&times;&nbsp;<em>20</em><br>{% resource 'Silicon' %}&nbsp;&times;&nbsp;<em>100</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>40</em></td><td>8&nbsp;ticks</td></tr>
<tr><td>{% resource 'Cell' %}&nbsp;&times;&nbsp;<em>20</em></td><td>Any level</td><td>{% resource 'Lemergium bar' %}&nbsp;&times;&nbsp;<em>20</em><br>{% resource 'Biomass' %}&nbsp;&times;&nbsp;<em>100</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>40</em></td><td>8&nbsp;ticks</td>
<tr><td>{% resource 'Alloy' %}&nbsp;&times;&nbsp;<em>20</em></td><td>Any level</td><td>{% resource 'Zynthium bar' %}&nbsp;&times;&nbsp;<em>20</em><br>{% resource 'Metal' %}&nbsp;&times;&nbsp;<em>100</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>40</em></td><td>8&nbsp;ticks</td></tr>
<tr><td>{% resource 'Condensate' %}&nbsp;&times;&nbsp;<em>20</em></td><td>Any level</td><td>{% resource 'Keanium bar' %}&nbsp;&times;&nbsp;<em>20</em><br>{% resource 'Mist' %}&nbsp;&times;&nbsp;<em>100</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>40</em></td><td>8&nbsp;ticks</td></tr>
</table>
</div>
</div>

All commodities above can be produced in a factory of any level.

### Higher commodities
  
The full use of factories is possible with [Operators](power.html#Power-Creeps) only, and their `OPERATE_FACTORY` power. 
When an Operator uses this power on a factory without a level, the level of the factory is permanently set to the level of the power, and the same effect is applied on the factory. 
It enables the factory to produce commodities of the corresponding level. 
The factory can only produce commodities of exactly the same level, or "any level" commodities. 
Once set, the factory level cannot be changed. 
When the effect duration ends, the factory simply becomes inactive, but its level remains the same ("any level" commodities are still available though). 
You need an Operator with the same power level to reactivate it again. 
Another level cannot be applied, the only way to change the factory level is to rebuild it.
  
Each of high-level commodities requires lower level commodities to be produced which forms production chains. There are four production chains, one for each of new resource types: 
**Mechanical** (consumes Metal), **Electronical** (consumes Silicon), **Biological** (consumes Biomass), and **Mystical** (consumes Mist), as well as common components. 
These commodities have the most lucrative prices on the market.

<div class="collapsible-table">
<div class="collapsible-table__header">
<i class="fa fa-plus-square"></i>
<span>Common higher commodities</span>
<em>(click to expand)</em>
![](img/commodities4.png)
</div>

<div class="collapsible-table__content">
<table class="commodities">
<tr class="commodities__head"><th>Product</th><th>Factory</th><th>Components</th><th>Cooldown</th></tr> 
<tr><td>{% resource 'Composite' %}&nbsp;&times;&nbsp;<em>20</em></td><td>Lvl 1</td><td>{% resource 'Utrium bar' %}&nbsp;&times;&nbsp;<em>20</em><br>{% resource 'Zynthium bar' %}&nbsp;&times;&nbsp;<em>20</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>20</em></td><td>50&nbsp;ticks</td></tr>
<tr><td>{% resource 'Crystal' %}&nbsp;&times;&nbsp;<em>6</em></td><td>Lvl 2</td><td>{% resource 'Lemergium bar' %}&nbsp;&times;&nbsp;<em>6</em><br>{% resource 'Keanium bar' %}&nbsp;&times;&nbsp;<em>6</em><br>{% resource 'Purifier' %}&nbsp;&times;&nbsp;<em>6</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>45</em></td><td>21&nbsp;ticks</td></tr>
<tr><td>{% resource 'Liquid' %}&nbsp;&times;&nbsp;<em>12</em></td><td>Lvl 3</td><td>{% resource 'Oxidant' %}&nbsp;&times;&nbsp;<em>12</em><br>{% resource 'Reductant' %}&nbsp;&times;&nbsp;<em>12</em><br>{% resource 'Ghodium melt' %}&nbsp;&times;&nbsp;<em>12</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>90</em></td><td>60&nbsp;ticks</td></tr>
</table>
</div>
</div>

<div class="collapsible-table">
<div class="collapsible-table__header">
<i class="fa fa-plus-square"></i>
<span>Mechanical chain</span>
<em>(click to expand)</em>
![](img/commodities5.png)
</div>

<div class="collapsible-table__content">
<table class="commodities">
<tr class="commodities__head"><th>Product</th><th>Factory</th><th>Components</th><th>Cooldown</th></tr>
<tr><td>{% resource 'Tube' %}&nbsp;&times;&nbsp;<em>2</em></td><td>Lvl 1</td><td>{% resource 'Alloy' %}&nbsp;&times;&nbsp;<em>40</em><br>{% resource 'Zynthium bar' %}&nbsp;&times;&nbsp;<em>16</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>8</em></td><td>45&nbsp;ticks</td></tr>
<tr><td>{% resource 'Fixtures' %}</td><td>Lvl 2</td><td>{% resource 'Composite' %}&nbsp;&times;&nbsp;<em>20</em><br>{% resource 'Alloy' %}&nbsp;&times;&nbsp;<em>41</em><br>{% resource 'Oxidant' %}&nbsp;&times;&nbsp;<em>161</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>8</em></td><td>115&nbsp;ticks</td></tr>
<tr><td>{% resource 'Frame' %}</td><td>Lvl 3</td><td>{% resource 'Fixtures' %}&nbsp;&times;&nbsp;<em>2</em><br>{% resource 'Tube' %}&nbsp;&times;&nbsp;<em>4</em><br>{% resource 'Reductant' %}&nbsp;&times;&nbsp;<em>330</em><br>{% resource 'Zynthium bar' %}&nbsp;&times;&nbsp;<em>31</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>16</em></td><td>125&nbsp;ticks</td></tr>
<tr><td>{% resource 'Hydraulics' %}</td><td>Lvl 4</td><td>{% resource 'Liquid' %}&nbsp;&times;&nbsp;<em>150</em><br>{% resource 'Fixtures' %}&nbsp;&times;&nbsp;<em>3</em><br>{% resource 'Tube' %}&nbsp;&times;&nbsp;<em>15</em><br>{% resource 'Purifier' %}&nbsp;&times;&nbsp;<em>208</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>32</em></td><td>800&nbsp;ticks</td></tr>
<tr><td>{% resource 'Machine' %}</td><td>Lvl 5</td><td>{% resource 'Hydraulics' %}&nbsp;&times;&nbsp;<em>1</em><br>{% resource 'Frame' %}&nbsp;&times;&nbsp;<em>2</em><br>{% resource 'Fixtures' %}&nbsp;&times;&nbsp;<em>3</em><br>{% resource 'Tube' %}&nbsp;&times;&nbsp;<em>12</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>64</em></td><td>600&nbsp;ticks</td></tr>
</table>
</div>
</div>

<div class="collapsible-table">
<div class="collapsible-table__header">
<i class="fa fa-plus-square"></i>
<span>Biological chain</span>
<em>(click to expand)</em>
![](img/commodities6.png)
</div>

<div class="collapsible-table__content">
<table class="commodities">
<tr class="commodities__head"><th>Product</th><th>Factory</th><th>Components</th><th>Cooldown</th></tr>
<tr><td>{% resource 'Phlegm' %}&nbsp;&times;&nbsp;<em>2</em></td><td>Lvl 1</td><td>{% resource 'Cell' %}&nbsp;&times;&nbsp;<em>20</em><br>{% resource 'Oxidant' %}&nbsp;&times;&nbsp;<em>36</em><br>{% resource 'Lemergium bar' %}&nbsp;&times;&nbsp;<em>16</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>8</em></td><td>35&nbsp;ticks</td></tr>
<tr><td>{% resource 'Tissue' %}&nbsp;&times;&nbsp;<em>2</em></td><td>Lvl 2</td><td>{% resource 'Phlegm' %}&nbsp;&times;&nbsp;<em>10</em><br>{% resource 'Cell' %}&nbsp;&times;&nbsp;<em>10</em><br>{% resource 'Reductant' %}&nbsp;&times;&nbsp;<em>110</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>16</em></td><td>164&nbsp;ticks</td></tr>
<tr><td>{% resource 'Muscle' %}</td><td>Lvl 3</td><td>{% resource 'Tissue' %}&nbsp;&times;&nbsp;<em>3</em><br>{% resource 'Phlegm' %}&nbsp;&times;&nbsp;<em>3</em><br>{% resource 'Zynthium bar' %}&nbsp;&times;&nbsp;<em>50</em><br>{% resource 'Reductant' %}&nbsp;&times;&nbsp;<em>50</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>16</em></td><td>250&nbsp;ticks</td></tr>
<tr><td>{% resource 'Organoid' %}</td><td>Lvl 4</td><td>{% resource 'Muscle' %}&nbsp;&times;&nbsp;<em>1</em><br>{% resource 'Tissue' %}&nbsp;&times;&nbsp;<em>5</em><br>{% resource 'Purifier' %}&nbsp;&times;&nbsp;<em>208</em><br>{% resource 'Oxidant' %}&nbsp;&times;&nbsp;<em>256</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>32</em></td><td>800&nbsp;ticks</td></tr>
<tr><td>{% resource 'Organism' %}</td><td>Lvl 5</td><td>{% resource 'Organoid' %}&nbsp;&times;&nbsp;<em>1</em><br>{% resource 'Liquid' %}&nbsp;&times;&nbsp;<em>150</em><br>{% resource 'Tissue' %}&nbsp;&times;&nbsp;<em>6</em><br>{% resource 'Cell' %}&nbsp;&times;&nbsp;<em>310</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>64</em></td><td>600&nbsp;ticks</td></tr>
</table>
</div>
</div>

<div class="collapsible-table">
<div class="collapsible-table__header">
<i class="fa fa-plus-square"></i>
<span>Electronical chain</span>
<em>(click to expand)</em>
![](img/commodities7.png)
</div>

<div class="collapsible-table__content">
<table class="commodities">
<tr class="commodities__head"><th>Product</th><th>Factory</th><th>Components</th><th>Cooldown</th></tr>
<tr><td>{% resource 'Switch' %}&nbsp;&times;&nbsp;<em>5</em></td><td>Lvl 1</td><td>{% resource 'Wire' %}&nbsp;&times;&nbsp;<em>40</em><br>{% resource 'Oxidant' %}&nbsp;&times;&nbsp;<em>95</em><br>{% resource 'Utrium bar' %}&nbsp;&times;&nbsp;<em>35</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>20</em></td><td>70&nbsp;ticks</td></tr>
<tr><td>{% resource 'Transistor' %}</td><td>Lvl 2</td><td>{% resource 'Switch' %}&nbsp;&times;&nbsp;<em>4</em><br>{% resource 'Wire' %}&nbsp;&times;&nbsp;<em>15</em><br>{% resource 'Reductant' %}&nbsp;&times;&nbsp;<em>85</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>8</em></td><td>59&nbsp;ticks</td></tr>
<tr><td>{% resource 'Microchip' %}</td><td>Lvl 3</td><td>{% resource 'Transistor' %}&nbsp;&times;&nbsp;<em>2</em><br>{% resource 'Composite' %}&nbsp;&times;&nbsp;<em>50</em><br>{% resource 'Wire' %}&nbsp;&times;&nbsp;<em>117</em><br>{% resource 'Purifier' %}&nbsp;&times;&nbsp;<em>25</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>16</em></td><td>250&nbsp;ticks</td></tr>
<tr><td>{% resource 'Circuit' %}</td><td>Lvl 4</td><td>{% resource 'Microchip' %}&nbsp;&times;&nbsp;<em>1</em><br>{% resource 'Transistor' %}&nbsp;&times;&nbsp;<em>5</em><br>{% resource 'Switch' %}&nbsp;&times;&nbsp;<em>4</em><br>{% resource 'Oxidant' %}&nbsp;&times;&nbsp;<em>115</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>32</em></td><td>800&nbsp;ticks</td></tr>
<tr><td>{% resource 'Device' %}</td><td>Lvl 5</td><td>{% resource 'Circuit' %}&nbsp;&times;&nbsp;<em>1</em><br>{% resource 'Microchip' %}&nbsp;&times;&nbsp;<em>3</em><br>{% resource 'Crystal' %}&nbsp;&times;&nbsp;<em>110</em><br>{% resource 'Ghodium melt' %}&nbsp;&times;&nbsp;<em>150</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>64</em></td><td>600&nbsp;ticks</td></tr>
</table>
</div>
</div>

<div class="collapsible-table">
<div class="collapsible-table__header">
<i class="fa fa-plus-square"></i>
<span>Mystical chain</span>
<em>(click to expand)</em>
![](img/commodities8.png)
</div>

<div class="collapsible-table__content">
<table class="commodities">
<tr class="commodities__head"><th>Product</th><th>Factory</th><th>Components</th><th>Cooldown</th></tr>
<tr><td>{% resource 'Concentrate' %}&nbsp;&times;&nbsp;<em>3</em></td><td>Lvl 1</td><td>{% resource 'Condensate' %}&nbsp;&times;&nbsp;<em>30</em><br>{% resource 'Keanium bar' %}&nbsp;&times;&nbsp;<em>15</em><br>{% resource 'Reductant' %}&nbsp;&times;&nbsp;<em>54</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>12</em></td><td>41&nbsp;ticks</td></tr>
<tr><td>{% resource 'Extract' %}&nbsp;&times;&nbsp;<em>2</em></td><td>Lvl 2</td><td>{% resource 'Concentrate' %}&nbsp;&times;&nbsp;<em>10</em><br>{% resource 'Condensate' %}&nbsp;&times;&nbsp;<em>30</em><br>{% resource 'Oxidant' %}&nbsp;&times;&nbsp;<em>60</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>16</em></td><td>128&nbsp;ticks</td></tr>
<tr><td>{% resource 'Spirit' %}</td><td>Lvl 3</td><td>{% resource 'Extract' %}&nbsp;&times;&nbsp;<em>2</em><br>{% resource 'Concentrate' %}&nbsp;&times;&nbsp;<em>6</em><br>{% resource 'Reductant' %}&nbsp;&times;&nbsp;<em>90</em><br>{% resource 'Purifier' %}&nbsp;&times;&nbsp;<em>20</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>16</em></td><td>200&nbsp;ticks</td></tr>
<tr><td>{% resource 'Emanation' %}</td><td>Lvl 4</td><td>{% resource 'Spirit' %}&nbsp;&times;&nbsp;<em>2</em><br>{% resource 'Extract' %}&nbsp;&times;&nbsp;<em>2</em><br>{% resource 'Concentrate' %}&nbsp;&times;&nbsp;<em>3</em><br>{% resource 'Keanium bar' %}&nbsp;&times;&nbsp;<em>112</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>32</em></td><td>800&nbsp;ticks</td></tr>
<tr><td>{% resource 'Essence' %}</td><td>Lvl 5</td><td>{% resource 'Emanation' %}&nbsp;&times;&nbsp;<em>1</em><br>{% resource 'Spirit' %}&nbsp;&times;&nbsp;<em>3</em><br>{% resource 'Crystal' %}&nbsp;&times;&nbsp;<em>110</em><br>{% resource 'Ghodium melt' %}&nbsp;&times;&nbsp;<em>150</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>64</em></td><td>600&nbsp;ticks</td></tr>
</table>
</div>
</div>