# Deposit

<img src="img/deposit.png" alt="" align="right" />

A rare resource deposit needed for producing commodities. Can be harvested by creeps with a `WORK` body part. 
Each harvest operation triggers a cooldown period, which becomes longer and longer over time.

Learn more about deposits from [this article](/resources.html). 

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td><strong>Cooldown</strong></td>
        <td>Depends on the previously harvested amount</td>
    </tr>
    <tr>
        <td><strong>Decay</strong></td>
        <td>50,000 ticks after appearing or last harvest operation</td>
    </tr>
    </tbody>
</table>

{% page inherited/RoomObject.md %}

{% api_property cooldown 'number' %}


The amount of game ticks until the next harvest action is possible.


{% api_property depositType 'string' %}


The deposit type, one of the following constants:

```javascript-content
RESOURCE_MIST
RESOURCE_BIOMASS
RESOURCE_METAL
RESOURCE_SILICON
```


{% api_property lastCooldown 'number' %}


The cooldown of the last harvest operation on this deposit.


{% api_property ticksToDecay 'number' %}


The amount of game ticks when this deposit will disappear.
