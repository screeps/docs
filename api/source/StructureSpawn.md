# StructureSpawn

<img src="img/spawn.png" alt="" align="right" /> 

Spawn is your colony center. This structure can create, renew, and recycle creeps. 
All your spawns are accessible through [`Game.spawns`](#Game.spawns) hash list. 
Spawns auto-regenerate a little amount of energy each tick, so that you can easily 
recover even if all your creeps died.

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td colspan="2"><strong>Controller level</strong></td>
    </tr>
    <tr>
        <td>1-6</td>
        <td>1 spawn</td>
    </tr>
    <tr>
        <td>7</td>
        <td>2 spawns</td>
    </tr>
    <tr>
        <td>8</td>
        <td>3 spawns</td>
    </tr>
    <tr>
        <td><strong>Cost</strong></td>
        <td>15,000</td>
    </tr>
    <tr>
        <td><strong>Hits</strong></td>
        <td>5,000</td>
    </tr>
    <tr>
        <td><strong>Capacity</strong></td>
        <td>300</td>
    </tr>
    <tr>
        <td><strong>Spawn time</strong></td>
        <td>3 ticks per each body part</td>
    </tr>
    <tr>
        <td><strong>Energy auto-regeneration</strong></td>
        <td>1 energy unit per tick while energy available in the room (in all spawns and extensions) is less than 300</td>
    </tr>
    </tbody>
</table>

{% page inherited/OwnedStructure.md %}


{% api_property energy 'number' %}



The amount of energy containing in the spawn.



{% api_property energyCapacity 'number' %}



The total amount of energy the spawn can contain



{% api_property memory 'any' %}

```javascript
spawn.memory.queue = [];
```

A shorthand to <code>Memory.spawns[spawn.name]</code>. You can use it for quick access the spawn’s specific memory data object. <a href="/hc/en-us/articles/203016642-Working-with-memory">Learn more about memory</a>



{% api_property name 'string' %}



Spawn’s name. You choose the name upon creating a new spawn, and it cannot be changed later. This name is a hash key to access the spawn via the <a href="#Game.spawns">Game.spawns</a> object.



{% api_property spawning 'object, null' %}



If the spawn is in process of spawning a new creep, this object will contain the new creep’s information, or null otherwise.

{% api_method_params %}
name : string
The name of a new creep.
===
needTime : number
Time needed in total to complete the spawning.
===
remainingTime : number
Remaining time to go.
{% endapi_method_params %}


{% api_method canCreateCreep 'body, [name]' 1 %}

```javascript
if(spawn.canCreateCreep(body, name) == OK) {
    spawn.createCreep(body, name);
}
```

Check if a creep can be created.

{% api_method_params %}
body : array&lt;string&gt;
An array describing the new creep’s body. Should contain 1 to 50 elements with one of these constants:
					
* `WORK`
* `MOVE`
* `CARRY`
* `ATTACK`
* `RANGED_ATTACK`
* `HEAL`
* `TOUGH`
* `CLAIM`
									
===
name (optional) : string
The name of a new creep. It should be unique creep name, i.e. the <code>Game.creeps</code> object should not contain another creep with the same name (hash key). If not defined, a random name will be generated.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | A creep with the given body and name can be created.
ERR_NOT_OWNER | You are not the owner of this spawn.
ERR_NAME_EXISTS | There is a creep with the same name already.
ERR_BUSY | The spawn is already in process of spawning another creep.
ERR_NOT_ENOUGH_ENERGY | The spawn and its extensions contain not enough energy to create a creep with the given body.
ERR_INVALID_ARGS | Body is not properly described.
ERR_RCL_NOT_ENOUGH | Your Room Controller level is insufficient to use this spawn.
{% endapi_return_codes %}



{% api_method createCreep 'body, [name], [memory]' A %}

```javascript
Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], 'Worker1');
```

```javascript
Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], null, 
    {role: 'harvester'});
```

```javascript
const result = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE]);

if(_.isString(result)) {
    console.log('The name is: '+result);
}
else {
    console.log('Spawn error: '+result);
}
```

Start the creep spawning process. The required energy amount can be withdrawn from all spawns and extensions in the room.

{% api_method_params %}
body : array&lt;string&gt;
An array describing the new creep’s body. Should contain 1 to 50 elements with one of these constants:

* `WORK`
* `MOVE`
* `CARRY`
* `ATTACK`
* `RANGED_ATTACK`
* `HEAL`
* `TOUGH`
* `CLAIM`
				
===
name (optional) : string
The name of a new creep. It should be unique creep name, i.e. the <code>Game.creeps</code> object should not contain another creep with the same name (hash key). If not defined, a random name will be generated.
===
memory (optional) : any
The memory of a new creep. If provided, it will be immediately stored into <code>Memory.creeps[name]</code>.
{% endapi_method_params %}


### Return value

The name of a new creep or one of these error codes:
{% api_return_codes %}
ERR_NOT_OWNER | You are not the owner of this spawn.
ERR_NAME_EXISTS | There is a creep with the same name already.
ERR_BUSY | The spawn is already in process of spawning another creep.
ERR_NOT_ENOUGH_ENERGY | The spawn and its extensions contain not enough energy to create a creep with the given body.
ERR_INVALID_ARGS | Body is not properly described.
ERR_RCL_NOT_ENOUGH | Your Room Controller level is insufficient to use this spawn.
{% endapi_return_codes %}



{% api_method recycleCreep 'target' A %}



Kill the creep and drop up to 100% of resources spent on its spawning and boosting depending on remaining life time. The target should be at adjacent square.

{% api_method_params %}
target : <a href="#Creep">Creep</a>
The target creep object.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this spawn or the target creep.
ERR_INVALID_TARGET | The specified target object is not a creep.
ERR_NOT_IN_RANGE | The target creep is too far away.
{% endapi_return_codes %}



{% api_method renewCreep 'target' A %}



Increase the remaining time to live of the target creep. The target should be at adjacent square. 
The spawn should not be busy with the spawning process. Each execution increases the creep's timer 
by amount of ticks according to this formula: 

```javascript-content
floor(600/body_size)
```

Energy required for each execution is determined using this formula: 

```javascript-content
ceil(creep_cost/2.5/body_size)
```

Renewing a creep removes all of its boosts.

{% api_method_params %}
target : <a href="#Creep">Creep</a>
The target creep object.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this spawn.
ERR_BUSY | The spawn is spawning another creep.
ERR_NOT_ENOUGH_ENERGY | The spawn does not have enough energy.
ERR_INVALID_TARGET | The specified target object is not a creep.
ERR_FULL | The target creep's time to live timer is full.
ERR_NOT_IN_RANGE | The target creep is too far away.
{% endapi_return_codes %}



{% api_method transferEnergy 'target, [amount]' A '{"deprecated": "Please use [`Creep.withdraw`](#Creep.withdraw) instead."}' %}



Transfer the energy from the spawn to a creep.

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
ERR_NOT_OWNER | You are not the owner of this spawn.
ERR_NOT_ENOUGH_ENERGY | The spawn contains less energy than the given amount.
ERR_INVALID_TARGET | The specified target object is not a creep.
ERR_FULL | The target creep can not carry the given amount of energy.
ERR_NOT_IN_RANGE | The target creep is too far away.
{% endapi_return_codes %}


