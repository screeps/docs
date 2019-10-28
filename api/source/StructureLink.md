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



{% api_property energy 'number' '{"deprecated": true}' %}
                                                                
An alias for [`.store[RESOURCE_ENERGY]`](#StructureExtension.store).



{% api_property energyCapacity 'number' '{"deprecated": true}' %}
                                                                                                                
An alias for [`.store.getCapacity(RESOURCE_ENERGY)`](#Store.getCapacity).

{% api_property store 'object' %}

```javascript
if(structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
    creep.transfer(structure, RESOURCE_ENERGY);
}
```


A [`Store`](#Store) object that contains cargo of this structure.



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


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | You are not the owner of this link.
ERR_NOT_ENOUGH_RESOURCES | 这个建筑内的资源少于给定的数量。
ERR_INVALID_TARGET | The target is not a valid StructureLink object.
ERR_FULL | 目标无法接受更多能量。
ERR_INVALID_ARGS | 资源数量不正确。
ERR_TIRED | The link is still cooling down.
ERR_RCL_NOT_ENOUGH | Room Controller Level insufficient to use this link.
ERR_NOT_IN_RANGE | 目标太远了。
{% endapi_return_codes %}


