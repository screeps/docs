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

A shorthand to <code>Memory.spawns[spawn.name]</code>. You can use it for quick access the spawn’s specific memory data object. <a href="/global-objects.html#Memory-object">Learn more about memory</a>



{% api_property name 'string' %}



Spawn’s name. You choose the name upon creating a new spawn, and it cannot be changed later. This name is a hash key to access the spawn via the <a href="#Game.spawns">Game.spawns</a> object.



{% api_property spawning '<a href="#StructureSpawn-Spawning">StructureSpawn.Spawning</a>' %}



If the spawn is in process of spawning a new creep, this object will contain a [`StructureSpawn.Spawning`](#StructureSpawn-Spawning) object, or null otherwise.

{% api_method canCreateCreep 'body, [name]' 1 '{"deprecated": "Please use [`StructureSpawn.spawnCreep`](#StructureSpawn.spawnCreep) with `dryRun` flag instead."}' %}

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


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | A creep with the given body and name can be created.
ERR_NOT_OWNER | You are not the owner of this spawn.
ERR_NAME_EXISTS | There is a creep with the same name already.
ERR_BUSY | The spawn is already in process of spawning another creep.
ERR_NOT_ENOUGH_ENERGY | The spawn and its extensions contain not enough energy to create a creep with the given body.
ERR_INVALID_ARGS | Body is not properly described.
ERR_RCL_NOT_ENOUGH | Your Room Controller level is insufficient to use this spawn.
{% endapi_return_codes %}



{% api_method createCreep 'body, [name], [memory]' A '{"deprecated": "Please use [`StructureSpawn.spawnCreep`](#StructureSpawn.spawnCreep) instead."}' %}

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


### 返回值

The name of a new creep or one of these error codes:
{% api_return_codes %}
ERR_NOT_OWNER | You are not the owner of this spawn.
ERR_NAME_EXISTS | There is a creep with the same name already.
ERR_BUSY | The spawn is already in process of spawning another creep.
ERR_NOT_ENOUGH_ENERGY | The spawn and its extensions contain not enough energy to create a creep with the given body.
ERR_INVALID_ARGS | Body is not properly described.
ERR_RCL_NOT_ENOUGH | Your Room Controller level is insufficient to use this spawn.
{% endapi_return_codes %}



{% api_method spawnCreep 'body, name, [opts]' A %}

```javascript
Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Worker1');
```

```javascript
Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Worker1', {
    memory: {role: 'harvester'}
});
```

```javascript
Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Worker1', { 
    energyStructures: [
        Game.spawns['Spawn1'], 
        Game.getObjectById('anExtensionId')
    ]
});
```

```javascript
var testIfCanSpawn = Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 
    'Worker1', { dryRun: true });
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
name : string
The name of a new creep. It must be a unique creep name, i.e. the <code>Game.creeps</code> object should not contain another creep with the same name (hash key).
===
opts (optional) : object
An object with additional options for the spawning process.
<ul>
    <li>
        <div class="api-arg-title">memory</div>
        <div class="api-arg-type">any</div>
        <div class="api-arg-desc">Memory of the new creep. If provided, it will be immediately stored into <code>Memory.creeps[name]</code>.</div>
    </li>
    <li>
        <div class="api-arg-title">energyStructures</div>
        <div class="api-arg-type">array</div>
        <div class="api-arg-desc">Array of spawns/extensions from which to draw energy for the spawning process. Structures will be used according to the array order.</div>
    </li>
    <li>
        <div class="api-arg-title">dryRun</div>
        <div class="api-arg-type">boolean</div>
        <div class="api-arg-desc">If `dryRun` is true, the operation will only check if it is possible to create a creep.</div>
    </li>
    <li>
            <div class="api-arg-title">directions</div>
            <div class="api-arg-type">array<number></div>
            <div class="api-arg-desc">Set desired directions where the creep should move when spawned. An array with the direction constants:
                                          <ul>
                                              <li><code>TOP</code></li>
                                              <li><code>TOP_RIGHT</code></li>
                                              <li><code>RIGHT</code></li>
                                              <li><code>BOTTOM_RIGHT</code></li>
                                              <li><code>BOTTOM</code></li>
                                              <li><code>BOTTOM_LEFT</code></li>
                                              <li><code>LEFT</code></li>
                                              <li><code>TOP_LEFT</code></li>
                                          </ul></div>
        </li>
</ul>
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | You are not the owner of this spawn.
ERR_NAME_EXISTS | There is a creep with the same name already.
ERR_BUSY | The spawn is already in process of spawning another creep.
ERR_NOT_ENOUGH_ENERGY | The spawn and its extensions contain not enough energy to create a creep with the given body.
ERR_INVALID_ARGS | Body is not properly described or name was not provided.
ERR_RCL_NOT_ENOUGH | Your Room Controller level is insufficient to use this spawn.
{% endapi_return_codes %}



{% api_method recycleCreep 'target' A %}



Kill the creep and drop up to 100% of resources spent on its spawning and boosting depending on remaining life time. The target should be at adjacent square. Energy return is limited to 125 units per body part.

{% api_method_params %}
target : <a href="#Creep">Creep</a>
The target creep object.
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | You are not the owner of this spawn or the target creep.
ERR_INVALID_TARGET | 指定的目标不是一个creep对象。
ERR_NOT_IN_RANGE | 目标creep太远了。
ERR_RCL_NOT_ENOUGH | Your Room Controller level is insufficient to use this spawn.
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


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | You are not the owner of the spawn, or the creep.
ERR_BUSY | The spawn is spawning another creep.
ERR_NOT_ENOUGH_ENERGY | The spawn does not have enough energy.
ERR_INVALID_TARGET | 指定的目标不是一个creep对象。
ERR_FULL | The target creep's time to live timer is full.
ERR_NOT_IN_RANGE | 目标creep太远了。
ERR_RCL_NOT_ENOUGH | Your Room Controller level is insufficient to use this spawn.
{% endapi_return_codes %}



{% api_method transferEnergy 'target, [amount]' A '{"deprecated": "Please use [`Creep.withdraw`](#Creep.withdraw) instead."}' %}



Transfer the energy from the spawn to a creep.

{% api_method_params %}
target : <a href="#Creep">Creep</a>
接受能量传递的creep对象。
===
amount (optional) : number
被传递能量的数量。如果没有这个参数，传递全部能量。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | You are not the owner of this spawn.
ERR_NOT_ENOUGH_ENERGY | The spawn contains less energy than the given amount.
ERR_INVALID_TARGET | 指定的目标不是一个creep对象。
ERR_FULL | 目标creep无法携带指定数量的能量。
ERR_NOT_IN_RANGE | 目标creep太远了。
{% endapi_return_codes %}


# StructureSpawn.Spawning

Details of the creep being spawned currently that can be addressed by the [`StructureSpawn.spawning`](#StructureSpawn.spawning) property.

{% api_property directions 'array<number>' %}

An array with the spawn directions, see [`StructureSpawn.Spawning.setDirections`](#StructureSpawn.Spawning.setDirections).

{% api_property name 'string' %}

The name of a new creep.

{% api_property needTime 'number' %}

Time needed in total to complete the spawning.

{% api_property remainingTime 'number ' %}

Remaining time to go.

{% api_property spawn '<a href="#StructureSpawn">StructureSpawn</a>' %}

A link to the spawn.


{% api_method cancel '' A %}

```javascript
Game.spawns['Spawn1'].spawning.cancel();
```

Cancel spawning immediately. Energy spent on spawning is not returned. 

### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | You are not the owner of this spawn.
{% endapi_return_codes %}

{% api_method setDirections 'directions' A %}

```javascript
Game.spawns['Spawn1'].spawning.setDirections([RIGHT, TOP_RIGHT]);
```

Set desired directions where the creep should move when spawned.

{% api_method_params %}
directions : array&lt;number>
An array with the direction constants:
    <ul>
        <li><code>TOP</code></li>
        <li><code>TOP_RIGHT</code></li>
        <li><code>RIGHT</code></li>
        <li><code>BOTTOM_RIGHT</code></li>
        <li><code>BOTTOM</code></li>
        <li><code>BOTTOM_LEFT</code></li>
        <li><code>LEFT</code></li>
        <li><code>TOP_LEFT</code></li>
    </ul>
{% endapi_method_params %}

### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | You are not the owner of this spawn.
ERR_INVALID_ARGS | The directions is array is invalid.
{% endapi_return_codes %}
