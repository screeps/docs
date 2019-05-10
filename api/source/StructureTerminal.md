# StructureTerminal

<img src="img/terminal.png" alt="" align="right" />

Sends any resources to a Terminal in another room. The destination Terminal can belong to any player. 
Each transaction requires additional energy (regardless of the transfer resource type) that can be 
calculated using [`Game.market.calcTransactionCost`](#Game.market.calcTransactionCost) method. 
For example, sending 1000 mineral units from W0N0 to W10N5 will consume 742 energy units. 
You can track your incoming and outgoing transactions using the [`Game.market`](#Game.market) object. 
Only one Terminal per room is allowed that can be addressed by [`Room.terminal`](#Room.terminal) property.

Terminals are used in the [Market system](/market.html).

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
        <td>6-8</td>
        <td>1 terminal</td>
    </tr>
    <tr>
        <td><strong>Cost</strong></td>
        <td>100,000</td>
    </tr>
    <tr>
        <td><strong>Hits</strong></td>
        <td>3,000</td>
    </tr>
    <tr>
        <td><strong>Capacity</strong></td>
        <td>300,000</td>
    </tr>
    <tr>
        <td><strong>Cooldown on send</strong></td>
        <td>10 ticks</td>
    </tr>
    </tbody>
</table> 

{% page inherited/OwnedStructure.md %}

{% api_property cooldown 'number' %}

The remaining amount of ticks while this terminal cannot be used to make [`StructureTerminal.send`](#StructureTerminal.send) or [`Game.market.deal`](#Game.market.deal) calls.


{% api_property store 'object' %}

```javascript
if( !(RESOURCE_UTRIUM in Game.rooms['W1N1'].terminal.store) ) {
    // need more utrium!
}
```

```javascript
const total = _.sum(Game.rooms['W1N1'].terminal.store);
```

终端内容物对象。每一个键都是<code>RESOURCE_*</code>常量，值是资源数量。如果没有<code>RESOURCE_ENERGY</code>，它的值始终为0，而其他资源的值为undefined。你可以使用<a href="https://github.com/lodash/lodash/blob/3.10.1/doc/README.md#_sumcollection-iteratee-thisarg"><code>lodash.sum</code></a>来获得内容物总量。



{% api_property storeCapacity 'number' %}



可以容纳的资源总量。



{% api_method send 'resourceType, amount, destination, [description]' A %}

```javascript
Game.rooms['W1N1'].terminal.send(RESOURCE_UTRIUM, 100, 'W2N3',
	'trade contract #1');
```

Sends resource to a Terminal in another room with the specified name.

{% api_method_params %}
resourceType : string
<code>RESOURCE_*</code>常量之一。
===
amount : number
The amount of resources to be sent. The minimum amount is 100.
===
destination : string
The name of the target room. You don't have to gain visibility in this room.
===
description (optional) : string
The description of the transaction. It is visible to the recipient. The maximum length is 100 characters.
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个建筑的拥有者。
ERR_NOT_ENOUGH_RESOURCES | The structure does not have the required amount of resources.
ERR_INVALID_ARGS | The arguments provided are incorrect.
ERR_TIRED | The terminal is still cooling down. 
{% endapi_return_codes %}



{% api_method transfer 'target, resourceType, [amount]' A '{"deprecated": "Please use [`Creep.withdraw`](#Creep.withdraw) instead."}' %}

```javascript
Game.rooms['W1N1'].terminal.transfer(creep, RESOURCE_ENERGY);
```

从终端传递资源给creep。目标必须在相邻的方格里。You can transfer resources to your creeps from hostile structures as well.

{% api_method_params %}
target : <a href="#Creep">Creep</a>
目标creep对象。
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
ERR_NOT_ENOUGH_RESOURCES | 这个建筑内的资源少于给定的数量。
ERR_INVALID_TARGET | 目标无法接受能量。
ERR_FULL | 目标无法接受更多能量。
ERR_NOT_IN_RANGE | 目标太远了。
ERR_INVALID_ARGS | 资源数量不正确。
ERR_RCL_NOT_ENOUGH | 你的房间控制等级不足。
ERR_TIRED | 这个终端依然在冷却中。
{% endapi_return_codes %}


