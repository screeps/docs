title: 资源
---

游戏中有 4 种资源：**能源(energy)**，**矿物(minerals)**，**超能(power)**和**商品(commodities)**。资源可以被采集，加工，在市场上交易，由 creeps 携带并存储在建筑物中。所有资源类型都有不同的用途，您只有在获得最基本的资源（能源）的情况下才能开始游戏。

## 能量

{% note info %}
**从哪里获取:** 绝大多数房间中都有的 [`Source`](/api/#Source) 结构. <br>
**怎么样获取:** 派遣一个拥有 `WORK` 身体部件的 creep 来 [`采集(harvest)`](/api/#Creep.harvest) 它。<br>
**用来干什么:** 孵化 creeps，建造建筑。
{% endnote %} 

能量是 Screeps 世界中的主要建筑材料。你的基地运转依赖于能量。所以采集更多的能量对于每个领地都至关重要。你不仅可以从占领的房间里采集能量，同样可以从其他房间里采集能量来提高收入。

## 矿物

{% note info %}
**从哪里获取:** 绝大多数房间中都有的 [`Mineral`](/api/#Mineral) 结构。 <br>
**怎么样获取:** 建造一个 [`StructureExtractor`](/api/#StructureExtractor), 然后派遣一个拥有 `WORK` 身体部件的 creep 来 [`采集(harvest)`](/api/#Creep.harvest) 它。<br>
**用来干什么:** 强化 creep 的能力, 或者生产贸易商品。
{% endnote %}

如果能量保证了 creep 的小米步枪，矿物则能为其提供坚船利炮。通过开采及使用矿物，玩家可加速其经济建设及提高其 creep 的工作效率。

矿物利用可分为三个步骤：

*   **开采基本元素**
*   **合成矿物**
*   **强化 Creep**

### 基本元素开采

下图为游戏中所有的七种基本元素

![](img/minerals-01.png)
 
单个房间只会有一个元素矿产，所以若想获得多种矿产，玩家则得控制多个房间或与其他玩家建立贸易关系。

<img src="img/mining_minerals.png" align="right">右图即为矿的示意图（灰色圆形），其上的字母代表了其种类。矿上需要建造[Extractor（矿机）](/api/#StructureExtractor)（绿色虚线圆环，解锁于房间控制等级 6 级）方可进行开采。矿机建造后，玩家的 Creep 便可像采集能量源般的对矿用 [`harvest`（采集）](/api/#Creep.harvest)并采取相应的元素。

### 矿物合成

基本元素本身无法被使用，得按照指定的合成路线被[**Lab（实验室）**](/api/#StructureLab)转化为化合物才能得以利用。

![](img/minerals-02.png)

完成一个反应需要三个 lab ：两个提供底物，一个进行反应及收集产物，lab 的间距不得超过两格。同一 lab 不可混合放置多种化合物，但却能同时为多个反应提供底物。

<img src="img/2016-03-09_10-32-33.gif" align="right">

    var labs = room.find(FIND_MY_STRUCTURES, 
        {filter: {structureType: STRUCTURE_LAB}});

    labs[0].runReaction(labs[1], labs[2]);

    // 下一 tick ...

    console.log(labs[0].mineralType) // -> OH
    console.log(labs[1].mineralType) // -> O
    console.log(labs[2].mineralType) // -> H

### Creep 强化

lab 除了能跑反应，还可用其存着的化合物来强化 Creep 的部件。

玩家可用 [`StructureLab.boostCreep`](/api/#StructureLab.boostCreep) 来强化 Creep 的[部件](creeps.html)，各化合物的强化效果见下表。一个被强化过的部件能顶多个未被强化的部件。要想完全强化一个 creep ，玩家得逐一强化该 creep 的部件。 

强化一个部件需要 30 单位的化合物及 20 单位的能量，且一个部件只能被一种化合物强化。

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
<span>矿物化合物</span>
<em>(点击展开)</em>
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
<th>名称</th>
<th>化学式</th>
<th>合成时间</th>
<th>影响部件</th>
<th>效果</th>
</tr>
<tr class=minerals__divider>
<th colspan="5" align="center">基本元素</th>
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
<th colspan="5" align="center">一级化合物</th>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/UH.png)utrium hydride</td>
<td>![](//static.screeps.com/upload/mineral-icons/U.png) + ![](//static.screeps.com/upload/mineral-icons/H.png)</td>
<td>10</td>
<td>`ATTACK`</td>
<td>+100% `attack` 效率</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/UO.png)utrium oxide</td>
<td>![](//static.screeps.com/upload/mineral-icons/U.png) + ![](//static.screeps.com/upload/mineral-icons/O.png)</td>
<td>10</td>
<td>`WORK`</td>
<td>+200% `harvest` 效率</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/KH.png)keanium hydride</td>
<td>![](//static.screeps.com/upload/mineral-icons/K.png) + ![](//static.screeps.com/upload/mineral-icons/H.png)</td>
<td>10</td>
<td>`CARRY`</td>
<td>+50 容量</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/KO.png)keanium oxide</td>
<td>![](//static.screeps.com/upload/mineral-icons/K.png) + ![](//static.screeps.com/upload/mineral-icons/O.png)</td>
<td>10</td>
<td>`RANGED_ATTACK`</td>
<td>+100% `rangedAttack` 和 `rangedMassAttack` 效率</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/LH.png)lemergium hydride</td>
<td>![](//static.screeps.com/upload/mineral-icons/L.png) + ![](//static.screeps.com/upload/mineral-icons/H.png)</td>
<td>15</td>
<td>`WORK`</td>
<td>+50% `repair` 和 `build` 效率但不增加其能量消耗</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/LO.png)lemergium oxide</td>
<td>![](//static.screeps.com/upload/mineral-icons/L.png) + ![](//static.screeps.com/upload/mineral-icons/O.png)</td>
<td>10</td>
<td>`HEAL`</td>
<td>+100% `heal` 和 `rangedHeal` 效率</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/ZH.png)zynthium hydride</td>
<td>![](//static.screeps.com/upload/mineral-icons/Z.png) + ![](//static.screeps.com/upload/mineral-icons/H.png)</td>
<td>20</td>
<td>`WORK`</td>
<td>+100% `dismantle` 效率</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/ZO.png)zynthium oxide</td>
<td>![](//static.screeps.com/upload/mineral-icons/Z.png) + ![](//static.screeps.com/upload/mineral-icons/O.png)</td>
<td>10</td>
<td>`MOVE`</td>
<td>+100% [fatigue(疲劳值)](creeps.html#移动力) 减低速度</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/GH.png)ghodium hydride</td>
<td>![](//static.screeps.com/upload/mineral-icons/G.png) + ![](//static.screeps.com/upload/mineral-icons/H.png)</td>
<td>10</td>
<td>`WORK`</td>
<td>+50% `upgradeController` 效率但不增加其能量消耗</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/GO.png)ghodium oxide</td>
<td>![](//static.screeps.com/upload/mineral-icons/G.png) + ![](//static.screeps.com/upload/mineral-icons/O.png)</td>
<td>10</td>
<td>`TOUGH`</td>
<td>30% 伤害减免</td>
</tr>
<tr class=minerals__divider>
<th colspan="5" align="center">二级化合物</th>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/UH2O.png)utrium acid</td>
<td>![](//static.screeps.com/upload/mineral-icons/UH.png) + ![](//static.screeps.com/upload/mineral-icons/OH.png)</td>
<td>5</td>
<td>`ATTACK`</td>
<td>+200% `attack` 效率</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/UHO2.png)utrium alkalide</td>
<td>![](//static.screeps.com/upload/mineral-icons/UO.png) + ![](//static.screeps.com/upload/mineral-icons/OH.png)</td>
<td>5</td>
<td>`WORK`</td>
<td>+400% `harvest` 效率</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/KH2O.png)keanium acid</td>
<td>![](//static.screeps.com/upload/mineral-icons/KH.png) + ![](//static.screeps.com/upload/mineral-icons/OH.png)</td>
<td>5</td>
<td>`CARRY`</td>
<td>+100 容量</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/KHO2.png)keanium alkalide</td>
<td>![](//static.screeps.com/upload/mineral-icons/KO.png) + ![](//static.screeps.com/upload/mineral-icons/OH.png)</td>
<td>5</td>
<td>`RANGED_ATTACK`</td>
<td>+200% `rangedAttack` 和 `rangedMassAttack` 效率</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/LH2O.png)lemergium acid</td>
<td>![](//static.screeps.com/upload/mineral-icons/LH.png) + ![](//static.screeps.com/upload/mineral-icons/OH.png)</td>
<td>10</td>
<td>`WORK`</td>
<td>+80% `repair` 和 `build` 效率但不增加其能量消耗</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/LHO2.png)lemergium alkalide</td>
<td>![](//static.screeps.com/upload/mineral-icons/LO.png) + ![](//static.screeps.com/upload/mineral-icons/OH.png)</td>
<td>5</td>
<td>`HEAL`</td>
<td>+200% `heal` 和 `rangedHeal` 效率</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/ZH2O.png)zynthium acid</td>
<td>![](//static.screeps.com/upload/mineral-icons/ZH.png) + ![](//static.screeps.com/upload/mineral-icons/OH.png)</td>
<td>40</td>
<td>`WORK`</td>
<td>+200% `dismantle` 效率</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/ZHO2.png)zynthium alkalide</td>
<td>![](//static.screeps.com/upload/mineral-icons/ZO.png) + ![](//static.screeps.com/upload/mineral-icons/OH.png)</td>
<td>5</td>
<td>`MOVE`</td>
<td>+200% [fatigue(疲劳值)](creeps.html#移动力) 减低速度</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/GH2O.png)ghodium acid</td>
<td>![](//static.screeps.com/upload/mineral-icons/GH.png) + ![](//static.screeps.com/upload/mineral-icons/OH.png)</td>
<td>15</td>
<td>`WORK`</td>
<td>+80% `upgradeController` 效率但不增加其能量消耗</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/GHO2.png)ghodium alkalide</td>
<td>![](//static.screeps.com/upload/mineral-icons/GO.png) + ![](//static.screeps.com/upload/mineral-icons/OH.png)</td>
<td>30</td>
<td>`TOUGH`</td>
<td>50% 伤害减免</td>
</tr>
<tr class=minerals__divider>
<th colspan="5" align="center">三级化合物</th>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/XUH2O.png)catalyzed utrium acid</td>
<td>![](//static.screeps.com/upload/mineral-icons/UH2O.png) + ![](//static.screeps.com/upload/mineral-icons/X.png)</td>
<td>60</td>
<td>`ATTACK`</td>
<td>+300% `attack` 效率</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/XUHO2.png)catalyzed utrium alkalide</td>
<td>![](//static.screeps.com/upload/mineral-icons/UHO2.png) + ![](//static.screeps.com/upload/mineral-icons/X.png)</td>
<td>60</td>
<td>`WORK`</td>
<td>+600% `harvest` 效率</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/XKH2O.png)catalyzed keanium acid</td>
<td>![](//static.screeps.com/upload/mineral-icons/KH2O.png) + ![](//static.screeps.com/upload/mineral-icons/X.png)</td>
<td>60</td>
<td>`CARRY`</td>
<td>+150 容量</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/XKHO2.png)catalyzed keanium alkalide</td>
<td>![](//static.screeps.com/upload/mineral-icons/KHO2.png) + ![](//static.screeps.com/upload/mineral-icons/X.png)</td>
<td>60</td>
<td>`RANGED_ATTACK`</td>
<td>+300% `rangedAttack` 和 `rangedMassAttack` 效率</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/XLH2O.png)catalyzed lemergium acid</td>
<td>![](//static.screeps.com/upload/mineral-icons/LH2O.png) + ![](//static.screeps.com/upload/mineral-icons/X.png)</td>
<td>65</td>
<td>`WORK`</td>
<td>+100% `repair` 和 `build` 效率但不增加其能量消耗</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/XLHO2.png)catalyzed lemergium alkalide</td>
<td>![](//static.screeps.com/upload/mineral-icons/LHO2.png) + ![](//static.screeps.com/upload/mineral-icons/X.png)</td>
<td>60</td>
<td>`HEAL`</td>
<td>+300% `heal` and `rangedHeal` 效率</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/XZH2O.png)catalyzed zynthium acid</td>
<td>![](//static.screeps.com/upload/mineral-icons/ZH2O.png) + ![](//static.screeps.com/upload/mineral-icons/X.png)</td>
<td>160</td>
<td>`WORK`</td>
<td>+300% `dismantle` 效率</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/XZHO2.png)catalyzed zynthium alkalide</td>
<td>![](//static.screeps.com/upload/mineral-icons/ZHO2.png) + ![](//static.screeps.com/upload/mineral-icons/X.png)</td>
<td>60</td>
<td>`MOVE`</td>
<td>+300% [fatigue(疲劳值)](creeps.html#移动力) 减低速度</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/XGH2O.png)catalyzed ghodium acid</td>
<td>![](//static.screeps.com/upload/mineral-icons/GH2O.png) + ![](//static.screeps.com/upload/mineral-icons/X.png)</td>
<td>80</td>
<td>`WORK`</td>
<td>+100% `upgradeController` 效率但不增加其能量消耗</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/XGHO2.png)catalyzed ghodium alkalide</td>
<td>![](//static.screeps.com/upload/mineral-icons/GHO2.png) + ![](//static.screeps.com/upload/mineral-icons/X.png)</td>
<td>150</td>
<td>`TOUGH`</td>
<td>70% 伤害减免</td>
</tr>
</tbody>
</table>
</div>
</div>


**译者注：**元素、化合物名称的各单词取首及为其符号简写，中文译名见下表。


<div class="collapsible-table">

<div class="collapsible-table__header">
<i class="fa fa-plus-square"></i>
<span>矿物中译名</span>
<em>(点击展开)</em>
</div>

<div class="collapsible-table__content">

<table class="minerals">
<colgroup>
<col></col>
<col></col>
</colgroup>
<tbody>
<tr class=minerals__head>
<th>原名</th>
<th>译名</th>
</tr>
<tr class=minerals__divider>
<th colspan="5" align="center">基本元素</th>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/H.png) HYDROGEN</td>
<td>氢</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/O.png) OXYGEN</td>
<td>氧</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/U.png) UTRIUM</td>
<td>奥纯</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/K.png) KEANIUM</td>
<td>克安</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/L.png) LEMERGIUM</td>
<td>灵摩</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/Z.png) ZYNTHIUM</td>
<td>仁笛</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/X.png) CATALYST</td>
<td>萃托</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/G.png) GHODIUM</td>
<td>寇丁</td>
</tr>
<tr class=minerals__divider>
<th colspan="5" align="center">一级化合物</th>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/ZK.png) zynthium keanite</td>
<td>仁克</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/UL.png) utrium lemergite</td>
<td>奥灵</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/OH.png) hydroxide</td>
<td>氢氧</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/UH.png) utrium hydride</td>
<td>氢化奥纯</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/UO.png) utrium oxide</td>
<td>氧化奥纯</td>
</tr>
<tr class=minerals__divider>
<th colspan="5" align="center">二级化合物</th>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/UH2O.png) utrium acid</td>
<td>奥纯酸</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/UHO2.png) utrium alkalide</td>
<td>奥纯碱</td>
</tr>
<tr class=minerals__divider>
<th colspan="5" align="center">三级化合物</th>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/XUH2O.png) catalyzed utrium acid</td>
<td>萃奥纯酸</td>
</tr>
<tr>
<td>![](//static.screeps.com/upload/mineral-icons/XUHO2.png) catalyzed utrium alkalide</td>
<td>萃奥纯碱</td>
</tr>
</tbody>
</table>
</div>
</div>


## 超能

{% note info %}
**从哪里获取:** 高速公路房间中的 [`StructurePowerBank`](/api/#StructurePowerBank) 结构. <br>
**怎么样获取:** 摧毁该结构并搜刮掉落的资源<br>
**用来干什么:** 创造超能 creep。
{% endnote %} 

查看该文章来了解更多信息: [超能](power.html).

## 商品

{% note info %}
**从哪里获取:** 高速公路房间中的 [`Deposit`](/api/#StructurePowerBank) 结构. <br>
**怎么样获取:** 派遣一个包含 `WORK` 身体部件的 creep 来 [`采集`](/api/#Creep.harvest) 它。<br>
**用来干什么:** 生产交易商品来赚取积分 (credits)。
{% endnote %} 

商品是 NPC 市场交易者最感兴趣的资源。这些资源除了被出售和赚取 credits 外没有其他任何作用。 生产高级商品是游戏中最赚钱的业务。

### 采集

您可以从“高速公路”房间中的沉积物中提取原始资源，“高速公路”是指地图上不同区域之间的房间。有4种原始资源：金属(Metal)，硅(Silicon)，生物质(Biomass)，迷雾(Mist)。 它们在世界地图上并不是均匀分布的：每个地图象限（西北，东北，西南，东南）一种资源类型。

![](img/commodities.png)

与矿物不同，这些沉积物(deposits)在采集(harvest)时会耗尽：采集的越多，重生时间就越长。当您停止采集一段时间后，沉积物将会消失并重新出现在附近的其他地方。此外，如果某区块的沉积物都被消耗到一定水平之下，则会出现新的沉积物。

### 基础商品

出售原始资源可能不是很赚钱。这就是为什么最好建造一个 [**工厂(Factory)**](/api/#StructureFactory) (在 RCL 7 时解锁)，以便 [生产(`produce`)](/api/#StructureFactory.produce) 更复杂的商品的原因。

刚刚建立的工厂是没有等级的，这意味着它只能从各种现有资源中生产几种基本商品（下表中的“每一级”商品）。它们还可以用于以“压缩”任何资源。

<div class="collapsible-table">

<div class="collapsible-table__header">
<i class="fa fa-plus-square"></i>
<span>压缩商品</span>
<em>(点击展开)</em>
![](img/commodities1.png)
</div>

<div class="collapsible-table__content"> 
<table class="commodities">
<tbody>
<tr class=commodities__head>
<th>产品</th><th>工厂等级</th><th>材料</th><th>冷却</th>
</tr> 
<tr><td>{% resource 'Utrium bar' %}&nbsp;&times;&nbsp;<em>100</em></td><td>全等级通用</td><td>![](//static.screeps.com/upload/mineral-icons/U.png)Utrium&nbsp;&times;&nbsp;<em>500</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>200</em></td><td>20&nbsp;ticks</td></tr>
<tr><td>{% resource "Lemergium bar" %}&nbsp;&times;&nbsp;<em>100</em></td><td>全等级通用</td><td>![](//static.screeps.com/upload/mineral-icons/L.png)Lemergium&nbsp;&times;&nbsp;<em>500</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>200</em></td><td>20&nbsp;ticks</td></tr>
<tr><td>{% resource 'Zynthium bar' %}&nbsp;&times;&nbsp;<em>100</em></td><td>全等级通用</td><td>![](//static.screeps.com/upload/mineral-icons/Z.png)Zynthium&nbsp;&times;&nbsp;<em>500</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>200</em></td><td>20&nbsp;ticks</td></tr>
<tr><td>{% resource 'Keanium bar' %}&nbsp;&times;&nbsp;<em>100</em></td><td>全等级通用</td><td>![](//static.screeps.com/upload/mineral-icons/K.png)Keanium&nbsp;&times;&nbsp;<em>500</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>200</em></td><td>20&nbsp;ticks</td></tr>
<tr><td>{% resource 'Ghodium melt' %}&nbsp;&times;&nbsp;<em>100</em></td><td>全等级通用</td><td>![](//static.screeps.com/upload/mineral-icons/G.png)Ghodium&nbsp;&times;&nbsp;<em>500</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>200</em></td><td>20&nbsp;ticks</td></tr>
<tr><td>{% resource 'Oxidant' %}&nbsp;&times;&nbsp;<em>100</em></td><td>全等级通用</td><td>![](//static.screeps.com/upload/mineral-icons/O.png)Oxygen&nbsp;&times;&nbsp;<em>500</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>200</em></td><td>20&nbsp;ticks</td></tr>
<tr><td>{% resource 'Reductant' %}&nbsp;&times;&nbsp;<em>100</em></td><td>全等级通用</td><td>![](//static.screeps.com/upload/mineral-icons/H.png)Hydrogen&nbsp;&times;&nbsp;<em>500</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>200</em></td><td>20&nbsp;ticks</td></tr>
<tr><td>{% resource 'Purifier' %}&nbsp;&times;&nbsp;<em>100</em></td><td>全等级通用</td><td>![](//static.screeps.com/upload/mineral-icons/X.png)Catalyst&nbsp;&times;&nbsp;<em>500</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>200</em></td><td>20&nbsp;ticks</td></tr>
<tr><td>{% resource 'Battery' %}&nbsp;&times;&nbsp;<em>50</em></td><td>全等级通用</td><td>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>600</em></td><td>10&nbsp;ticks</td></tr>
</tbody>
</table>

</div>
</div>
 
您也可以在需要时解压它们来恢复原始资源。
 
 <div class="collapsible-table">
 
 <div class="collapsible-table__header">
 <i class="fa fa-plus-square"></i>
 <span>解压商品</span>
 <em>(点击展开)</em>
 ![](img/commodities2.png)
 </div>
 
 <div class="collapsible-table__content">
 <table class="commodities">
 <tr class="commodities__head"><th>产品</th><th>工厂等级</th><th>材料</th><th>冷却</th></tr> 
 <tr><td>![](//static.screeps.com/upload/mineral-icons/U.png)Utrium&nbsp;&times;&nbsp;<em>500</em></td><td>全等级通用</td><td>{% resource 'Utrium bar' %}&nbsp;&times;&nbsp;<em>100</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>200</em></td><td>20&nbsp;ticks</td></tr>
 <tr><td>![](//static.screeps.com/upload/mineral-icons/L.png)Lemergium&nbsp;&times;&nbsp;<em>500</em></td><td>全等级通用</td><td>{% resource 'Lemergium bar' %}&nbsp;&times;&nbsp;<em>100</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>200</em></td><td>20&nbsp;ticks</td></tr>
 <tr><td>![](//static.screeps.com/upload/mineral-icons/Z.png)Zynthium&nbsp;&times;&nbsp;<em>500</em></td><td>全等级通用</td><td>{% resource 'Zynthium bar' %}&nbsp;&times;&nbsp;<em>100</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>200</em></td><td>20&nbsp;ticks</td></tr>
 <tr><td>![](//static.screeps.com/upload/mineral-icons/K.png)Keanium&nbsp;&times;&nbsp;<em>500</em></td><td>全等级通用</td><td>{% resource 'Keanium bar' %}&nbsp;&times;&nbsp;<em>100</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>200</em></td><td>20&nbsp;ticks</td></tr>
 <tr><td>![](//static.screeps.com/upload/mineral-icons/G.png)Ghodium&nbsp;&times;&nbsp;<em>500</em></td><td>全等级通用</td><td>{% resource 'Ghodium melt' %}&nbsp;&times;&nbsp;<em>100</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>200</em></td><td>20&nbsp;ticks</td></tr>
 <tr><td>![](//static.screeps.com/upload/mineral-icons/O.png)Oxygen&nbsp;&times;&nbsp;<em>500</em></td><td>全等级通用</td><td>{% resource 'Oxidant' %}&nbsp;&times;&nbsp;<em>100</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>200</em></td><td>20&nbsp;ticks</td></tr>
 <tr><td>![](//static.screeps.com/upload/mineral-icons/H.png)Hydrogen&nbsp;&times;&nbsp;<em>500</em></td><td>全等级通用</td><td>{% resource 'Reductant' %}&nbsp;&times;&nbsp;<em>100</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>200</em></td><td>20&nbsp;ticks</td></tr>
 <tr><td>![](//static.screeps.com/upload/mineral-icons/X.png)Catalyst&nbsp;&times;&nbsp;<em>500</em></td><td>全等级通用</td><td>{% resource 'Purifier' %}&nbsp;&times;&nbsp;<em>100</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>200</em></td><td>20&nbsp;ticks</td></tr>
 <tr><td>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>500</em></td><td>全等级通用</td><td>{% resource 'Battery' %}&nbsp;&times;&nbsp;<em>50</em></td><td>10&nbsp;ticks</td></tr>
 </table> 

 </div>
 </div>

当您获得区域性沉积资源后，您就可以开始使用他们来生产其他基本商品。
 
<div class="collapsible-table">

<div class="collapsible-table__header">
<i class="fa fa-plus-square"></i>
<span>基本区域性商品</span>
<em>(点击展开)</em>
![](img/commodities3.png)
</div>

<div class="collapsible-table__content">
<table class="commodities">
<tr class="commodities__head"><th>产品</th><th>工厂等级</th><th>材料</th><th>冷却</th></tr> 
<tr><td>{% resource 'Wire' %}&nbsp;&times;&nbsp;<em>20</em></td><td>全等级通用</td><td>{% resource 'Utrium bar' %}&nbsp;&times;&nbsp;<em>20</em><br>{% resource 'Silicon' %}&nbsp;&times;&nbsp;<em>100</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>40</em></td><td>8&nbsp;ticks</td></tr>
<tr><td>{% resource 'Cell' %}&nbsp;&times;&nbsp;<em>20</em></td><td>全等级通用</td><td>{% resource 'Lemergium bar' %}&nbsp;&times;&nbsp;<em>20</em><br>{% resource 'Biomass' %}&nbsp;&times;&nbsp;<em>100</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>40</em></td><td>8&nbsp;ticks</td>
<tr><td>{% resource 'Alloy' %}&nbsp;&times;&nbsp;<em>20</em></td><td>全等级通用</td><td>{% resource 'Zynthium bar' %}&nbsp;&times;&nbsp;<em>20</em><br>{% resource 'Metal' %}&nbsp;&times;&nbsp;<em>100</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>40</em></td><td>8&nbsp;ticks</td></tr>
<tr><td>{% resource 'Condensate' %}&nbsp;&times;&nbsp;<em>20</em></td><td>全等级通用</td><td>{% resource 'Keanium bar' %}&nbsp;&times;&nbsp;<em>20</em><br>{% resource 'Mist' %}&nbsp;&times;&nbsp;<em>100</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>40</em></td><td>8&nbsp;ticks</td></tr>
</table>
</div>
</div>

上述的所有商品都可以从任何等级的工厂中生产。

### 高级商品
  
只有 [操作员(Operators)](power.html#Power-Creeps) 和它的 `OPERATE_FACTORY` 能力才能使工厂全功率运作。
当一个操作员对一个没有等级的工厂使用了他的能力后，工厂的等级就会被锁定到和能力相同的等级，并且超能效果会停留在工厂上。
该能力会使得工厂可以生产对应等级的商品。
即工厂只能生产该等级的商品或者”全等级通用“商品。
一旦进行了设置，该工厂的等级将无法被修改。
当效果持续时间结束后，工厂将不再工作，但是其等级依旧会保留（依旧可以生产”全等级通用“商品）。
此时您就需要使用操作员使用相同等级的能力来重新激活它。
注意，工厂的等级无法被其他等级的超能修改，只有重新建造才能改变工厂的等级。
  
每一个高等级的商品都需要其对应产业链上的低等级产品才能进行生产。游戏里一共有四条产业链，每种类型的新资源对应其中的一条：
**机械(Mechanical)** (消耗金属), **电子(Electronical)** (消耗硅), **生物(Biological)** (消耗生物质), **奥秘(Mystical)** (消耗迷雾), 以及常规商品。 
这些货物是市场上最值钱。

<div class="collapsible-table">
<div class="collapsible-table__header">
<i class="fa fa-plus-square"></i>
<span>常规高等商品</span>
<em>(点击展开)</em>
![](img/commodities4.png)
</div>

<div class="collapsible-table__content">
<table class="commodities">
<tr class="commodities__head"><th>产品</th><th>工厂等级</th><th>材料</th><th>冷却</th></tr> 
<tr><td>{% resource 'Composite' %}&nbsp;&times;&nbsp;<em>20</em></td><td>Lvl 1</td><td>{% resource 'Utrium bar' %}&nbsp;&times;&nbsp;<em>20</em><br>{% resource 'Zynthium bar' %}&nbsp;&times;&nbsp;<em>20</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>20</em></td><td>50&nbsp;ticks</td></tr>
<tr><td>{% resource 'Crystal' %}&nbsp;&times;&nbsp;<em>6</em></td><td>Lvl 2</td><td>{% resource 'Lemergium bar' %}&nbsp;&times;&nbsp;<em>6</em><br>{% resource 'Keanium bar' %}&nbsp;&times;&nbsp;<em>6</em><br>{% resource 'Purifier' %}&nbsp;&times;&nbsp;<em>6</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>45</em></td><td>21&nbsp;ticks</td></tr>
<tr><td>{% resource 'Liquid' %}&nbsp;&times;&nbsp;<em>12</em></td><td>Lvl 3</td><td>{% resource 'Oxidant' %}&nbsp;&times;&nbsp;<em>12</em><br>{% resource 'Reductant' %}&nbsp;&times;&nbsp;<em>12</em><br>{% resource 'Ghodium melt' %}&nbsp;&times;&nbsp;<em>12</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>90</em></td><td>60&nbsp;ticks</td></tr>
</table>
</div>
</div>

<div class="collapsible-table">
<div class="collapsible-table__header">
<i class="fa fa-plus-square"></i>
<span>机械 (Mechanical) 产业链</span>
<em>(点击展开)</em>
![](img/commodities5.png)
</div>

<div class="collapsible-table__content">
<table class="commodities">
<tr class="commodities__head"><th>产品</th><th>工厂等级</th><th>材料</th><th>冷却</th></tr>
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
<span>生物 (Biological) 产业链</span>
<em>(点击展开)</em>
![](img/commodities6.png)
</div>

<div class="collapsible-table__content">
<table class="commodities">
<tr class="commodities__head"><th>产品</th><th>工厂等级</th><th>材料</th><th>冷却</th></tr>
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
<span>电子 (Electronical) 产业链</span>
<em>(点击展开)</em>
![](img/commodities7.png)
</div>

<div class="collapsible-table__content">
<table class="commodities">
<tr class="commodities__head"><th>产品</th><th>工厂等级</th><th>材料</th><th>冷却</th></tr>
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
<span>奥秘 (Mystical) 产业链</span>
<em>(点击展开)</em>
![](img/commodities8.png)
</div>

<div class="collapsible-table__content">
<table class="commodities">
<tr class="commodities__head"><th>产品</th><th>工厂等级</th><th>材料</th><th>冷却</th></tr>
<tr><td>{% resource 'Concentrate' %}&nbsp;&times;&nbsp;<em>3</em></td><td>Lvl 1</td><td>{% resource 'Condensate' %}&nbsp;&times;&nbsp;<em>30</em><br>{% resource 'Keanium bar' %}&nbsp;&times;&nbsp;<em>15</em><br>{% resource 'Reductant' %}&nbsp;&times;&nbsp;<em>54</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>12</em></td><td>41&nbsp;ticks</td></tr>
<tr><td>{% resource 'Extract' %}&nbsp;&times;&nbsp;<em>2</em></td><td>Lvl 2</td><td>{% resource 'Concentrate' %}&nbsp;&times;&nbsp;<em>10</em><br>{% resource 'Condensate' %}&nbsp;&times;&nbsp;<em>30</em><br>{% resource 'Oxidant' %}&nbsp;&times;&nbsp;<em>60</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>16</em></td><td>128&nbsp;ticks</td></tr>
<tr><td>{% resource 'Spirit' %}</td><td>Lvl 3</td><td>{% resource 'Extract' %}&nbsp;&times;&nbsp;<em>2</em><br>{% resource 'Concentrate' %}&nbsp;&times;&nbsp;<em>6</em><br>{% resource 'Reductant' %}&nbsp;&times;&nbsp;<em>90</em><br>{% resource 'Purifier' %}&nbsp;&times;&nbsp;<em>20</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>16</em></td><td>200&nbsp;ticks</td></tr>
<tr><td>{% resource 'Emanation' %}</td><td>Lvl 4</td><td>{% resource 'Spirit' %}&nbsp;&times;&nbsp;<em>2</em><br>{% resource 'Extract' %}&nbsp;&times;&nbsp;<em>2</em><br>{% resource 'Concentrate' %}&nbsp;&times;&nbsp;<em>3</em><br>{% resource 'Keanium bar' %}&nbsp;&times;&nbsp;<em>112</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>32</em></td><td>800&nbsp;ticks</td></tr>
<tr><td>{% resource 'Essence' %}</td><td>Lvl 5</td><td>{% resource 'Emanation' %}&nbsp;&times;&nbsp;<em>1</em><br>{% resource 'Spirit' %}&nbsp;&times;&nbsp;<em>3</em><br>{% resource 'Crystal' %}&nbsp;&times;&nbsp;<em>110</em><br>{% resource 'Ghodium melt' %}&nbsp;&times;&nbsp;<em>150</em><br>{% resource 'Energy' %}&nbsp;&times;&nbsp;<em>64</em></td><td>600&nbsp;ticks</td></tr>
</table>
</div>
</div>