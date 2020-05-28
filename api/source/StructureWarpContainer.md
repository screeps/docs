# StructureWarpContainer

<img src="img/warpContainers.gif" alt="" align="right" />

A moderate container that share its storage with another warp container in the same room.

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td><strong>Controller level</strong></td>
        <td>Any (including neutral rooms)</td>
    </tr>
    <tr>
        <td><strong>Available per room</strong></td>
        <td>2</td>
    </tr>
    <tr>
        <td><strong>Capacity</strong></td>
        <td>10,000</td>
    </tr>
    <tr>
        <td><strong>Cost</strong></td>
        <td>100,000</td>
    </tr>
    <tr>
        <td><strong>Hits</strong></td>
        <td>10,000,000</td>
    </tr>
    <tr>
        <td><strong>Decay</strong></td>
        <td>Loses 5,000 hits every 100 ticks.</td>
    </tr>
    <tr>
        <td><strong>Charging</strong></td>
        <td>Requires 100 energy every 100 ticks to be operational (for all warp containers in the room).</td>
    </tr>
    </tbody>
</table>

{% page inherited/Structure.md %}

{% api_property cooldown 'number' %}

The remaining amount of ticks while resources withdrawal from this structure is not possible.

{% api_property store '<a href="#Store">Store</a>' %}

A [`Store`](#Store) object that contains shared cargo of warp containers in the room.

```javascript
if((structure.cooldown == 0) && (structure.store[RESOURCE_ENERGY] > 0)) {
    creep.withdraw(structure, RESOURCE_ENERGY);
}
```

{% api_property storeCapacity 'number' '{"deprecated": true}' %}
                                                                              
An alias for [`.store.getCapacity()`](#Store.getCapacity).

{% api_property ticksToDecay 'number' %}



The amount of game ticks when this warp container will lose some energy or hit points.
