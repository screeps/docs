# StructureTower
	
<img src="img/tower.png" alt="" align="right" />

Remotely attacks or heals creeps, or repairs structures. Can be targeted to any object in 
the room. However, its effectiveness linearly depends on the distance. Each action consumes energy.

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td colspan="2"><strong>Controller level</strong></td>
    </tr>
    <tr>
        <td>1-2</td>
        <td>—</td>
    </tr>
    <tr>
        <td>3-4</td>
        <td>1 tower</td>
    </tr>
    <tr>
        <td>5-6</td>
        <td>2 towers</td>
    </tr>
    <tr>
        <td>7</td>
        <td>3 towers</td>
    </tr>
    <tr>
        <td>8</td>
        <td>6 towers</td>
    </tr>
    <tr>
        <td><strong>Cost</strong></td>
        <td>5,000</td>
    </tr>
    <tr>
        <td><strong>Hits</strong></td>
        <td>3,000</td>
    </tr>
    <tr>
        <td><strong>Capacity</strong></td>
        <td>1,000</td>
    </tr>
    <tr>
        <td><strong>Energy per action</strong></td>
        <td>10</td>
    </tr>
    <tr>
        <td><strong>Attack effectiveness</strong></td>
        <td>600 hits at range ≤5 to 150 hits at range ≥20</td>
    </tr>
    <tr>
        <td><strong>Heal effectiveness</strong></td>
        <td>400 hits at range ≤5 to 100 hits at range ≥20</td>
    </tr>
    <tr>
        <td><strong>Repair effectiveness</strong></td>
        <td>800 hits at range ≤5 to 200 hits at range ≥20</td>
    </tr>
    </tbody>
</table>

{% page inherited/OwnedStructure.md %}


{% api_property energy 'number' %}



The amount of energy containing in this structure.



{% api_property energyCapacity 'number' %}



The total amount of energy this structure can contain.



{% api_method attack 'target' A %}



Remotely attack any creep in the room.

{% api_method_params %}
target : <a href="#Creep">Creep</a>
The target creep.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_ENOUGH_RESOURCES | The tower does not have enough energy.
ERR_INVALID_TARGET | The target is not a valid attackable object.
ERR_RCL_NOT_ENOUGH | Room Controller Level insufficient to use this structure.
{% endapi_return_codes %}



{% api_method heal 'target' A %}



Remotely heal any creep in the room.

{% api_method_params %}
target : <a href="#Creep">Creep</a>
The target creep.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_ENOUGH_RESOURCES | The tower does not have enough energy.
ERR_INVALID_TARGET | The target is not a valid creep object.
ERR_RCL_NOT_ENOUGH | Room Controller Level insufficient to use this structure.
{% endapi_return_codes %}



{% api_method repair 'target' A %}



Remotely repair any structure in the room.

{% api_method_params %}
target : <a href="#Structure">Structure</a>
The target structure.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_ENOUGH_RESOURCES | The tower does not have enough energy.
ERR_INVALID_TARGET | The target is not a valid repairable object.
ERR_RCL_NOT_ENOUGH | Room Controller Level insufficient to use this structure.
{% endapi_return_codes %}


 
{% api_method transferEnergy 'target, [amount]' A '{"deprecated": "Please use [`Creep.withdraw`](#Creep.withdraw) instead."}' %}



Transfer energy from the structure to a creep. The target has to be at adjacent square.

{% api_method_params %}
target : <a href="#Creep">Creep</a>
The creep object which energy should be transferred to.
===
amount (optional) : number
The amount of energy to be transferred. If omitted, all the remaining amount of energy will be used.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of the target creep, or there is a hostile rampart on top of the structure.
ERR_NOT_ENOUGH_RESOURCES | The structure contains less energy than the given amount.
ERR_INVALID_TARGET | The specified target object is not a creep.
ERR_FULL | The target creep can not carry the given amount of energy.
ERR_NOT_IN_RANGE | The target creep is too far away.
{% endapi_return_codes %}


