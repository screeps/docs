# StructureLink

<img src="img/link.png" alt="" align="right" /> 

将能量远程传输到同一房间的另一个 Link 中。

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td colspan="2"><strong>控制器等级</strong></td>
    </tr>
    <tr>
        <td>1-4</td>
        <td>—</td>
    </tr>
    <tr>
        <td>5</td>
        <td>2 links</td>
    </tr>
    <tr>
        <td>6</td>
        <td>3 links</td>
    </tr>
    <tr>
        <td>7</td>
        <td>4 links</td>
    </tr>
    <tr>
        <td>8</td>
        <td>6 links</td>
    </tr>
    <tr>
        <td><strong>建造花费</strong></td>
        <td>5,000</td>
    </tr>
    <tr>
        <td><strong>生命值</strong></td>
        <td>1,000</td>
    </tr>
    <tr>
        <td><strong>容量</strong></td>
        <td>800</td>
    </tr>
    <tr>
        <td><strong>冷却时间</strong></td>
        <td>该 Link 到目标的线性距离每格增加 1 tick 冷却。</td>
    </tr>
    <tr>
        <td><strong>能量传输损耗</strong></td>
        <td>3%</td>
    </tr>
    </tbody>
</table>

{% page inherited/OwnedStructure.md %}


{% api_property cooldown 'number' %}



下次传输之前还需多少 tick 的冷却。



{% api_property energy 'number' '{"deprecated": true}' %}
                                                                
[`.store[RESOURCE_ENERGY]`](#StructureExtension.store) 的别名。



{% api_property energyCapacity 'number' '{"deprecated": true}' %}
                                                                                                                
[`.store.getCapacity(RESOURCE_ENERGY)`](#Store.getCapacity) 的别名。

{% api_property store '<a href="#Store">Store</a>' %}

```javascript
if(structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
    creep.transfer(structure, RESOURCE_ENERGY);
}
```


一个包含了该建筑中所存储资源的 [`Store`](#Store) 对象。



{% api_method transferEnergy 'target, [amount]' A %}

```javascript
const linkFrom = Game.rooms['W1N1'].lookForAt('structure', 10, 25)[0];

const linkTo = linkFrom.pos.findInRange(FIND_MY_STRUCTURES, 2,
    {filter: {structureType: STRUCTURE_LINK}})[0];

linkFrom.transferEnergy(linkTo);
```

将能量远程传输到同一房间中任何位置的另一个 Link 中。

{% api_method_params %}
target : <a href="#StructureLink">StructureLink</a>
目标对象。
===
amount (optional) : number
将要传输的能量值。如果省略，所有能量都将被传输。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是该 link 的所有者。
ERR_NOT_ENOUGH_RESOURCES | 这个建筑内的资源少于给定的数量。
ERR_INVALID_TARGET | 目标不是一个有效的 StructureLink 对象。
ERR_FULL | 目标无法接受更多能量。
ERR_INVALID_ARGS | 资源数量不正确。
ERR_TIRED | 该 link 仍在冷却中。
ERR_RCL_NOT_ENOUGH | 房间控制器等级不足以使用该 link。
ERR_NOT_IN_RANGE | 目标太远了。
{% endapi_return_codes %}


