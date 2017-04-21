# StructureLink

<img src="img/link.png" alt="" align="right" /> 

Remotely transfers energy to another Link in the same room.

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td colspan="2"><strong>Controller level</strong></td>
    </tr>
    <tr>
        <td>1-4</td>
        <td>—</td>
    </tr>
    <tr>
        <td>5</td>
        <td>2 links</td>
    </tr>
    <tr>
        <td>6</td>
        <td>3 links</td>
    </tr>
    <tr>
        <td>7</td>
        <td>4 links</td>
    </tr>
    <tr>
        <td>8</td>
        <td>6 links</td>
    </tr>
    <tr>
        <td><strong>Cost</strong></td>
        <td>5,000</td>
    </tr>
    <tr>
        <td><strong>Hits</strong></td>
        <td>1,000</td>
    </tr>
    <tr>
        <td><strong>Capacity</strong></td>
        <td>800</td>
    </tr>
    <tr>
        <td><strong>Cooldown time</strong></td>
        <td>1 tick per tile of the linear distance to the target</td>
    </tr>
    <tr>
        <td><strong>Energy loss</strong></td>
        <td>3%</td>
    </tr>
    </tbody>
</table>

{% page inherited/OwnedStructure.md %}


{% api_property cooldown 'number' %}



The amount of game ticks the link has to wait until the next transfer is possible.



{% api_property energy 'number' %}



The amount of energy containing in the link.



{% api_property energyCapacity 'number' %}



The total amount of energy the link can contain.



{% api_method transferEnergy 'target, [amount]' A %}

```javascript
const linkFrom = Game.rooms['W1N1'].lookForAt('structure', 10, 25)[0];

const linkTo = linkFrom.pos.findInRange(FIND_MY_STRUCTURES, 2,
    {filter: {structureType: STRUCTURE_LINK}})[0];

linkFrom.transferEnergy(linkTo);
```

Remotely transfer energy to another link at any location in the same room.

{% api_method_params %}
target : <a href="#StructureLink">StructureLink</a>
The target object.
===
amount (optional) : number
The amount of energy to be transferred. If omitted, all the available energy is used.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this link.
ERR_NOT_ENOUGH_RESOURCES | The structure does not have the given amount of energy.
ERR_INVALID_TARGET | The target is not a valid StructureLink object.
ERR_FULL | The target cannot receive any more energy.
ERR_INVALID_ARGS | The energy amount is incorrect.
ERR_TIRED | The link is still cooling down.
ERR_RCL_NOT_ENOUGH | Room Controller Level insufficient to use this link.
{% endapi_return_codes %}


