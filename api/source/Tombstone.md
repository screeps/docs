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

{% api_property creep '<a href="#Creep">Creep</a> | <a href="#PowerCreep">PowerCreep</a>' %}

```javascript
room.find(FIND_TOMBSTONES).forEach(tombstone => {
    if(tombstone.creep.my) {
        console.log(`My creep died with ID=${tombstone.creep.id} ` +
             `and role=${Memory.creeps[tombstone.creep.name].role}`);   
    }    
});
```
```javascript
room.find(FIND_TOMBSTONES).forEach(tombstone => {
    if(tombstone.creep instanceof PowerCreep) {
        console.log(`Power creep died here`);   
    }    
});
````

An object containing the deceased creep or power creep.

{% api_property deathTime 'number' %}

Time of death. 

{% api_property id string %}

A unique object identificator. You can use <a href="#Game.getObjectById"><code>Game.getObjectById</code></a> method to retrieve an object instance by its <code>id</code>.


{% api_property store '<a href="#Store">Store</a>' %}

A [`Store`](#Store) object that contains cargo of this structure.


{% api_property ticksToDecay 'number' %}

The amount of game ticks before this tombstone decays.



