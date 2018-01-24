# Tombstone

<img src="img/tombstone.png" alt="" align="right" />

A remnant of dead creeps. This is a walkable structure. 

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td><strong>Controller level</strong></td>
        <td>Any (including neutral rooms)</td>
    </tr>
    <tr>
        <td><strong>Decay</strong></td>
        <td>Lasts TOMBSTONE_DECAY_PER_PART (Default 5) ticks per body part of the deceased</td>
    </tr>
    </tbody>
</table>

{% page inherited/RoomObject.md %}

{% api_property my 'boolean' %}

Whether this is your own tombstone.

{% api_property owner 'object' %}

An object with the tombstones owner info containing the following properties:


{% api_property id string %}

A unique object identificator. You can use <a href="#Game.getObjectById"><code>Game.getObjectById</code></a> method to retrieve an object instance by its <code>id</code>.


{% api_method_params %}
username : string
The name of the owner user.
{% endapi_method_params %}

{% api_property deathTime 'number' %}

Time of death

{% api_property store 'object' %}


```javascript
const total = _.sum(tombstone.store);
``` 

An object with the tombstone contents. Each object key is one of the <code>RESOURCE_*</code> constants, values are resources amounts. <code>RESOURCE_ENERGY</code> is always defined and equals to 0 when empty, other resources are undefined when empty. You can use <a href="https://github.com/lodash/lodash/blob/3.10.1/doc/README.md#_sumcollection-iteratee-thisarg"><code>lodash.sum</code></a> to get the total amount of contents.

{% api_property creep 'Creep' %}

An object containing the deceased creep. See <a href="#Creep"><code>Creep</code></a>

{% api_property ticksToDecay 'number' %}

The amount of game ticks before this tombstone decays.



