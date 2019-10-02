# Ruin

<img src="img/ruin.png" alt="" align="right" />

A destroyed structure. This is a walkable object. 

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td><strong>Decay</strong></td>
        <td>500 ticks except some special cases</td>
    </tr>
    </tbody>
</table>

{% page inherited/RoomObject.md %}


{% api_property destroyTime 'number' %}

The time when the structure has been destroyed. 

{% api_property id string %}

A unique object identificator. You can use <a href="#Game.getObjectById"><code>Game.getObjectById</code></a> method to retrieve an object instance by its <code>id</code>.

{% api_property store 'object' %}

A [`Store`](#Store) object that contains resources of this structure.

{% api_property structure '<a href="#Structure">Structure</a> | <a href="#OwnedStructure">OwnedStructure</a>' %}

An object containing basic data of the destroyed structure.


{% api_property ticksToDecay 'number' %}

The amount of game ticks before this ruin decays.



