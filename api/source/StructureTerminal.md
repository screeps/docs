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

A [`Store`](#Store) object that contains cargo of this structure.


{% api_property storeCapacity 'number' '{"deprecated": true}' %}
                                                                              
An alias for [`.store.getCapacity()`](#Store.getCapacity).

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
The amount of resources to be sent.
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
ERR_TIRED | The terminal is still cooling down. 
{% endapi_return_codes %}

