# StructureContainer

<img src="img/container.png" alt="" align="right" />

A small container that can be used to store resources. This is a walkable structure. All dropped resources automatically goes to the container at the same tile.

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td><strong>Controller level</strong></td>
        <td>Any (including neutral rooms)</td>
    </tr>
    <tr>
        <td><strong>Available per room</strong></td>
        <td>5</td>
    </tr>
    <tr>
        <td><strong>Capacity</strong></td>
        <td>2,000</td>
    </tr>
    <tr>
        <td><strong>Cost</strong></td>
        <td>5,000</td>
    </tr>
    <tr>
        <td><strong>Hits</strong></td>
        <td>250,000</td>
    </tr>
    <tr>
        <td><strong>Decay</strong></td>
        <td>Loses 5,000 hits every 500 ticks in an owned room, and every 100 ticks in an unowned room.</td>
    </tr>
    </tbody>
</table>

{% page inherited/Structure.md %}

{% api_property store 'object' %}

```javascript
const containersWithEnergy = room.find(FIND_STRUCTURES, {
    filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                   i.store[RESOURCE_ENERGY] > 0
});
```


A [`Store`](#Store) object that contains cargo of this structure.

{% api_property storeCapacity 'number' '{"deprecated": true}' %}
                                       
An alias for [`.store.getCapacity()`](#Store.getCapacity).



{% api_property ticksToDecay 'number' %}



The amount of game ticks when this container will lose some hit points.



{% api_method transfer 'target, resourceType, [amount]' A '{"deprecated": "Please use [`Creep.withdraw`](#Creep.withdraw) instead."}' %}

```javascript
const containers = creep.pos.findInRange(FIND_STRUCTURES, 1,
      {filter: {structureType: STRUCTURE_CONTAINER}});
containers[0].transfer(creep, RESOURCE_ENERGY);
```

Transfer resource from this structure to a creep. The target has to be at adjacent square.

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
ERR_NOT_ENOUGH_RESOURCES | The structure does not have the given amount of energy.
ERR_INVALID_TARGET | The target is not a valid object which can contain energy.
ERR_FULL | The target cannot receive any more energy.
ERR_NOT_IN_RANGE | The target is too far away.
ERR_INVALID_ARGS | The energy amount is incorrect.
{% endapi_return_codes %}


