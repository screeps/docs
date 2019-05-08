# StructurePowerSpawn

<img src="img/powerSpawn.png" alt="" align="right" />

Processes power into your account, and spawns power creeps with special unique powers (in development).
Learn more about power from [this article](/power.html).

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td colspan="2"><strong>Controller level</strong></td>
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
        <td><strong>Cost</strong></td>
        <td>100,000</td>
    </tr>
    <tr>
        <td><strong>Hits</strong></td>
        <td>5,000</td>
    </tr>
    <tr>
        <td><strong>Capacity</strong></td>
        <td>5,000 energy units, 100 power units</td>
    </tr>
    <tr>
        <td><strong>Processing cost</strong></td>
        <td>50 energy units per 1 power unit</td>
    </tr>
    <tr>
        <td><strong>Processing speed</strong></td>
        <td>1 power unit per tick</td>
    </tr>
    </tbody>
</table>

{% page inherited/OwnedStructure.md %}


{% api_property energy 'number' %}



The amount of energy containing in this structure.



{% api_property energyCapacity 'number' %}



The total amount of energy this structure can contain.



{% api_property power 'number' %}



The amount of power containing in this structure.



{% api_property powerCapacity 'number' %}



The total amount of power this structure can contain.


{% api_method processPower '' A %}



Register power resource units into your account. Registered power allows to develop power creeps skills. 



### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个建筑的拥有者。
ERR_NOT_ENOUGH_RESOURCES | The structure does not have enough energy or power resource units.
ERR_RCL_NOT_ENOUGH | 房间控制中心等级不足。
{% endapi_return_codes %}


{% api_method transferEnergy 'target, [amount]' A '{"deprecated": "Please use [`Creep.withdraw`](#Creep.withdraw) instead."}' %}



Transfer the energy from this structure to a creep. You can transfer resources to your creeps from hostile structures as well.

{% api_method_params %}
target : <a href="#Creep">Creep</a>
接受能量传递的creep对象。
===
amount (optional) : number
The amount of energy to be transferred. If omitted, all the remaining amount of energy will be used.
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | You are not the owner of the target creep, or there is a hostile rampart on top of the structure.
ERR_NOT_ENOUGH_RESOURCES | This structure less energy than the given amount.
ERR_INVALID_TARGET | The specified target object is not a creep.
ERR_FULL | The target creep can not carry the given amount of energy.
ERR_NOT_IN_RANGE | The target creep is too far away.
{% endapi_return_codes %}
