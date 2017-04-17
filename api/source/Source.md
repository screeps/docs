# Source
 
An energy source object. Can be harvested by creeps with a `WORK` body part.

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td><strong>Energy amount</strong></td>
        <td>4000 in center rooms<br />3000 in an owned or reserved room<br />1500 in an unreserved room</td>
    </tr>
    <tr>
        <td><strong>Energy regeneration</strong></td>
        <td>Every 300 game ticks</td>
    </tr>
    </tbody>
</table>

{% page inherited/RoomObject.md %}

{% api_property energy 'number' %}



The remaining amount of energy.



{% api_property energyCapacity 'number' %}



The total amount of energy in the source.



{% api_property id 'string' %}



A unique object identificator. You can use <a href="#Game.getObjectById"><code>Game.getObjectById</code></a> method to retrieve an object instance by its <code>id</code>.



{% api_property ticksToRegeneration 'number' %}



The remaining time after which the source will be refilled.


