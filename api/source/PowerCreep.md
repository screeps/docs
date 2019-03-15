# PowerCreep  


Power Creeps are immortal "heroes" that are tied to your account and can be respawned in any `PowerSpawn` after death.
You can upgrade their abilities ("powers") up to your account Power Level (see [`Game.power`](#Game.power)).

{% api_method PowerCreep.create 'name, className' 1 %}

```javascript
PowerCreep.create('PowerCreep1', POWER_CLASS.OPERATOR);
```

A static method to create new Power Creep instance in your account. It will be added in an unspawned state, 
use [`spawn`](#PowerCreep.spawn) method to spawn it in the world.

You need one free Power Level in your account to perform this action.

{% api_method_params %}
name : string
The name of the new power creep.
===
className : string
The class of the new power creep, one of the `POWER_CLASS` constants.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_ENOUGH_RESOURCES | You don't have free Power Levels in your account.
ERR_NAME_EXISTS | A power creep with the specified name already exists.
{% endapi_return_codes %} 

{% page inherited/RoomObject.md %}


{% api_property carry object %}

```javascript
const total = _.sum(creep.carry);
```

An object with the creep's cargo contents. Each object key is one of the <code>RESOURCE_*</code> constants, values are resources amounts. <code>RESOURCE_ENERGY</code> is always defined and equals to 0 when empty, other resources are undefined when empty. You can use <a href="https://github.com/lodash/lodash/blob/3.10.1/doc/README.md#_sumcollection-iteratee-thisarg"><code>lodash.sum</code></a> to get the total amount of contents:



{% api_property carryCapacity number %}
The total amount of resources the creep can carry.

{% api_property className string %}
The power creep's class, one of the `POWER_CLASS` constants.

{% api_property deleteTime number %}
A timestamp when this creep is marked to be permanently deleted from the account, or undefined otherwise.

{% api_property hits number %}
The current amount of hit points of the creep.

{% api_property hitsMax number %}
The maximum amount of hit points of the creep.

{% api_property id string %}
A unique object identificator. You can use <a href="#Game.getObjectById"><code>Game.getObjectById</code></a> method to retrieve an object instance by its <code>id</code>.

{% api_property level number %}
The power creep's level.

{% api_property memory any %}

```javascript
creep.memory.task = 'building';
```

A shorthand to <code>Memory.powerCreeps[creep.name]</code>. You can use it for quick access the creep’s specific memory data object. <a href="/global-objects.html#Memory-object">Learn more about memory</a>



{% api_property my boolean %}
Whether it is your creep or foe.



{% api_property name string %}
Power creep’s name. You can choose the name while creating a new power creep, and it cannot be changed later. This name is a hash key to access the creep via the <a href="#Game.powerCreeps">Game.powerCreeps</a> object.



{% api_property owner object %}
An object with the creep’s owner info containing the following properties:

{% api_method_params %}
username : string
The name of the owner user.
{% endapi_method_params %}

{% api_property powers object %}
Available powers, an object with power ID as a key, and the following properties:

{% api_method_params %}
level : number
Current level of the power.
===
cooldown : number
Cooldown ticks remaining, or undefined if the power creep is not spawned in the world.
{% endapi_method_params %}


{% api_property saying string %}
The text message that the creep was saying at the last tick.

{% api_property shard string %}
The name of the shard where the power creep is spawned, or undefined.

{% api_property spawnCooldownTime number %}
```javascript
if(!(Game.powerCreeps['PowerCreep1'].spawnCooldownTime > Date.now())) {
    Game.powerCreeps['PowerCreep1'].spawn(powerSpawn);
}
```
The timestamp when spawning or deleting this creep will become available. 
Undefined if the power creep is spawned in the world.

{% api_property ticksToLive number %}
The remaining amount of game ticks after which the creep will die and become unspawned. When a power creep
dies of old age, its spawn cooldown is not activated, you can respawn it immediately. Undefined is the creep
is not spawned in the world. 



{% api_method cancelOrder 'methodName' 0 %}

```javascript
creep.move(LEFT);
creep.cancelOrder('move');
//The creep will not move in this game tick
```

Cancel the order given during the current game tick.

{% api_method_params %}
methodName : string
The name of a creep's method to be cancelled.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been cancelled successfully.
ERR_NOT_OWNER | You are not the owner of the creep.
ERR_BUSY | The power creep is not spawned in the world.
ERR_NOT_FOUND | The order with the specified name is not found.
{% endapi_return_codes %}


{% api_method delete '[cancel]' A %}

```javascript
Game.powerCreeps['PowerCreep1'].delete();
```

Delete the power creep permanently from your account. It should NOT be spawned in the world. The creep is not deleted
immediately, but a 24-hours delete timer is started instead (see [`deleteTime`](#PowerCreep.deleteTime)). You can cancel deletion by calling `delete(true)`.

{% api_method_params %}
cancel : boolean
Set this to true to cancel previously scheduled deletion.
{% endapi_method_params %} 

### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of the creep.
ERR_BUSY | The power creep is spawned in the world.
{% endapi_return_codes %}


{% api_method drop 'resourceType, [amount]' A %}

```javascript
creep.drop(RESOURCE_ENERGY);
```

```javascript
// drop all resources
for(const resourceType in creep.carry) {
	creep.drop(resourceType);
}
```

Drop this resource on the ground.

{% api_method_params %}
resourceType : string
One of the <code>RESOURCE_*</code> constants.
===
amount (optional) : number
The amount of resource units to be dropped. If omitted, all the available carried amount is used.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this creep.
ERR_BUSY | The power creep is not spawned in the world.
ERR_INVALID_ARGS | The resourceType is not a valid <code>RESOURCE_*</code> constants.
ERR_NOT_ENOUGH_RESOURCES | The creep does not have the given amount of energy.
{% endapi_return_codes %}



```javascript
Game.powerCreeps['PowerCreep1'].usePower(PWR_GENERATE_OPS);
```


{% api_method enableRoom 'controller' A %}

```javascript
powerCreep.enableRoom(powerCreep.room.controller);
```

Enable powers usage in this room. The room controller should be at adjacent tile.

{% api_method_params %}
controller : <a href="#StructureController">StructureController</a>
The room controller.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this creep.
ERR_INVALID_TARGET | The target is not a controller structure.
ERR_NOT_IN_RANGE | The target is too far away.
{% endapi_return_codes %}


{% api_method move 'direction' A %}

```javascript
creep.move(RIGHT);
```

```javascript
const path = creep.pos.findPathTo(Game.flags.Flag1);
if(path.length > 0) {
	creep.move(path[0].direction);
}
```

```javascript
creep1.move(TOP);
creep1.pull(creep2);
creep2.move(creep1);
```

Move the creep one square in the specified direction.  

{% api_method_params %}
direction : <a href="#Creep">Creep</a>|number
A creep nearby, or one of the following constants:
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


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this creep.
ERR_BUSY | The power creep is not spawned in the world.
ERR_TIRED | The fatigue indicator of the creep is non-zero.
ERR_INVALID_ARGS | The provided direction is incorrect.
ERR_NOT_IN_RANGE | The target creep is too far away
{% endapi_return_codes %}



{% api_method moveByPath 'path' A %}

```javascript
const path = spawn.room.findPath(spawn, source);
creep.moveByPath(path);
```

```javascript
if(!creep.memory.path) {
    creep.memory.path = creep.pos.findPathTo(target);
}
creep.moveByPath(creep.memory.path);
```

Move the creep using the specified predefined path. 

{% api_method_params %}
path : array|string
A path value as returned from <a href="#Room.findPath"><code>Room.findPath</code></a>, <a href="#RoomPosition.findPathTo"><code>RoomPosition.findPathTo</code></a>, or <a href="#PathFinder.PathFinder-search"><code>PathFinder.search</code></a> methods. Both array form and serialized string form are accepted.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this creep.
ERR_BUSY | The power creep is not spawned in the world.
ERR_NOT_FOUND | The specified path doesn't match the creep's location.
ERR_INVALID_ARGS | <code>path</code> is not a valid path array.
ERR_TIRED | The fatigue indicator of the creep is non-zero.
{% endapi_return_codes %}



{% api_method moveTo 'x, y, [opts]|target, [opts]' 3 %}

```javascript
creep.moveTo(10, 20);
```

```javascript
creep.moveTo(Game.flags.Flag1);
```

```javascript
creep.moveTo(new RoomPosition(25, 20, 'W10N5'));
```

```javascript
creep.moveTo(pos, {reusePath: 50});
```

```javascript
// Execute moves by cached paths at first
for(const name in Game.creeps) {
    Game.creeps[name].moveTo(target, {noPathFinding: true});
}

// Perform pathfinding only if we have enough CPU
if(Game.cpu.tickLimit - Game.cpu.getUsed() > 20) {
    for(const name in Game.creeps) {
        Game.creeps[name].moveTo(target);
    }
}
```

Find the optimal path to the target within the same room and move to it. A shorthand to consequent calls of <a href="#RoomPosition.findPathTo">pos.findPathTo()</a> and <a href="#Creep.move">move()</a> methods. If the target is in another room, then the corresponding exit will be used as a target. 

{% api_method_params %}
x : number
X position of the target in the same room.
===
y : number
Y position of the target in the same room.
===
target : object
Can be a <a href="#RoomPosition">RoomPosition</a> object or any object containing <a href="#RoomPosition">RoomPosition</a>. The position doesn't have to be in the same room with the creep.
===
opts (optional) : object
An object containing additional options:
					<ul>
						<li>
							<div class="api-arg-title">reusePath</div>
							<div class="api-arg-type">number</div>
							<div class="api-arg-desc">This option enables reusing the path found along multiple game ticks. It allows to save CPU time, but can result in a slightly slower creep reaction behavior. The path is stored into the creep's memory to the <code>_move</code> property. The <code>reusePath</code> value defines the amount of ticks which the path should be reused for. The default value is 5. Increase the amount to save more CPU, decrease to make the movement more consistent. Set to 0 if you want to disable path reusing.</div>
						</li>
						<li>
							<div class="api-arg-title">serializeMemory</div>
							<div class="api-arg-type">boolean</div>
							<div class="api-arg-desc">If <code>reusePath</code> is enabled and this option is set to true, the path will be stored in memory in the short serialized form using <a href="#Room.serializePath"><code>Room.serializePath</code></a>. The default value is true.</div>
						</li>
						<li>
							<div class="api-arg-title">noPathFinding</div>
							<div class="api-arg-type">boolean</div>
							<div class="api-arg-desc">If this option is set to true, <code>moveTo</code> method will return <code>ERR_NOT_FOUND</code> if there is no memorized path to reuse. This can significantly save CPU time in some cases. The default value is false.</div>
						</li>
						<li>
							<div class="api-arg-title">visualizePathStyle</div>
							<div class="api-arg-type">object</div>
							<div class="api-arg-desc">Draw a line along the creep’s path using <a href="#RoomVisual.poly"><code>RoomVisual.poly</code></a>. You can provide either an empty object or custom style parameters. The default style is equivalent to:
								<pre class="language-javascript"><code>{
    fill: 'transparent',
    stroke: '#fff',
    lineStyle: 'dashed',
    strokeWidth: .15,
    opacity: .1
}</code></pre>
							</div>
						</li>
						<li>Any options supported by <a href="#Room.findPath"><code>Room.findPath</code></a> method.</li>
					</ul>

{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this creep.
ERR_BUSY | The power creep is not spawned in the world.
ERR_TIRED | The fatigue indicator of the creep is non-zero.
ERR_INVALID_TARGET | The target provided is invalid.
ERR_NO_PATH | No path to the target could be found.
ERR_NOT_FOUND | The creep has no memorized path to reuse.
{% endapi_return_codes %}



{% api_method notifyWhenAttacked 'enabled' A %}

```javascript
Game.powerCreeps['PC1'].notifyWhenAttacked(true);
```

Toggle auto notification when the creep is under attack. The notification will be sent to your account email. Turned on by default.

{% api_method_params %}
enabled : boolean
Whether to enable notification or disable.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this creep.
ERR_BUSY | The power creep is not spawned in the world.
ERR_INVALID_ARGS | <code>enable</code> argument is not a boolean value.
{% endapi_return_codes %}


{% api_method pickup 'target' A %}

```javascript
const target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
if(target) {
    if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
    }
}

```

Pick up an item (a dropped piece of energy). The target has to be at adjacent square to the creep or at the same square.

{% api_method_params %}
target : <a href="#Resource">Resource</a>
The target object to be picked up.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this creep.
ERR_BUSY | The power creep is not spawned in the world.
ERR_INVALID_TARGET | The target is not a valid object to pick up.
ERR_FULL | The creep cannot receive any more resource.
ERR_NOT_IN_RANGE | The target is too far away.
{% endapi_return_codes %}




{% api_method rename 'name' 0 %}

```javascript
Game.powerCreeps['PC1'].rename('PC1X');
```

Rename the power creep. It must not be spawned in the world.

{% api_method_params %}
name : string
The new name of the power creep.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of the creep.
ERR_BUSY | The power creep is spawned in the world.
ERR_NAME_EXISTS | A power creep with the specified name already exists.
{% endapi_return_codes %}



{% api_method renew 'target' A %}

```javascript
let powerBank = Game.getObjectById('XXX');
Game.powerCreeps['PowerCreep1'].renew(powerBank);

```

Instantly restore time to live to the maximum using a Power Spawn or a Power Bank nearby. It has to be at adjacent tile. 

{% api_method_params %}
target : <a href="#StructurePowerBank">StructurePowerBank</a> | <a href="#StructurePowerSpawn">StructurePowerSpawn</a>
The target structure.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this creep.
ERR_BUSY | The power creep is not spawned in the world.
ERR_INVALID_TARGET | The target is not a valid power bank object.
ERR_NOT_IN_RANGE | The target is too far away.
{% endapi_return_codes %}



{% api_method say 'message, [public]' 0 %}

```javascript
const hostiles = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 10);
if(hostiles.length > 0) {
    creep.say('OMG!😨');
    creep.moveTo(Game.spawns['Spawn1']);
}
else {
    doWork(creep);
}
```

Display a visual speech balloon above the creep with the specified message. The message will be available for one tick. You can read the last message using the <code>saying</code> property. Any valid Unicode characters are allowed, including <a href="http://unicode.org/emoji/charts/emoji-style.txt" target="_blank">emoji</a>.

{% api_method_params %}
message : string
The message to be displayed. Maximum length is 10 characters.
===
public (optional) : boolean
Set to true to allow other players to see this message. Default is false.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this creep.
ERR_BUSY | The power creep is not spawned in the world.
{% endapi_return_codes %}



{% api_method spawn 'powerSpawn' A %}

```javascript
Game.powerCreeps['PowerCreep1'].spawn(Game.getObjectById('XXX'));
```

Spawn this power creep in the specified Power Spawn.

{% api_method_params %}
powerSpawn : <a href="#StructurePowerSpawn">StructurePowerSpawn</a>
Your Power Spawn structure.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of the creep or the spawn.
ERR_BUSY | The power creep is already spawned in the world.
ERR_RCL_NOT_ENOUGH | Room Controller Level insufficient to use the spawn.
ERR_INVALID_TARGET | The specified object is not a Power Spawn.
ERR_TIRED | The power creep cannot be spawned because of the cooldown.
{% endapi_return_codes %}



{% api_method suicide '' A %}



Kill the power creep immediately. It will not be destroyed permanently, but will become unspawned,
so that you can [`spawn`](#PowerCreep.spawn) it again.



### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this creep.
ERR_BUSY | The power creep is not spawned in the world.
{% endapi_return_codes %}



{% api_method transfer 'target, resourceType, [amount]' A %}

```javascript
if(creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	creep.moveTo(storage);
}
```

```javascript
// transfer all resources
for(const resourceType in creep.carry) {
	creep.transfer(storage, resourceType);
}
```

Transfer resource from the creep to another object. The target has to be at adjacent square to the creep.

{% api_method_params %}
target : <a href="#Creep">Creep</a>, <a href="#Structure">Structure</a>
The target object.
===
resourceType : string
One of the <code>RESOURCE_*</code> constants.
===
amount (optional) : number
The amount of resources to be transferred. If omitted, all the available carried amount is used.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this creep.
ERR_BUSY | The power creep is not spawned in the world.
ERR_NOT_ENOUGH_RESOURCES | The creep does not have the given amount of resources.
ERR_INVALID_TARGET | The target is not a valid object which can contain the specified resource.
ERR_FULL | The target cannot receive any more resources.
ERR_NOT_IN_RANGE | The target is too far away.
ERR_INVALID_ARGS | The resourceType is not one of the <code>RESOURCE_*</code> constants, or the amount is incorrect.
{% endapi_return_codes %}



{% api_method upgrade 'power' A %}

```javascript
Game.powerCreeps['PowerCreep1'].upgrade(PWR_GENERATE_OPS);
```

Upgrade the creep, adding a new power ability to it or increasing level of the existing power. 
You need one free Power Level in your account to perform this action. 

{% api_method_params %}
power : number
The power ability to upgrade, one of the `PWR_*` constants.
{% endapi_method_params %}

### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of the creep.
ERR_NOT_ENOUGH_RESOURCES | You account Power Level is not enough.
ERR_FULL | The specified power cannot be upgraded on this creep's level, or the creep reached the maximum level.
ERR_INVALID_ARGS | The specified power ID is not valid.
{% endapi_return_codes %}


{% api_method usePower 'power, [target]' A %}

```javascript
Game.powerCreeps['PowerCreep1'].usePower(PWR_GENERATE_OPS);
```

```javascript
Game.powerCreeps['PowerCreep1'].usePower(PWR_OPERATE_SPAWN, Game.spawns['Spawn1']);
```

Apply one the creep's powers on the specified target. 

{% api_method_params %}
power : number
The power ability to use, one of the `PWR_*` constants.
===
target : <a href="#RoomObject">RoomObject</a> | <a href="#RoomPosition">RoomPosition</a>
A target object in the room. 
{% endapi_method_params %}

### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of the creep.
ERR_BUSY | The creep is not spawned in the world.
ERR_NO_BODYPART | The creep doesn't have the specified power ability.
ERR_TIRED | The power ability is still on cooldown.
ERR_NOT_ENOUGH_RESOURCES | The creep doesn't have enough resources to use the power.
ERR_INVALID_TARGET | The specified target is not valid.
ERR_NOT_IN_RANGE | The specified target is too far away.
ERR_INVALID_ARGS | Using powers is not enabled on the Room Controller.
ERR_FULL | The target has the same active effect of a higher level.  
{% endapi_return_codes %}

{% api_method withdraw 'target, resourceType, [amount]' A %}

```javascript
if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	creep.moveTo(storage);
}
```

Withdraw resources from a structure or tombstone. The target has to be at adjacent square to the creep. Multiple creeps can withdraw from the same object in the same tick. Your creeps can withdraw resources from hostile structures/tombstones as well, in case if there is no hostile rampart on top of it.

This method should not be used to transfer resources between creeps. To transfer between creeps, use the [`transfer`](#Creep.transfer) method on the original creep.

{% api_method_params %}
target : <a href="#Structure">Structure</a>, <a href="#Tombstone">Tombstone</a>
The target object.
===
resourceType : string
One of the <code>RESOURCE_*</code> constants.
===
amount (optional) : number
The amount of resources to be transferred. If omitted, all the available amount is used.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this creep, or there is a hostile rampart on top of the target.
ERR_BUSY | The power creep is not spawned in the world.
ERR_NOT_ENOUGH_RESOURCES | The target does not have the given amount of resources.
ERR_INVALID_TARGET | The target is not a valid object which can contain the specified resource.
ERR_FULL | The creep's carry is full.
ERR_NOT_IN_RANGE | The target is too far away.
ERR_INVALID_ARGS | The resourceType is not one of the <code>RESOURCE_*</code> constants, or the amount is incorrect.
{% endapi_return_codes %}



