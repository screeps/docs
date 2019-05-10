# StructureExtension

<img src="img/spawn.png" alt="" align="right" />

Contains energy which can be spent on spawning bigger creeps. Extensions can be placed anywhere in the room, any spawns will be able to use them regardless of distance.

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td colspan="2"><strong>Controller level</strong></td>
    </tr>
    <tr>
        <td>1</td>
        <td>—</td>
    </tr>
    <tr>
        <td>2</td>
        <td>5 extensions (50 capacity)</td>
    </tr>
    <tr>
        <td>3</td>
        <td>10 extensions (50 capacity)</td>
    </tr>
    <tr>
        <td>4</td>
        <td>20 extensions (50 capacity)</td>
    </tr>
    <tr>
        <td>5</td>
        <td>30 extensions (50 capacity)</td>
    </tr>
    <tr>
        <td>6</td>
        <td>40 extensions (50 capacity)</td>
    </tr>
    <tr>
        <td>7</td>
        <td>50 extensions (100 capacity)</td>
    </tr>
    <tr>
        <td>8</td>
        <td>60 extensions (200 capacity)</td>
    </tr>
    <tr>
        <td><strong>Cost</strong></td>
        <td>3,000</td>
    </tr>
    <tr>
        <td><strong>Hits</strong></td>
        <td>1,000</td>
    </tr>
    </tbody>
</table>

{% page inherited/OwnedStructure.md %}

{% api_property energy 'number' %}



The amount of energy containing in the extension.



{% api_property energyCapacity 'number' %}



The total amount of energy the extension can contain.



{% api_method transferEnergy 'target, [amount]' A '{"deprecated": "Please use [`Creep.withdraw`](#Creep.withdraw) instead."}' %}



Transfer the energy from the extension to a creep. You can transfer resources to your creeps from hostile structures as well.

{% api_method_params %}
target : <a href="#Creep">Creep</a>
接受能量传递的creep对象。
===
amount (optional) : number
被传递能量的数量。如果没有这个参数，传递全部能量。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是目标creep的拥有者，或者这个建筑上有建有敌对堡垒。
ERR_NOT_ENOUGH_RESOURCES | The extension contains less energy than the given amount.
ERR_INVALID_TARGET | 指定的目标不是一个creep对象。
ERR_FULL | 目标creep无法携带指定数量的能量。
ERR_NOT_IN_RANGE | 目标creep太远了。
{% endapi_return_codes %}


