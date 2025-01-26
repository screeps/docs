# StructureContainer

<img src="img/container.png" alt="" align="right" />

A small container that can be used to store resources. This is a walkable structure. All dropped resources automatically goes to the container at the same tile.

This structure is unowned, so it won't be returned in a `room.find(FIND_MY_STRUCTURES)` call.

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

{% api_property store '<a href="#Store">Store</a>' %}

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




