# Creep  


Creeps are your units. Creeps can move, harvest energy, construct structures, attack another creeps, and perform other actions. Each creep consists of up to 50 body parts with the following possible types:
![](img/bodyparts.png)   

<table class="table gameplay-info">
    <tbody>
    <tr>
        <th style="width: 20%;">Body part</th>
        <th style="width: 8%;">Build cost</th>
        <th>Effect per one body part</th>
    </tr>
    <tr>
        <td><code style="background: #333; color: #a9b7c6;">MOVE</code></td>
        <td>50</td>
        <td>Decreases fatigue by 2 points per tick.</td>
    </tr>
    <tr>
        <td><code style="background: #333; color: #ffe56d;">WORK</code></td>
        <td>100</td>
        <td>
            <p>Harvests 2 energy units from a source per tick.</p>
            <p>Harvests 1 resource unit from a mineral or a deposit per tick.</p>
            <p>Builds a structure for 5 energy units per tick.</p>
            <p>Repairs a structure for 100 hits per tick consuming 1 energy unit per tick.</p>
            <p>Dismantles a structure for 50 hits per tick returning 0.25 energy unit per tick.</p>
            <p>Upgrades a controller for 1 energy unit per tick.</p>
        </td>
    </tr>
    <tr>
        <td><code style="background: #333; color: #777;">CARRY</code></td>
        <td>50</td>
        <td>Can contain up to 50 resource units.</td>
    </tr>
    <tr>
        <td><code style="background: #333; color: #f93842;">ATTACK</code></td>
        <td>80</td>
        <td>Attacks another creep/structure with 30 hits per tick in a short-ranged attack.</td>
    </tr>
    <tr>
        <td><code style="background: #333; color: #5d80b2;">RANGED_ATTACK</code></td>
        <td>150</td>
        <td>
            <p>Attacks another single creep/structure with 10 hits per tick in a long-range attack up to 3 squares long.</p>
            <p>Attacks all hostile creeps/structures within 3 squares range with 1-4-10 hits (depending on the range).</p>
        </td>
    </tr>
    <tr>
        <td><code style="background: #333; color: #65fd62;">HEAL</code></td>
        <td>250</td>
        <td>Heals self or another creep restoring 12 hits per tick in short range or 4 hits per tick at a distance.</td>
    </tr>
    <tr>
        <td><code style="background: #333; color: #b99cfb;">CLAIM</code></td>
        <td>600</td>
        <td>
            <p>Claims a neutral room controller.</p>
            <p>Reserves a neutral room controller for 1 tick per body part.</p>
            <p>Attacks a hostile room controller downgrading its timer by 300 ticks per body parts.</p>
            <p>Attacks a neutral room controller reservation timer by 1 tick per body parts.</p>
            <p>A creep with this body part will have a reduced life time of 600 ticks and cannot be renewed.</p>
        </td>
    </tr>
    <tr>
        <td><code style="background: #333; color: #fff;">TOUGH</code></td>
        <td>10</td>
        <td>No effect, just additional hit points to the creep's body. Can be boosted to resist damage.</td>
    </tr>
    </tbody>
</table>

{% page inherited/RoomObject.md %}


{% api_property body array %}



An array describing the creep’s body. Each element contains the following properties:

{% api_method_params %}
boost : string | undefined
If the body part is boosted, this property specifies the mineral type which is used for boosting. One of the <code>RESOURCE_*</code> constants. <a href="/resources.html">Learn more</a>
===
type : string
One of the body part types constants.
===
hits : number
The remaining amount of hit points of this body part.
{% endapi_method_params %}


{% api_property carry object '{"deprecated": true}' %}

An alias for [`Creep.store`](#Creep.store). 


{% api_property carryCapacity number '{"deprecated": true}' %}

An alias for [`Creep.store.getCapacity()`](#Store.getCapacity).


{% api_property fatigue number %}



The movement fatigue indicator. If it is greater than zero, the creep cannot move.



{% api_property hits number %}



The current amount of hit points of the creep.



{% api_property hitsMax number %}



The maximum amount of hit points of the creep.



{% api_property id string %}



A unique object identificator. You can use <a href="#Game.getObjectById"><code>Game.getObjectById</code></a> method to retrieve an object instance by its <code>id</code>.



{% api_property memory any %}

```javascript
creep.memory.task = 'building';
```

A shorthand to <code>Memory.creeps[creep.name]</code>. You can use it for quick access the creep’s specific memory data object. <a href="/global-objects.html#Memory-object">Learn more about memory</a>



{% api_property my boolean %}



Whether it is your creep or foe.



{% api_property name string %}



Creep’s name. You can choose the name while creating a new creep, and it cannot be changed later. This name is a hash key to access the creep via the <a href="#Game.creeps">Game.creeps</a> object.



{% api_property owner object %}



An object with the creep’s owner info containing the following properties:

{% api_method_params %}
username : string
The name of the owner user.
{% endapi_method_params %}


{% api_property saying string %}



The text message that the creep was saying at the last tick.



{% api_property spawning boolean %}



Whether this creep is still being spawned.

{% api_property store '<a href="#Store">Store</a>' %}

```javascript
if(creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()) {
    goHarvest(creep);
}
```

A [`Store`](#Store) object that contains cargo of this creep.


{% api_property ticksToLive number %}



The remaining amount of game ticks after which the creep will die.



{% api_method attack 'target' A %}

```javascript
const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
if(target) {
    if(creep.attack(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
    }
}

```

Attack another creep, power creep, or structure in a short-ranged attack. Requires the <code>ATTACK</code> body part. If the target is inside a rampart, then the rampart is attacked instead. The target has to be at adjacent square to the creep. If the target is a creep with <code>ATTACK</code> body parts and is not inside a rampart, it will automatically hit back at the attacker.

{% api_method_params %}
target : <a href="#Creep">Creep</a>, <a href="#PowerCreep">PowerCreep</a>, <a href="#Structure">Structure</a>
The target object to be attacked.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this creep.
ERR_BUSY | The creep is still being spawned.
ERR_INVALID_TARGET | The target is not a valid attackable object.
ERR_NOT_IN_RANGE | The target is too far away.
ERR_NO_BODYPART | There are no <code>ATTACK</code> body parts in this creep’s body.
{% endapi_return_codes %}



{% api_method attackController 'target' A %}

```javascript
if(creep.room.controller && !creep.room.controller.my) {
    if(creep.attackController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
    }
}

```

Decreases the controller's downgrade timer by 300 ticks per every <code>CLAIM</code> body part, or reservation timer by 1 tick per every <code>CLAIM</code> body part. If the controller under attack is owned, it cannot be upgraded or attacked again for the next 1,000 ticks. The target has to be at adjacent square to the creep.

{% api_method_params %}
target : <a href="#StructureController">StructureController</a>
The target controller object.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this creep.
ERR_BUSY | The creep is still being spawned.
ERR_INVALID_TARGET | The target is not a valid owned or reserved controller object.
ERR_NOT_IN_RANGE | The target is too far away.
ERR_NO_BODYPART | There are not enough <code>CLAIM</code> body parts in this creep’s body.
ERR_TIRED | You have to wait until the next attack is possible.
{% endapi_return_codes %}



{% api_method build 'target' A %}

```javascript
const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
if(target) {
    if(creep.build(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
    }
}

```

Build a structure at the target construction site using carried energy. Requires <code>WORK</code> and <code>CARRY</code> body parts. The target has to be within 3 squares range of the creep.

{% api_method_params %}
target : <a href="#ConstructionSite">ConstructionSite</a>
The target construction site to be built.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this creep.
ERR_BUSY | The creep is still being spawned.
ERR_NOT_ENOUGH_RESOURCES | The creep does not have any carried energy.
ERR_INVALID_TARGET | The target is not a valid construction site object or the structure cannot be built here (probably because of a creep at the same square).
ERR_NOT_IN_RANGE | The target is too far away.
ERR_NO_BODYPART | There are no <code>WORK</code> body parts in this creep’s body.
{% endapi_return_codes %}



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
ERR_NOT_FOUND | The order with the specified name is not found.
{% endapi_return_codes %}



{% api_method claimController 'target' A %}

```javascript
if(creep.room.controller) {
    if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
    }
}

```

Claims a neutral controller under your control. Requires the <code>CLAIM</code> body part. The target has to be at adjacent square to the creep. You need to have the corresponding Global Control Level in order to claim a new room. If you don't have enough GCL, consider <a href="#reserveController">reserving</a> this room instead. <a href="/control.html#Global-Control-Level">Learn more</a>

{% api_method_params %}
target : <a href="#StructureController">StructureController</a>
The target controller object.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this creep.
ERR_BUSY | The creep is still being spawned.
ERR_INVALID_TARGET | The target is not a valid neutral controller object.
ERR_FULL | You cannot claim more than 3 rooms in the Novice Area.
ERR_NOT_IN_RANGE | The target is too far away.
ERR_NO_BODYPART | There are no <code>CLAIM</code> body parts in this creep’s body.
ERR_GCL_NOT_ENOUGH | Your Global Control Level is not enough.
{% endapi_return_codes %}



{% api_method dismantle 'target' A %}

```javascript
const target = creep.pos.findClosestByRange(FIND_STRUCTURES,
	{filter: {structureType: STRUCTURE_WALL}});
if(target) {
    if(creep.dismantle(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
    }
}

```

Dismantles any structure that can be constructed (even hostile) returning 50% of the energy spent on its repair. Requires the <code>WORK</code> body part. If the creep has an empty <code>CARRY</code> body part, the energy is put into it; otherwise it is dropped on the ground. The target has to be at adjacent square to the creep.

{% api_method_params %}
target : <a href="#Structure">Structure</a>
The target structure.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this creep.
ERR_BUSY | The creep is still being spawned.
ERR_INVALID_TARGET | The target is not a valid structure object.
ERR_NOT_IN_RANGE | The target is too far away.
ERR_NO_BODYPART | There are no <code>WORK</code> body parts in this creep’s body.
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
ERR_BUSY | The creep is still being spawned.
ERR_INVALID_ARGS | The resourceType is not a valid <code>RESOURCE_*</code> constants.
ERR_NOT_ENOUGH_RESOURCES | The creep does not have the given amount of resources.
{% endapi_return_codes %}



{% api_method generateSafeMode 'controller' A %}

```javascript
if(creep.generateSafeMode(creep.room.controller) == ERR_NOT_IN_RANGE) {
    creep.moveTo(creep.room.controller);
}

```

Add one more available safe mode activation to a room controller. The creep has to be at adjacent square to the target room controller and have 1000 ghodium resource.

{% api_method_params %}
target : <a href="#StructureController">StructureController</a>
The target room controller.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this creep.
ERR_BUSY | The creep is still being spawned.
ERR_NOT_ENOUGH_RESOURCES | The creep does not have enough ghodium.
ERR_INVALID_TARGET | The target is not a valid controller object.
ERR_NOT_IN_RANGE | The target is too far away.
{% endapi_return_codes %}



{% api_method getActiveBodyparts 'type' 0 %}

```javascript
const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
    filter: function(object) {
        return object.getActiveBodyparts(ATTACK) == 0;
    }
});
if(target) {
    creep.moveTo(target);
}
```

Get the quantity of live body parts of the given type. Fully damaged parts do not count.

{% api_method_params %}
type : string
A body part type, one of the following body part constants:
					<ul>
						<li><code>MOVE</code></li>
						<li><code>WORK</code></li>
						<li><code>CARRY</code></li>
						<li><code>ATTACK</code></li>
						<li><code>RANGED_ATTACK</code></li>
						<li><code>HEAL</code></li>
						<li><code>TOUGH</code></li>
					</ul>

{% endapi_method_params %}


### Return value

A number representing the quantity of body parts.

{% api_method harvest 'target' A %}

```javascript
const target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
if(target) {
    if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
    }
}

```

Harvest energy from the source or resources from minerals and deposits. Requires the <code>WORK</code> body part. If the creep has an empty <code>CARRY</code> body part, the harvested resource is put into it; otherwise it is dropped on the ground. The target has to be at an adjacent square to the creep.

{% api_method_params %}
target : <a href="#Source">Source</a>, <a href="#Mineral">Mineral</a>, <a href="#Deposit">Deposit</a>
The object to be harvested.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this creep, or the room controller is owned or reserved by another player.
ERR_BUSY | The creep is still being spawned.
ERR_NOT_FOUND | Extractor not found. You must build an extractor structure to harvest minerals. <a href="/resources.html">Learn more</a>
ERR_NOT_ENOUGH_RESOURCES | The target does not contain any harvestable energy or mineral.
ERR_INVALID_TARGET | The target is not a valid source or mineral object.
ERR_NOT_IN_RANGE | The target is too far away.
ERR_TIRED | The extractor or the deposit is still cooling down.
ERR_NO_BODYPART | There are no <code>WORK</code> body parts in this creep’s body.
{% endapi_return_codes %}



{% api_method heal 'target' A %}

```javascript
const target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
    filter: function(object) {
        return object.hits < object.hitsMax;
    }
});
if(target) {
    if(creep.heal(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
    }
}

```

Heal self or another creep. It will restore the target creep’s damaged body parts function and increase the hits counter. Requires the <code>HEAL</code> body part. The target has to be at adjacent square to the creep.

{% api_method_params %}
target : <a href="#Creep">Creep</a>, <a href="#PowerCreep">PowerCreep</a>
The target creep object.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this creep.
ERR_BUSY | The creep is still being spawned.
ERR_INVALID_TARGET | The target is not a valid creep object.
ERR_NOT_IN_RANGE | The target is too far away.
ERR_NO_BODYPART | There are no <code>HEAL</code> body parts in this creep’s body.
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

Move the creep one square in the specified direction. Requires the <code>MOVE</code> body part, or another creep nearby <a href="#Creep.pull">pulling</a> the creep. In case if you call <code>move</code> on a creep nearby, the <code>ERR_TIRED</code> and the <code>ERR_NO_BODYPART</code> checks will be bypassed; otherwise, the <code>ERR_NOT_IN_RANGE</code> check will be bypassed. 

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
ERR_BUSY | The creep is still being spawned.
ERR_TIRED | The fatigue indicator of the creep is non-zero.
ERR_NO_BODYPART | There are no MOVE body parts in this creep’s body.
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

Move the creep using the specified predefined path. Requires the <code>MOVE</code> body part.

{% api_method_params %}
path : array|string
A path value as returned from <a href="#Room.findPath"><code>Room.findPath</code></a>, <a href="#RoomPosition.findPathTo"><code>RoomPosition.findPathTo</code></a>, or <a href="#PathFinder.search"><code>PathFinder.search</code></a> methods. Both array form and serialized string form are accepted.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this creep.
ERR_BUSY | The creep is still being spawned.
ERR_NOT_FOUND | The specified path doesn't match the creep's location.
ERR_INVALID_ARGS | <code>path</code> is not a valid path array.
ERR_TIRED | The fatigue indicator of the creep is non-zero.
ERR_NO_BODYPART | There are no <code>MOVE</code> body parts in this creep’s body.
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

Find the optimal path to the target within the same room and move to it. A shorthand to consequent calls of <a href="#RoomPosition.findPathTo">pos.findPathTo()</a> and <a href="#Creep.move">move()</a> methods. If the target is in another room, then the corresponding exit will be used as a target. Requires the <code>MOVE</code> body part.

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
ERR_BUSY | The creep is still being spawned.
ERR_TIRED | The fatigue indicator of the creep is non-zero.
ERR_NO_BODYPART | There are no MOVE body parts in this creep’s body.
ERR_INVALID_TARGET | The target provided is invalid.
ERR_NO_PATH | No path to the target could be found.
ERR_NOT_FOUND | The creep has no memorized path to reuse.
{% endapi_return_codes %}



{% api_method notifyWhenAttacked 'enabled' A %}

```javascript
if(creep.memory.role == 'scout') {
	creep.notifyWhenAttacked(false);
}
else {
	creep.notifyWhenAttacked(true);
}
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
ERR_BUSY | The creep is still being spawned.
ERR_INVALID_ARGS | <code>enable</code> argument is not a boolean value.
{% endapi_return_codes %}



{% api_method pickup 'target' A %}

```javascript
const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
if(target) {
    if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
    }
}

```

Pick up an item (a dropped piece of energy). Requires the <code>CARRY</code> body part. The target has to be at adjacent square to the creep or at the same square.

{% api_method_params %}
target : <a href="#Resource">Resource</a>
The target object to be picked up.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this creep.
ERR_BUSY | The creep is still being spawned.
ERR_INVALID_TARGET | The target is not a valid object to pick up.
ERR_FULL | The creep cannot receive any more resource.
ERR_NOT_IN_RANGE | The target is too far away.
{% endapi_return_codes %}



{% api_method pull 'target' 0 %}

```javascript
creep1.move(TOP);
creep1.pull(creep2);
creep2.move(creep1);
```

```javascript
const target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
    filter: function(object) {
        return (object.getActiveBodyparts(MOVE) == 0) && 
            object.memory.destinationId &&
            !object.pos.isNearTo(Game.getObjectById(object.memory.destinationId));
    }
});
if(target) {
    if(creep.pull(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
    } else {
        target.move(creep);
        if(creep.pos.isNearTo(Game.getObjectById(target.memory.destinationId))) {
            creep.move(creep.pos.getDirectionTo(target));
        } else {
            creep.moveTo(Game.getObjectById(target.memory.destinationId));
        }
    }
}
```

Help another creep to follow this creep. The fatigue generated for the target's move will be added to the creep instead of the target. Requires the <code>MOVE</code> body part. The target has to be at adjacent square to the creep. The creep must <a href="#Creep.move">move</a> elsewhere, and the target must <a href="#Creep.move">move</a> towards the creep.

{% api_method_params %}
target : <a href="#Creep">Creep</a>
The target creep.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this creep.
ERR_BUSY | The creep is still being spawned.
ERR_INVALID_TARGET | The target provided is invalid.
ERR_NOT_IN_RANGE | The target is too far away.
{% endapi_return_codes %}



{% api_method rangedAttack 'target' A %}

```javascript
const targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
if(targets.length > 0) {
    creep.rangedAttack(targets[0]);
}

```

A ranged attack against another creep or structure. Requires the <code>RANGED_ATTACK</code> body part. If the target is inside a rampart, the rampart is attacked instead. The target has to be within 3 squares range of the creep.

{% api_method_params %}
target : <a href="#Creep">Creep</a>, <a href="#PowerCreep">PowerCreep</a>, <a href="#Structure">Structure</a>
The target object to be attacked.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this creep.
ERR_BUSY | The creep is still being spawned.
ERR_INVALID_TARGET | The target is not a valid attackable object.
ERR_NOT_IN_RANGE | The target is too far away.
ERR_NO_BODYPART | There are no <code>RANGED_ATTACK</code> body parts in this creep’s body.
{% endapi_return_codes %}



{% api_method rangedHeal 'target' A %}

```javascript
const target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
    filter: function(object) {
        return object.hits < object.hitsMax;
    }
});
if(target) {
    creep.moveTo(target);
    if(creep.pos.isNearTo(target)) {
        creep.heal(target);
    }
    else {
        creep.rangedHeal(target);
    }
}
```

Heal another creep at a distance. It will restore the target creep’s damaged body parts function and increase the hits counter. Requires the <code>HEAL</code> body part. The target has to be within 3 squares range of the creep.

{% api_method_params %}
target : <a href="#Creep">Creep</a>, <a href="#PowerCreep">PowerCreep</a>
The target creep object.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this creep.
ERR_BUSY | The creep is still being spawned.
ERR_INVALID_TARGET | The target is not a valid creep object.
ERR_NOT_IN_RANGE | The target is too far away.
ERR_NO_BODYPART | There are no <code>HEAL</code> body parts in this creep’s body.
{% endapi_return_codes %}



{% api_method rangedMassAttack '' A %}

```javascript
const targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
if(targets.length > 0) {
    creep.rangedMassAttack();
}
```

A ranged attack against all hostile creeps or structures within 3 squares range. Requires the <code>RANGED_ATTACK</code> body part. The attack power depends on the range to each target. Friendly units are not affected.



### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this creep.
ERR_BUSY | The creep is still being spawned.
ERR_NO_BODYPART | There are no <code>RANGED_ATTACK</code> body parts in this creep’s body.
{% endapi_return_codes %}



{% api_method repair 'target' A %}

```javascript
const targets = creep.room.find(FIND_STRUCTURES, {
    filter: object => object.hits < object.hitsMax
});

targets.sort((a,b) => a.hits - b.hits);

if(targets.length > 0) {
    if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0]);
    }
}
```

Repair a damaged structure using carried energy. Requires the <code>WORK</code> and <code>CARRY</code> body parts. The target has to be within 3 squares range of the creep.

{% api_method_params %}
target : <a href="#Structure">Structure</a>
The target structure to be repaired.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this creep.
ERR_BUSY | The creep is still being spawned.
ERR_NOT_ENOUGH_RESOURCES | The creep does not carry any energy.
ERR_INVALID_TARGET | The target is not a valid structure object.
ERR_NOT_IN_RANGE | The target is too far away.
ERR_NO_BODYPART | There are no <code>WORK</code> body parts in this creep’s body.
{% endapi_return_codes %}



{% api_method reserveController 'target' A %}

```javascript
if(creep.room.controller) {
    if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
    }
}

```

Temporarily block a neutral controller from claiming by other players and restore energy sources to their full capacity. Each tick, this command increases the counter of the period during which the controller is unavailable by 1 tick per each <code>CLAIM</code> body part. The maximum reservation period to maintain is 5,000 ticks. The target has to be at adjacent square to the creep.

{% api_method_params %}
target : <a href="#StructureController">StructureController</a>
The target controller object to be reserved.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this creep.
ERR_BUSY | The creep is still being spawned.
ERR_INVALID_TARGET | The target is not a valid neutral controller object.
ERR_NOT_IN_RANGE | The target is too far away.
ERR_NO_BODYPART | There are no <code>CLAIM</code> body parts in this creep’s body.
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
ERR_BUSY | The creep is still being spawned.
{% endapi_return_codes %}



{% api_method signController 'target, text' A %}

```javascript
if(creep.room.controller) {
    if(creep.signController(creep.room.controller, "I'm going to claim this room in a few days. I warned ya!") == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
    }
}

```

Sign a controller with an arbitrary text visible to all players. This text will appear in the room UI, in the world map, and can be accessed via the API. You can sign unowned and hostile controllers. The target has to be at adjacent square to the creep. Pass an empty string to remove the sign.

{% api_method_params %}
target : <a href="#StructureController">StructureController</a>
The target controller object to be signed.
===
text : string
The sign text. The string is cut off after 100 characters.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_BUSY | The creep is still being spawned.
ERR_INVALID_TARGET | The target is not a valid controller object.
ERR_NOT_IN_RANGE | The target is too far away.
{% endapi_return_codes %}



{% api_method suicide '' A %}



Kill the creep immediately.



### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this creep.
ERR_BUSY | The creep is still being spawned.
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
target : <a href="#Creep">Creep</a>, <a href="#PowerCreep">PowerCreep</a>, <a href="#Structure">Structure</a>
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
ERR_BUSY | The creep is still being spawned.
ERR_NOT_ENOUGH_RESOURCES | The creep does not have the given amount of resources.
ERR_INVALID_TARGET | The target is not a valid object which can contain the specified resource.
ERR_FULL | The target cannot receive any more resources.
ERR_NOT_IN_RANGE | The target is too far away.
ERR_INVALID_ARGS | The resourceType is not one of the <code>RESOURCE_*</code> constants, or the amount is incorrect.
{% endapi_return_codes %}



{% api_method upgradeController 'target' A %}

```javascript
if(creep.room.controller) {
    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
    }
}

```

Upgrade your controller to the next level using carried energy. Upgrading controllers raises your Global Control Level in parallel. Requires <code>WORK</code> and <code>CARRY</code> body parts. The target has to be within 3 squares range of the creep. 

A fully upgraded level 8 controller can't be upgraded over 15 energy units per tick regardless of creeps abilities. The cumulative effect of all the creeps performing <code>upgradeController</code> in the current tick is taken into account. This limit can be increased by using <a href="/resources.html">ghodium mineral boost</a>.

Upgrading the controller raises its `ticksToDowngrade` timer by 100. The timer must be full in order for controller to be levelled up.

{% api_method_params %}
target : <a href="#StructureController">StructureController</a>
The target controller object to be upgraded.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this creep or the target controller.
ERR_BUSY | The creep is still being spawned.
ERR_NOT_ENOUGH_RESOURCES | The creep does not have any carried energy.
ERR_INVALID_TARGET | The target is not a valid controller object, or the controller upgrading is blocked.
ERR_NOT_IN_RANGE | The target is too far away.
ERR_NO_BODYPART | There are no <code>WORK</code> body parts in this creep’s body.
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
target : <a href="#Structure">Structure</a>, <a href="#Tombstone">Tombstone</a>, <a href="#Ruin">Ruin</a>
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
ERR_BUSY | The creep is still being spawned.
ERR_NOT_ENOUGH_RESOURCES | The target does not have the given amount of resources.
ERR_INVALID_TARGET | The target is not a valid object which can contain the specified resource.
ERR_FULL | The creep's carry is full.
ERR_NOT_IN_RANGE | The target is too far away.
ERR_INVALID_ARGS | The resourceType is not one of the <code>RESOURCE_*</code> constants, or the amount is incorrect.
{% endapi_return_codes %}
