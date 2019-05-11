# Deposit

A resource deposit. Can be harvested by creeps with a `WORK` body part. Depletes when harvested.

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


The deposit type, one of the <code>RESOURCE_*</code> constants.


{% api_property ticksToDecay 'number' %}


The amount of game ticks when this deposit will disappear.
