# StructureTower
	
<img src="img/tower.png" alt="" align="right" />

远程攻击creep，治疗creep，或维修建筑。房间里的任意对象都可以指定为它的目标。然而，效果线性地取决距离。每一个动作都会消耗能量。

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td colspan="2"><strong>Controller level</strong></td>
    </tr>
    <tr>
        <td>1-2</td>
        <td>—</td>
    </tr>
    <tr>
        <td>3-4</td>
        <td>1个塔</td>
    </tr>
    <tr>
        <td>5-6</td>
        <td>2个塔</td>
    </tr>
    <tr>
        <td>7</td>
        <td>3个塔</td>
    </tr>
    <tr>
        <td>8</td>
        <td>6个塔</td>
    </tr>
    <tr>
        <td><strong>建筑成本</strong></td>
        <td>5,000</td>
    </tr>
    <tr>
        <td><strong>生命值</strong></td>
        <td>3,000</td>
    </tr>
    <tr>
        <td><strong>容量</strong></td>
        <td>1,000</td>
    </tr>
    <tr>
        <td><strong>每个动作能量消耗</strong></td>
        <td>10</td>
    </tr>
    <tr>
        <td><strong>攻击效果</strong></td>
        <td>从距离≤5的600点到距离≥20的150点</td>
    </tr>
    <tr>
        <td><strong>Heal effectiveness</strong></td>
        <td>从距离≤5的400点到距离≥20的100点</td>
    </tr>
    <tr>
        <td><strong>Repair effectiveness</strong></td>
        <td>从距离≤5的800点到距离≥20的200点</td>
    </tr>
    </tbody>
</table>

{% page inherited/OwnedStructure.md %}


{% api_property energy 'number' '{"deprecated": true}' %}
                                                                
An alias for [`.store[RESOURCE_ENERGY]`](#StructureExtension.store).



{% api_property energyCapacity 'number' '{"deprecated": true}' %}
                                                                                                                
An alias for [`.store.getCapacity(RESOURCE_ENERGY)`](#Store.getCapacity).


{% api_property store '<a href="#Store">Store</a>' %}

```javascript
if(structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
    creep.transfer(structure, RESOURCE_ENERGY);
}
```


一个代表这该结构所存储能量的 [`Store`](#Store) 对象。


{% api_method attack 'target' A %}



远程攻击房间里的任意 creep、超能 creep 或房间内的结构。

{% api_method_params %}
target : <a href="#Creep">Creep</a>, <a href="#PowerCreep">PowerCreep</a>, <a href="#Structure">Structure</a>
目标creep。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个建筑的拥有者。
ERR_NOT_ENOUGH_ENERGY | 这个塔没有足够的能量。
ERR_INVALID_TARGET | 这个目标不是一个有效的攻击目标。
ERR_RCL_NOT_ENOUGH | 房间控制等级不足。
{% endapi_return_codes %}



{% api_method heal 'target' A %}



远程治疗房间里的任意 creep 或 超能 creep。

{% api_method_params %}
target : <a href="#Creep">Creep</a>, <a href="#PowerCreep">PowerCreep</a>
The target creep.
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个建筑的拥有者。
ERR_NOT_ENOUGH_ENERGY | 这个塔没有足够的能量。
ERR_INVALID_TARGET | 这个目标不是一个有效的creep对象。
ERR_RCL_NOT_ENOUGH | 房间控制等级不足。
{% endapi_return_codes %}



{% api_method repair 'target' A %}



远程维修房间里的任意建筑。

{% api_method_params %}
target : <a href="#Structure">Structure</a>
目标建筑。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个建筑的拥有者。
ERR_NOT_ENOUGH_ENERGY | 这个塔没有足够的能量。
ERR_INVALID_TARGET | 这个目标不是一个有效的可维修对象。
ERR_RCL_NOT_ENOUGH | 房间控制中心等级不足。
{% endapi_return_codes %}

