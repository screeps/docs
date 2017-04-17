# StructureTerminal

<img src="img/terminal.png" alt="" align="right" />

Sends any resources to a Terminal in another room. The destination Terminal can belong to any player. 
Each transaction requires additional energy (regardless of the transfer resource type) that can be 
calculated using [`Game.market.calcTransactionCost`](#Game.market.calcTransactionCost) method. 
For example, sending 1000 mineral units from W0N0 to W10N5 will consume 742 energy units. 
You can track your incoming and outgoing transactions using the [`Game.market`'](#Game.market) object. 
Only one Terminal per room is allowed that can be addressed by [`Room.terminal`](#Room.terminal) property.

Terminals are used in the [Market system](/hc/en-us/articles/207783649-Market-system).

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
    </tbody>
</table>

{% page inherited/OwnedStructure.md %}


{% api_property store 'object' %}

```javascript
if( !(RESOURCE_UTRIUM in Game.rooms['W1N1'].terminal.store) ) {
    // need more utrium!
}
```

```javascript
const total = _.sum(Game.rooms['W1N1'].terminal.store);
```

An object with the storage contents. Each object key is one of the <code>RESOURCE_*</code> constants, values are resources amounts. <code>RESOURCE_ENERGY</code> is always defined and equals to 0 when empty, other resources are undefined when empty. You can use <a href="https://github.com/lodash/lodash/blob/3.10.1/doc/README.md#_sumcollection-iteratee-thisarg"><code>lodash.sum</code></a> to get the total amount of contents.



{% api_property storeCapacity 'number' %}



The total amount of resources the storage can contain.



{% api_method send 'resourceType, amount, destination, [description]' A %}

```javascript
Game.rooms['W1N1'].terminal.send(RESOURCE_UTRIUM, 100, 'W2N3',
	'trade contract #1');
```

Sends resource to a Terminal in another room with the specified name.

{% api_method_params %}
resourceType : string
One of the <code>RESOURCE_*</code> constants.
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


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this structure.
ERR_NOT_ENOUGH_RESOURCES | The structure does not have the required amount of resources.
ERR_INVALID_ARGS | The arguments provided are incorrect.
{% endapi_return_codes %}



{% api_method transfer 'target, resourceType, [amount]' A '{"deprecated": "Please use [`Creep.withdraw`](#Creep.withdraw) instead."}' %}

```javascript
Game.rooms['W1N1'].terminal.transfer(creep, RESOURCE_ENERGY);
```

Transfer resource from this terminal to a creep. The target has to be at adjacent square. You can transfer resources to your creeps from hostile structures as well.

{% api_method_params %}
target : <a href="#Creep">Creep</a>
The target object.
===
resourceType : string
One of the <code>RESOURCE_*</code> constants.
===
amount (optional) : number
The amount of resources to be transferred. If omitted, all the available amount is used.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of the target creep, or there is a hostile rampart on top of the structure.
ERR_NOT_ENOUGH_RESOURCES | The structure does not have the given amount of energy.
ERR_INVALID_TARGET | The target is not a valid object which can contain energy.
ERR_FULL | The target cannot receive any more energy.
ERR_NOT_IN_RANGE | The target is too far away.
ERR_INVALID_ARGS | The energy amount is incorrect.
{% endapi_return_codes %}


