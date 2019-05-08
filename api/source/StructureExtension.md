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
The creep object which energy should be transferred to.
===
amount (optional) : number
The amount of energy to be transferred. If omitted, all the remaining amount of energy will be used.
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | You are not the owner of the target creep, or there is a hostile rampart on top of the structure.
ERR_NOT_ENOUGH_RESOURCES | The extension contains less energy than the given amount.
ERR_INVALID_TARGET | The specified target object is not a creep.
ERR_FULL | The target creep can not carry the given amount of energy.
ERR_NOT_IN_RANGE | The target creep is too far away.
{% endapi_return_codes %}


