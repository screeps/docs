# Creep  


Creeps are your units. Creeps can move, harvest energy, construct structures, attack another creeps, and perform other actions. Each creep consists of up to 50 body parts with the following possible types:
![](img/bodyparts.png)   

<table class="table gameplay-info">
    <tbody>
    <tr>
        <th style="width: 20%;">身体部件</th>
        <th style="width: 8%;">生产成本</th>
        <th>每个部件效果</th>
    </tr>
    <tr>
        <td><code style="background: #333; color: #a9b7c6;">MOVE</code></td>
        <td>50</td>
        <td>每tick减少2点疲惫值</td>
    </tr>
    <tr>
        <td><code style="background: #333; color: #ffe56d;">WORK</code></td>
        <td>100</td>
        <td>
            <p>每tick从能量源采集2单位能量。</p>
            <p>每tick从矿区采集1单位矿物。</p>
            <p>每tick增加工地建设进度5点，花费5单位能量。</p>
            <p>每tick增加建筑100耐久度，花费1单位能量。</p>
            <p>每tick拆减建筑50点耐久，并返还0.25单位能量。</p>
            <p>每tick提高控制器升级进度1点，花费1单位能量。</p>
        </td>
    </tr>
    <tr>
        <td><code style="background: #333; color: #777;">CARRY</code></td>
        <td>50</td>
        <td>携带最多50单位资源。</td>
    </tr>
    <tr>
        <td><code style="background: #333; color: #f93842;">ATTACK</code></td>
        <td>80</td>
        <td>对相邻的creep或建筑造成30点伤害。</td>
    </tr>
    <tr>
        <td><code style="background: #333; color: #5d80b2;">RANGED_ATTACK</code></td>
        <td>150</td>
        <td>
            <p>单个目标时，每tick对creep或建筑造成10点伤害，范围为3格。</p>
            <p>多个目标时，每tick对范围内所有creep与建筑造成1-4-10点伤害，具体伤害取决于距离，范围为3格。</p>
        </td>
    </tr>
    <tr>
        <td><code style="background: #333; color: #65fd62;">HEAL</code></td>
        <td>250</td>
        <td>治疗对象可为自己或其它creep。自愈或治疗相邻creep时每tick恢复12点耐久，一定距离内远程治疗每tick恢复4点耐久。</td>
    </tr>
    <tr>
        <td><code style="background: #333; color: #b99cfb;">CLAIM</code></td>
        <td>600</td>
        <td>
            <p>占领一个中立房间的控制器。</p>
            <p>每部件每tick使己方对中立房间控制器的预定时间增加1tick，或使其他玩家的预定时间减少1tick。</p>
            <p>每部件每tick使其他玩家控制器降级计数器加速300ticks。</p>
            <p>注：拥有该部件的creep寿命只有600ticks，且无法被renew。</p>
        </td>
    </tr>
    <tr>
        <td><code style="background: #333; color: #fff;">TOUGH</code></td>
        <td>10</td>
        <td>无附加效果，唯一作用是增加creep的最大耐久值。可被强化以承受更多伤害。</td>
    </tr>
    </tbody>
</table>

{% page inherited/RoomObject.md %}


{% api_property body array %}



An array describing the creep’s body. Each element contains the following properties:

{% api_method_params %}
boost : string | undefined
If the body part is boosted, this property specifies the mineral type which is used for boosting. <code>RESOURCE_*</code>常量之一。 <a href="/minerals.html">Learn more</a>
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



一个唯一的对象标识。你可以使用<a href="#Game.getObjectById"><code>Game.getObjectById</code></a>方法获取对象实例。



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
拥有者姓名。
{% endapi_method_params %}


{% api_property saying string %}



The text message that the creep was saying at the last tick.



{% api_property spawning boolean %}



Whether this creep is still being spawned.

{% api_property store 'object' %}

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


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个creep的拥有者。
ERR_BUSY | 这个creep依然在孵化中。
ERR_INVALID_TARGET | 这个目标不是一个有效的攻击目标。
ERR_NOT_IN_RANGE | 目标太远了。
ERR_NO_BODYPART | 这个creep身上没有<code>ATTACK</code>部件。
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
target : <a href="#Structure">Structure</a>
目标房间控制器对象。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个creep的拥有者。
ERR_BUSY | 这个creep依然在孵化中。
ERR_INVALID_TARGET | The target is not a valid owned or reserved controller object.
ERR_NOT_IN_RANGE | 目标太远了。
ERR_NO_BODYPART | 这个creep身上没有足够的<code>CLAIM</code>部件。
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
待建造的目标工地。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个creep的拥有者。
ERR_BUSY | 这个creep依然在孵化中。
ERR_NOT_ENOUGH_RESOURCES | 这个creep没有携带任何能量。
ERR_INVALID_TARGET | The target is not a valid construction site object or the structure cannot be built here (probably because of a creep at the same square).
ERR_NOT_IN_RANGE | 目标太远了。
ERR_NO_BODYPART | 这个creep身上没有<code>WORK</code>部件。
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
需要被取消的creep方法名。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作被成功取消了。
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
目标控制中心对象。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个creep的拥有者。
ERR_BUSY | 这个creep依然在孵化中。
ERR_INVALID_TARGET | 目标不是一个有效的中立控制中心对象。
ERR_FULL | 你不能在新手区占领超过3个房间。
ERR_NOT_IN_RANGE | 目标太远了。
ERR_NO_BODYPART | 这个creep身上没有<code>CLAIM</code>部件。
ERR_GCL_NOT_ENOUGH | 你的全局控制等级不足。
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
目标建筑。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个creep的拥有者。
ERR_BUSY | 这个creep依然在孵化中。
ERR_INVALID_TARGET | 目标不是一个有效的建筑对象。
ERR_NOT_IN_RANGE | 目标太远了。
ERR_NO_BODYPART | 这个creep身上没有<code>WORK</code>部件。
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

将资源丢弃到地上。

{% api_method_params %}
resourceType : string
<code>RESOURCE_*</code>常量之一。
===
amount (optional) : number
丢弃资源的数量。如果没有这个参数，丢弃全部资源。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个creep的拥有者。
ERR_BUSY | 这个creep依然在孵化中。
ERR_INVALID_ARGS | resourceType不是一个有效的<code>RESOURCE_*</code>常量。
ERR_NOT_ENOUGH_RESOURCES | 这个creep没有足够的资源。
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
目标控制中心。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个creep的拥有者。
ERR_BUSY | 这个creep依然在孵化中。
ERR_NOT_ENOUGH_RESOURCES | 这个creep没有足够的ghodium。
ERR_INVALID_TARGET | 目标不是一个有效的控制中心对象。
ERR_NOT_IN_RANGE | 目标太远了。
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

获取指定类型可用的身体部件数量。完全毁坏的部件不会被计算。

{% api_method_params %}
type : string
一个身体部件类型，下列身体部件类型常量之一：
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


### 返回值

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


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | You are not the owner of this creep, or the room controller is owned or reserved by another player.
ERR_BUSY | 这个creep依然在孵化中。
ERR_NOT_FOUND | 未找到 extractor。你必须建造一个 extractor 来开采矿物。<a href="/minerals.html">Learn more</a>
ERR_NOT_ENOUGH_RESOURCES | The target does not contain any harvestable energy or mineral.
ERR_INVALID_TARGET | The target is not a valid source or mineral object.
ERR_NOT_IN_RANGE | 目标太远了。
ERR_TIRED | extractor 仍在冷却中。
ERR_NO_BODYPART | 这个creep身上没有<code>WORK</code>部件。
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


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个creep的拥有者。
ERR_BUSY | 这个creep依然在孵化中。
ERR_INVALID_TARGET | The target is not a valid creep object.
ERR_NOT_IN_RANGE | 目标太远了。
ERR_NO_BODYPART | 这个creep身上没有<code>HEAL</code>部件。
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


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个creep的拥有者。
ERR_BUSY | 这个creep依然在孵化中。
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
A path value as returned from <a href="#Room.findPath"><code>Room.findPath</code></a>, <a href="#RoomPosition.findPathTo"><code>RoomPosition.findPathTo</code></a>, or <a href="#PathFinder.PathFinder-search"><code>PathFinder.search</code></a> methods. Both array form and serialized string form are accepted.
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个creep的拥有者。
ERR_BUSY | 这个creep依然在孵化中。
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


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个creep的拥有者。
ERR_BUSY | 这个creep依然在孵化中。
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


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个creep的拥有者。
ERR_BUSY | 这个creep依然在孵化中。
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

Pick up an item (a dropped piece of energy). Requires the <code>CARRY</code> body part. The target has to be at adjacent square to the creep or at the same square.

{% api_method_params %}
target : <a href="#Resource">Resource</a>
The target object to be picked up.
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个creep的拥有者。
ERR_BUSY | 这个creep依然在孵化中。
ERR_INVALID_TARGET | The target is not a valid object to pick up.
ERR_FULL | The creep cannot receive any more resource.
ERR_NOT_IN_RANGE | 目标太远了。
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


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个creep的拥有者。
ERR_BUSY | 这个creep依然在孵化中。
ERR_INVALID_TARGET | The target provided is invalid.
ERR_NOT_IN_RANGE | 目标太远了。
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


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个creep的拥有者。
ERR_BUSY | 这个creep依然在孵化中。
ERR_INVALID_TARGET | 这个目标不是一个有效的攻击目标。
ERR_NOT_IN_RANGE | 目标太远了。
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


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个creep的拥有者。
ERR_BUSY | 这个creep依然在孵化中。
ERR_INVALID_TARGET | 目标不是一个有效的creep对象。
ERR_NOT_IN_RANGE | 目标太远了。
ERR_NO_BODYPART | 这个creep身上没有<code>HEAL</code>部件。
{% endapi_return_codes %}



{% api_method rangedMassAttack '' A %}

```javascript
const targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
if(targets.length > 0) {
    creep.rangedMassAttack();
}
```

A ranged attack against all hostile creeps or structures within 3 squares range. Requires the <code>RANGED_ATTACK</code> body part. The attack power depends on the range to each target. Friendly units are not affected.



### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个creep的拥有者。
ERR_BUSY | 这个creep依然在孵化中。
ERR_NO_BODYPART | 这个creep身上没有<code>RANGED_ATTACK</code>部件。
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


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个creep的拥有者。
ERR_BUSY | 这个creep依然在孵化中。
ERR_NOT_ENOUGH_RESOURCES | 这个creep没有携带任何能量。
ERR_INVALID_TARGET | The target is not a valid creep object.
ERR_NOT_IN_RANGE | 目标太远了。
ERR_NO_BODYPART | 这个creep身上没有<code>WORK</code>部件。
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


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个creep的拥有者。
ERR_BUSY | 这个creep依然在孵化中。
ERR_INVALID_TARGET | The target is not a valid neutral controller object.
ERR_NOT_IN_RANGE | 目标太远了。
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


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个creep的拥有者。
ERR_BUSY | 这个creep依然在孵化中。
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


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_BUSY | 这个creep依然在孵化中。
ERR_INVALID_TARGET | The target is not a valid controller object.
ERR_NOT_IN_RANGE | 目标太远了。
{% endapi_return_codes %}



{% api_method suicide '' A %}



Kill the creep immediately.



### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个creep的拥有者。
ERR_BUSY | 这个creep依然在孵化中。
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
<code>RESOURCE_*</code>常量之一。
===
amount (optional) : number
The amount of resources to be transferred. If omitted, all the available carried amount is used.
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个creep的拥有者。
ERR_BUSY | 这个creep依然在孵化中。
ERR_NOT_ENOUGH_RESOURCES | The creep does not have the given amount of resources.
ERR_INVALID_TARGET | The target is not a valid object which can contain the specified resource.
ERR_FULL | The target cannot receive any more resources.
ERR_NOT_IN_RANGE | 目标太远了。
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


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | You are not the owner of this creep or the target controller.
ERR_BUSY | 这个creep依然在孵化中。
ERR_NOT_ENOUGH_RESOURCES | 这个creep没有携带任何能量。
ERR_INVALID_TARGET | The target is not a valid controller object, or the controller upgrading is blocked.
ERR_NOT_IN_RANGE | 目标太远了。
ERR_NO_BODYPART | 这个creep身上没有<code>WORK</code>部件。
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
<code>RESOURCE_*</code>常量之一。
===
amount (optional) : number
被传递资源的数量。如果没有这个参数，传递全部可用数量的资源。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | You are not the owner of this creep, or there is a hostile rampart on top of the target.
ERR_BUSY | 这个creep依然在孵化中。
ERR_NOT_ENOUGH_RESOURCES | The target does not have the given amount of resources.
ERR_INVALID_TARGET | The target is not a valid object which can contain the specified resource.
ERR_FULL | The creep's carry is full.
ERR_NOT_IN_RANGE | 目标太远了。
ERR_INVALID_ARGS | The resourceType is not one of the <code>RESOURCE_*</code> constants, or the amount is incorrect.
{% endapi_return_codes %}
