# Tombstone

<img src="img/tombstone.gif" alt="" align="right" />

A remnant of dead creeps. This is a walkable object. 

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td><strong>Decay</strong></td>
        <td>5 ticks per body part of the deceased creep</td>
    </tr>
    </tbody>
</table>

{% page inherited/RoomObject.md %}

{% api_property creep '<a href="#Creep">Creep</a>' %}

```javascript
room.find(FIND_TOMBSTONES).forEach(tombstone => {
    if(tombstone.creep.my) {
        console.log(`My creep died with ID=${tombstone.creep.id} ` +
             `and role=${Memory.creeps[tombstone.creep.name].role}`);   
    }    
});
```

An object containing the deceased creep.

{% api_property deathTime 'number' %}

Time of death. 

{% api_property id string %}

A unique object identificator. You can use <a href="#Game.getObjectById"><code>Game.getObjectById</code></a> method to retrieve an object instance by its <code>id</code>.


{% api_property store 'object' %}

An object with the tombstone contents. Each object key is one of the <code>RESOURCE_*</code> constants, values are resources amounts. <code>RESOURCE_ENERGY</code> is always defined and equals to 0 when empty, other resources are undefined when empty. You can use <a href="https://github.com/lodash/lodash/blob/3.10.1/doc/README.md#_sumcollection-iteratee-thisarg"><code>lodash.sum</code></a> to get the total amount of contents.


{% api_property ticksToDecay 'number' %}

The amount of game ticks before this tombstone decays.



