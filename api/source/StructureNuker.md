# StructureNuker

<img src="img/nuke.png" alt="" align="right" />

Launches a nuke to another room dealing huge damage to the landing area. Each launch has a 
cooldown and requires energy and ghodium resources. Launching creates a 
[Nuke](#Nuke) object at the target room position which is visible to any player until it is landed. 
Incoming nuke cannot be moved or cancelled. Nukes cannot be launched from or to novice rooms. Resources placed into a StructureNuker cannot be withdrawn.

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td colspan="2"><strong>Controller level</strong></td>
    </tr>
    <tr>
        <td>1-7</td>
        <td>—</td>
    </tr>
    <tr>
        <td>8</td>
        <td>1 nuke</td>
    </tr>
    <tr>
        <td><strong>Cost</strong></td>
        <td>100,000</td>
    </tr>
    <tr>
        <td><strong>Hits</strong></td>
        <td>1,000</td>
    </tr>
    <tr>
        <td><strong>Range</strong></td>
        <td>10 rooms</td>
    </tr>
    <tr>
        <td><strong>Launch cost</strong></td>
        <td>300,000 energy<br /> 5,000 ghodium</td>
    </tr>
    <tr>
        <td><strong>Launch cooldown</strong></td>
        <td>100,000 ticks</td>
    </tr>
    <tr>
        <td><strong>Landing time</strong></td>
        <td>50,000 ticks</td>
    </tr>
    <tr>
        <td><strong>Effect</strong></td>
        <td>All creeps, construction sites and dropped resources in the room are removed immediately, even inside ramparts. Damage to structures:
            <ul>
                <li>10,000,000 hits at the landing position;</li>
                <li>5,000,000 hits to all structures in 5x5 area.</li>
            </ul>
            <p>Note that you can stack multiple nukes from different rooms at the same target position to increase damage.</p>
            <p>If the room is in safe mode, then the safe mode is cancelled immediately, and the safe mode cooldown is reset to 0.</p>
            <p>The room controller is hit by triggering <code>upgradeBlocked</code> period, which means it is unavailable to activate safe mode again within the next 200 ticks.</p>
        </td>
    </tr>
    </tbody>
</table>

{% page inherited/OwnedStructure.md %}


{% api_property energy 'number' '{"deprecated": true}' %}
                                                                
An alias for [`.store[RESOURCE_ENERGY]`](#StructureExtension.store).



{% api_property energyCapacity 'number' '{"deprecated": true}' %}
                                                                                                                
An alias for [`.store.getCapacity(RESOURCE_ENERGY)`](#Store.getCapacity).



{% api_property ghodium 'number' '{"deprecated": true}' %}
                                                                 
An alias for [`.store[RESOURCE_GHODIUM]`](#StructureExtension.store).



{% api_property ghodiumCapacity 'number' '{"deprecated": true}' %}
                                                                                                                 
An alias for [`.store.getCapacity(RESOURCE_GHODIUM)`](#Store.getCapacity).



{% api_property cooldown 'number' %}



The amount of game ticks until the next launch is possible.


{% api_property store '<a href="#Store">Store</a>' %}

```javascript
if(structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
    creep.transfer(structure, RESOURCE_ENERGY);
}
```


A [`Store`](#Store) object that contains cargo of this structure.



{% api_method launchNuke 'pos' A %}

```javascript
nuker.launchNuke(new RoomPosition(20,30, 'W1N1'));
```

Launch a nuke to the specified position.

{% api_method_params %}
pos : <a href="#RoomPosition">RoomPosition</a>
The target room position.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this structure.
ERR_NOT_ENOUGH_RESOURCES | The structure does not have enough energy and/or ghodium.
ERR_INVALID_TARGET | The target is not a valid RoomPosition.
ERR_NOT_IN_RANGE | The target room is out of range.
ERR_TIRED | This structure is still cooling down.
ERR_RCL_NOT_ENOUGH | Room Controller Level insufficient to use this structure.
{% endapi_return_codes %}


