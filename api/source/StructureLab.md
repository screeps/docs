# StructureLab

<img src="img/lab.png" alt="" align="right" />

Produces mineral compounds from base minerals, boosts and unboosts creeps. 
Learn more about minerals from [this article](/minerals.html).

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td colspan="2"><strong>Controller level</strong></td>
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
        <td><strong>Cost</strong></td>
        <td>50,000</td>
    </tr>
    <tr>
        <td><strong>Hits</strong></td>
        <td>500</td>
    </tr>
    <tr>
        <td><strong>Capacity</strong></td>
        <td>3000 mineral units, 2000 energy units</td>
    </tr>
    <tr>
        <td><strong>Produce</strong></td>
        <td>5 mineral compound units per reaction</td>
    </tr>
    <tr>
        <td><strong>Reaction cooldown</strong></td>
        <td>Depends on the reaction (see the REACTION_TIME [constant](/api/#Constants))</td>
    </tr>
    <tr>
        <td><strong>Distance to input labs</strong></td>
        <td>2 squares</td>
    </tr>
    <tr>
        <td><strong>Boost cost</strong></td>
        <td>30 mineral units, 20 energy units per body part</td>
    </tr>
    </tbody>
</table>

{% page inherited/OwnedStructure.md %}

{% api_property cooldown 'number' %}



The amount of game ticks the lab has to wait until the next reaction is possible.



{% api_property energy 'number' %}



The amount of energy containing in the lab. Energy is used for boosting creeps.



{% api_property energyCapacity 'number' %}



The total amount of energy the lab can contain.



{% api_property mineralAmount 'number' %}



The amount of mineral resources containing in the lab.



{% api_property mineralType 'string' %}



The type of minerals containing in the lab. Labs can contain only one mineral type at the same time.



{% api_property mineralCapacity 'number' %}



The total amount of minerals the lab can contain.



{% api_method boostCreep 'creep, [bodyPartsCount]' A %}



Boosts creep body parts using the containing mineral compound. The creep has to be at adjacent square to the lab. 

{% api_method_params %}
creep : <a href="#Creep">Creep</a>
The target creep.
===
bodyPartsCount (optional) : number
The number of body parts of the corresponding type to be boosted. Body parts are always counted left-to-right for <code>TOUGH</code>, and right-to-left for other types. If undefined, all the eligible body parts are boosted.
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | You are not the owner of this lab.
ERR_NOT_FOUND | The mineral containing in the lab cannot boost any of the creep's body parts.
ERR_NOT_ENOUGH_RESOURCES | The lab does not have enough energy or minerals.
ERR_INVALID_TARGET | The targets is not valid creep object.
ERR_NOT_IN_RANGE | The targets are too far away.
ERR_RCL_NOT_ENOUGH | 房间控制中心等级不足。
{% endapi_return_codes %}



{% api_method runReaction 'lab1, lab2' A %}



Produce mineral compounds using reagents from two other labs. The same input labs can be used by many output labs.

{% api_method_params %}
lab1 : <a href="#StructureLab">StructureLab</a> (lab)
The first source lab.
===
lab2 : <a href="#StructureLab">StructureLab</a> (lab)
The second source lab.
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | You are not the owner of this lab.
ERR_NOT_ENOUGH_RESOURCES | The source lab do not have enough resources.
ERR_INVALID_TARGET | The targets are not valid lab objects.
ERR_FULL | 目标无法接受更多能量。
ERR_NOT_IN_RANGE | The targets are too far away.
ERR_INVALID_ARGS | The reaction cannot be run using this resources.
ERR_TIRED | The lab is still cooling down.
ERR_RCL_NOT_ENOUGH | 房间控制中心等级不足。
{% endapi_return_codes %}



{% api_method transfer 'target, resourceType, [amount]' A '{"deprecated": "Please use [`Creep.withdraw`](#Creep.withdraw) instead."}' %}


Transfer resource from this structure to a creep. 目标必须在相邻的方格里。 You can transfer resources to your creeps from hostile structures as well.

{% api_method_params %}
target : <a href="#Creep">Creep</a>
The target object.
===
resourceType : string
<code>RESOURCE_*</code>常量之一。
===
amount (optional) : number
被传递资源的数量。如果没有这个参数，传递全部可用数量的资源。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是目标creep的拥有者，或者这个建筑上有建有敌对堡垒。
ERR_NOT_ENOUGH_RESOURCES | The creep does not have the given amount of resources.
ERR_INVALID_TARGET | The target is not a valid Creep object.
ERR_FULL | 目标无法接受更多能量。
ERR_NOT_IN_RANGE | 目标太远了。
ERR_INVALID_ARGS | The amount or resource type is incorrect.
{% endapi_return_codes %}



{% api_method unboostCreep 'creep' A %}


Immediately remove boosts from the creep and drop 50% of the mineral compounds used to boost it onto the ground regardless of the creep's remaining time to live. The creep has to be at adjacent square to the lab. Unboosting requires cooldown time equal to the total sum of the reactions needed to produce all the compounds applied to the creep.

{% api_method_params %}
creep : <a href="#Creep">Creep</a>
The target creep.
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | You are not the owner of this lab, or the target creep.
ERR_INVALID_TARGET | The target is not a valid Creep object.
ERR_TIRED | The lab is still cooling down.
ERR_NOT_IN_RANGE | 目标太远了。
ERR_NOT_FOUND | The target has no boosted parts.
ERR_RCL_NOT_ENOUGH | 房间控制中心等级不足。
{% endapi_return_codes %}
