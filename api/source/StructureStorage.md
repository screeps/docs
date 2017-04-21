# StructureStorage

<img src="img/storage.png" alt="" align="right" />

A structure that can store huge amount of resource units. Only one structure per room is allowed 
that can be addressed by [`Room.storage`](#Room.storage) property.</p>

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td colspan="2"><strong>Controller level</strong></td>
    </tr>
    <tr>
        <td>1-3</td>
        <td>—</td>
    </tr>
    <tr>
        <td>4-8</td>
        <td>1 storage</td>
    </tr>
    <tr>
        <td><strong>Cost</strong></td>
        <td>30,000</td>
    </tr>
    <tr>
        <td><strong>Hits</strong></td>
        <td>10,000</td>
    </tr>
    <tr>
        <td><strong>Capacity</strong></td>
        <td>1,000,000</td>
    </tr>
    </tbody>
</table>

{% page inherited/OwnedStructure.md %}


{% api_property store 'object' %}

```javascript
if(creep.room.storage.store[RESOURCE_ENERGY] == 0) {
    // replenish the storage!
}
```

```javascript
if( !(RESOURCE_UTRIUM in creep.room.storage.store) ) {
    // need more utrium!
}
```

```javascript
const total = _.sum(Game.rooms['W1N1'].storage.store);
```

An object with the storage contents. Each object key is one of the <code>RESOURCE_*</code> constants, values are resources amounts. <code>RESOURCE_ENERGY</code> is always defined and equals to 0 when empty, other resources are undefined when empty. You can use <a href="https://github.com/lodash/lodash/blob/3.10.1/doc/README.md#_sumcollection-iteratee-thisarg"><code>lodash.sum</code></a> to get the total amount of contents.



{% api_property storeCapacity 'number' %}



The total amount of resources the storage can contain.



{% api_method transfer 'target, resourceType, [amount]' A '{"deprecated": "Please use [`Creep.withdraw`](#Creep.withdraw) instead."}' %}

```javascript
storage.transfer(creep, RESOURCE_ENERGY);
```

Transfer resource from this storage to a creep. The target has to be at adjacent square. You can transfer resources to your creeps from hostile structures as well.

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


