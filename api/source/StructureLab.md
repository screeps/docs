# StructureLab

<img src="img/lab.png" alt="" align="right" />

使用基础矿物生产化合物，强化(boost) creep 和清除强化。
点击[本文](/resources.html)来了解更多关于矿物的信息。

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td colspan="2"><strong>控制器等级</strong></td>
    </tr>
    <tr>
        <td>1-5</td>
        <td>—</td>
    </tr>
    <tr>
        <td>6</td>
        <td>3 labs</td>
    </tr>
    <tr>
        <td>7</td>
        <td>6 labs</td>
    </tr>
    <tr>
        <td>8</td>
        <td>10 labs</td>
    </tr>
    <tr>
        <td><strong>建造花费</strong></td>
        <td>50,000</td>
    </tr>
    <tr>
        <td><strong>生命值</strong></td>
        <td>500</td>
    </tr>
    <tr>
        <td><strong>容量</strong></td>
        <td>3000 单位矿物，2000 单位能量</td>
    </tr>
    <tr>
        <td><strong>产品</strong></td>
        <td>每次反应生成 5 单位化合物</td>
    </tr>
    <tr>
        <td><strong>反应冷却</strong></td>
        <td>取决于反应类型 (详见[本文](/resources.html))</td>
    </tr>
    <tr>
        <td><strong>到输入 lab 的距离</strong></td>
        <td>2 格之内</td>
    </tr>
    <tr>
        <td><strong>强化消耗</strong></td>
        <td>每个身体部件消耗 30 单位矿物，20 单位能量</td>
    </tr>
    </tbody>
</table>

{% page inherited/OwnedStructure.md %}

{% api_property cooldown 'number' %}



下次反应或者清除强化之前还需等待多少 tick 的冷却。



{% api_property energy 'number' '{"deprecated": true}' %}
                                                                
[`.store[RESOURCE_ENERGY]`](#StructureExtension.store) 的别名。



{% api_property energyCapacity 'number' '{"deprecated": true}' %}
                                                                                                                
[`.store.getCapacity(RESOURCE_ENERGY)`](#Store.getCapacity) 的别名。



{% api_property mineralAmount 'number' '{"deprecated": true}' %}
                                                                       
[`lab.store[lab.mineralType]`](#StructureExtension.store) 的别名。



{% api_property mineralType 'string' %}



该 lab 储存的矿物类型。lab 同一时间内只能储存一种类型的矿物。



{% api_property mineralCapacity 'number' '{"deprecated": true}' %}
                                                                                                                 
[`lab.store.getCapacity(lab.mineralType || yourMineral)`](#Store.getCapacity) 的别名。


{% api_property store 'object' %}

```javascript
if(structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
    creep.transfer(structure, RESOURCE_ENERGY);
}
```


一个包含了该建筑中所存储资源的 [`Store`](#Store) 对象。


{% api_method boostCreep 'creep, [bodyPartsCount]' A %}



使用存储中的矿物强化 creep 的身体部件。creep 必须在相邻与 lab 的正方形区域内。

{% api_method_params %}
creep : <a href="#Creep">Creep</a>
目标 creep。
===
bodyPartsCount (可选) : number
要强化的指定身体部件的数量。<code>TOUGH</code> 身体部件始终是从左到右进行强化，而其他部件则是从右到左。如果未指定，则对所有合适的身体部件进行强化。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 您不是该 lab 的所有者。
ERR_NOT_FOUND | lab 中存放的矿物类型无法强化该 creep 的任何身体部件。
ERR_NOT_ENOUGH_RESOURCES | lab 中没有足够的能量或者矿物。
ERR_INVALID_TARGET | 目标不是有效的 creep 对象。
ERR_NOT_IN_RANGE | 目标距离过远。
ERR_RCL_NOT_ENOUGH | 房间控制中心等级不足。
{% endapi_return_codes %}



{% api_method runReaction 'lab1, lab2' A %}



使用另外两个 lab 中的矿物作为底物来生产化合物。同一个输入 lab 可以给多个输出 lab 提供底物。

{% api_method_params %}
lab1 : <a href="#StructureLab">StructureLab</a> (lab)
第一个输入 lab。
===
lab2 : <a href="#StructureLab">StructureLab</a> (lab)
第二个输入 lab。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 您不是该 lab 的所有者。
ERR_NOT_ENOUGH_RESOURCES | 输入 lab 没有足够的能量或者矿物。
ERR_INVALID_TARGET | 目标不是有效的 lab 对象。
ERR_FULL | 目标无法接受更多能量。
ERR_NOT_IN_RANGE | 目标距离过远。
ERR_INVALID_ARGS | 无法使用输入 lab 中的资源进行反应。
ERR_TIRED | 该 lab 仍在冷却中。
ERR_RCL_NOT_ENOUGH | 房间控制中心等级不足。
{% endapi_return_codes %}


{% api_method unboostCreep 'creep' A %}


立刻从 creep 身上移除强化并将强化所需的 50% 化合物丢弃在地面上，该操作不会关心 creep 的剩余存活时间。creep 必须在紧邻 lab 的正方形区域内。清除强化所需的冷却时间等于生产强化该 creep 所需化合物的总时间。

{% api_method_params %}
creep : <a href="#Creep">Creep</a>
目标 creep。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 您不是该 lab 或者目标 creep 的所有者。
ERR_INVALID_TARGET | 目标不是有效的 creep 对象。
ERR_TIRED | 该 lab 仍在冷却当中。
ERR_NOT_IN_RANGE | 目标太远了。
ERR_NOT_FOUND | 目标没有强化过的身体部件。
ERR_RCL_NOT_ENOUGH | 房间控制中心等级不足。
{% endapi_return_codes %}
