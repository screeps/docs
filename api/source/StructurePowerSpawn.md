# StructurePowerSpawn

<img src="img/powerSpawn.png" alt="" align="right" />

提炼超能 (power) 并注册到您的账户当中，可以孵化拥有独一无二能力的超能 creep (仍在开发中)。
点击[本文](/power.html)查看跟多有关超能的信息。

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td colspan="2"><strong>控制器等级</strong></td>
    </tr>
    <tr>
        <td>1-7</td>
        <td>—</td>
    </tr>
    <tr>
        <td>8</td>
        <td>1 power spawn</td>
    </tr>
    <tr>
        <td><strong>建造花费</strong></td>
        <td>100,000</td>
    </tr>
    <tr>
        <td><strong>生命值</strong></td>
        <td>5,000</td>
    </tr>
    <tr>
        <td><strong>容量</strong></td>
        <td>5,000 energy units, 100 power units</td>
    </tr>
    <tr>
        <td><strong>提炼花费</strong></td>
        <td>1 power 消耗 50 energy</td>
    </tr>
    <tr>
        <td><strong>提炼速度</strong></td>
        <td>每 tick 1 power</td>
    </tr>
    </tbody>
</table>

{% page inherited/OwnedStructure.md %}


{% api_property energy 'number' '{"deprecated": true}' %}
                                                                
[`.store[RESOURCE_ENERGY]`](#StructureExtension.store) 的别名。



{% api_property energyCapacity 'number' '{"deprecated": true}' %}
                                                                                                                
[`.store.getCapacity(RESOURCE_ENERGY)`](#Store.getCapacity) 的别名。



{% api_property power 'number' '{"deprecated": true}' %}
                                                               
[`.store[RESOURCE_POWER]`](#StructureExtension.store) 的别名。



{% api_property powerCapacity 'number' '{"deprecated": true}' %}
                                                                                                               
[`.store.getCapacity(RESOURCE_POWER)`](#Store.getCapacity) 的别名。

{% api_property store 'object' %}

```javascript
if(structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
    creep.transfer(structure, RESOURCE_ENERGY);
}
```


一个包含了该建筑中所存储的货物的 [`Store`](#Store) 对象。


{% api_method processPower '' A %}



将超能 (power) 资源注册到您的账户当中。注册超能允许开发超能 creep 的技能。



### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个建筑的拥有者。
ERR_NOT_ENOUGH_RESOURCES | 这个建筑没有足够的能量或者超能资源。
ERR_RCL_NOT_ENOUGH | 房间控制中心等级不足。
{% endapi_return_codes %}

