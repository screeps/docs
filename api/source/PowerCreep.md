# PowerCreep  


Power Creep 是和您账户绑定的不朽“英雄”单位。其死后可以在任何 `PowerSpawn` 重生。你可以升级它们的能力（“powers”），可升级的等级取决于您的 Global Power Level。(查看 [`Game.gpl`](#Game.gpl))。

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td><strong>存活时间</strong></td>
        <td>5,000</td>
    </tr>
    <tr>
        <td><strong>生命值</strong></td>
        <td>1,000 每级</td>
    </tr>
    <tr>
        <td><strong>容量</strong></td>
        <td>100 每级</td>
    </tr>    
    </tbody>
</table>

[可用 power 的完整列表](/power.html#Powers)

{% api_method PowerCreep.create 'name, className' 1 %}

```javascript
PowerCreep.create('PowerCreep1', POWER_CLASS.OPERATOR);
```

向您账户中添加新的 Power Creep 实例。在添加之后默认为未孵化状态，使用 [`spawn`](#PowerCreep.spawn) 方法在游戏世界中生成它。

您的账户中拥有至少一个可用的 Power Level 才能执行该操作。

{% api_method_params %}
name : string
新 power creep 的名字。
===
className : string
新 power creep 的类型，`POWER_CLASS` 常量之一。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_ENOUGH_RESOURCES | 您的账户中没有足够的 Power Level。
ERR_NAME_EXISTS | 指定的 power creep 名称已被使用。
{% endapi_return_codes %} 

{% page inherited/RoomObject.md %}


{% api_property carry object '{"deprecated": true}' %}

[`Creep.store`](#Creep.store) 的别名。


{% api_property carryCapacity number '{"deprecated": true}' %}

[`Creep.store.getCapacity()`](#Store.getCapacity) 的别名。

{% api_property className string %}
该 power creep 的类型，`POWER_CLASS` 常量之一。

{% api_property deleteTime number %}
该 creep 被从账户中永久删除的时间戳，否则为 undefined。

{% api_property hits number %}
该 creep 当前的 hit 生命值。

{% api_property hitsMax number %}
该 creep 当前的最大生命值。

{% api_property id string %}
一个唯一的对象标识。你可以使用<a href="#Game.getObjectById"><code>Game.getObjectById</code></a>方法获取对象实例。

{% api_property level number %}
该 power creep 的等级。

{% api_property memory any %}

```javascript
creep.memory.task = 'building';
```

<code>Memory.powerCreeps[creep.name]</code> 的简写。您可以使用它来快速访问该 creep 的特定内存数据对象。<a href="/global-objects.html#Memory-object">点此了解有关 memory 的更多信息</a>



{% api_property my boolean %}
您是否为该 creep 的所有者。



{% api_property name string %}
Power creep 的名字。您可以在创建一个新 power creep 时为其指定名称，一旦指定无法修改（在 creep 存活时无法修改）。此名称是 <a href="#Game.powerCreeps">Game.powerCreeps</a> 对象中指向该 creep 的哈希键。你可以使用它来快速访问到该 creep。



{% api_property owner object %}
一个代表其拥有者信息的对象，包含以下属性：

{% api_method_params %}
username : string
拥有者姓名。
{% endapi_method_params %}

{% api_property store '<a href="#Store">Store</a>' %}

```javascript
if(creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()) {
    goHarvest(creep);
}
```

一个包含了该 creep 所携带资源的 [`Store`](#Store) 对象。

{% api_property powers object %}
可用的 power，一个使用 power ID 作为键的对象，包含以下属性：

{% api_method_params %}
level : number
该 power 的等级。
===
cooldown : number
剩余的冷却时间，当 power creep 还没有出生时为 undefined。
{% endapi_method_params %}


{% api_property saying string %}
该 creep 在最后一 tick 说过的话。

{% api_property shard string %}
该 power creep 孵化到的 shard 名称，或者为 undefined。

{% api_property spawnCooldownTime number %}
```javascript
if(!(Game.powerCreeps['PowerCreep1'].spawnCooldownTime > Date.now())) {
    Game.powerCreeps['PowerCreep1'].spawn(powerSpawn);
}
```
在生成或者删除 creep 时该时间戳可用。
在该 power creep 已经出生后为 undefined。

{% api_property ticksToLive number %}
在 creep 死亡并变为未孵化状态前的剩余存活 tick 时长。在 creep 未孵化时该属性为 undefined。



{% api_method cancelOrder 'methodName' 0 %}

```javascript
creep.move(LEFT);
creep.cancelOrder('move');
// 该 creep 本 tick 将不会移动。
```

取消当前 tick 已经调用的操作。

{% api_method_params %}
methodName : string
要取消的 creep 方法名称。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 该操作已被成功取消。
ERR_NOT_OWNER | 你不是该 creep 的所有者。
ERR_BUSY | 该 power creep 还没有出生。
ERR_NOT_FOUND | 要取消的方法名称未找到。
{% endapi_return_codes %}


{% api_method delete '[cancel]' A %}

```javascript
Game.powerCreeps['PowerCreep1'].delete();
```

从您的账户中永久删除一个 power creep。在删除时 creep 应处于未孵化状态。该 creep 并不会被立刻删除，而是会启动一个 24 小时的删除倒计时 (详见 [`deleteTime`](#PowerCreep.deleteTime))。你可以通过调用 `delete(true)` 来取消删除。

{% api_method_params %}
cancel : boolean
将其设为 true 来取消之前的删除计划。
{% endapi_method_params %} 

### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个 creep 的所有者。
ERR_BUSY | 该 power creep 仍然存活在这个世界上。
{% endapi_return_codes %}


{% api_method drop 'resourceType, [amount]' A %}

```javascript
creep.drop(RESOURCE_ENERGY);
```

```javascript
// 丢弃所有资源
for(const resourceType in creep.carry) {
	creep.drop(resourceType);
}
```

Drop this resource on the ground.

{% api_method_params %}
resourceType : string
<code>RESOURCE_*</code>常量之一。
===
amount (可选) : number
要被丢弃的资源数量。如果为空，则所有该类型资源都会被丢弃。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个creep的拥有者。
ERR_BUSY | 该 power creep 还没有出生。
ERR_INVALID_ARGS | resourceType 不是一个有效的 <code>RESOURCE_*</code> 常量。
ERR_NOT_ENOUGH_RESOURCES | 该 creep 上携带的资源数量小于给定的 amount。
{% endapi_return_codes %}



```javascript
Game.powerCreeps['PowerCreep1'].usePower(PWR_GENERATE_OPS);
```


{% api_method enableRoom 'controller' A %}

```javascript
powerCreep.enableRoom(powerCreep.room.controller);
```

在该房间启用 power。房间控制器应位于相邻的地块上。

{% api_method_params %}
controller : <a href="#StructureController">StructureController</a>
房间控制器。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个creep的拥有者。
ERR_INVALID_TARGET | 目标不是一个控制器建筑。
ERR_NOT_IN_RANGE | 目标太远了。
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

使 creep 朝指定方向移动一个地块。

{% api_method_params %}
direction : <a href="#Creep">Creep</a>|number
一个相邻的 creep 或者下列常量之一：
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
ERR_BUSY | 该 power creep 还没有出生。
ERR_TIRED | 该 creep 的疲劳(fatigue)计数器不为零。
ERR_INVALID_ARGS | 提供的方向不正确。
ERR_NOT_IN_RANGE | 目标 creep 距离过远。
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

使用预先定义的路径进行移动。

{% api_method_params %}
path : array|string
<a href="#Room.findPath"><code>Room.findPath</code></a>、<a href="#RoomPosition.findPathTo"><code>RoomPosition.findPathTo</code></a> 或 <a href="#PathFinder.PathFinder-search"><code>PathFinder.search</code></a> 的返回值。数组和序列化的字符串都可以接受。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个creep的拥有者。
ERR_BUSY | 该 power creep 还没有出生。
ERR_NOT_FOUND | 指定的路径与该 creep 的位置不匹配。
ERR_INVALID_ARGS | <code>path</code> 不是一个有效的路径数组。
ERR_TIRED | 该 creep 的疲劳(fatigue)计数器不为零。
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
// 优先使用缓存路径进行移动
for(const name in Game.creeps) {
    Game.creeps[name].moveTo(target, {noPathFinding: true});
}

// 仅当有足够 CPU 时才执行寻路
if(Game.cpu.tickLimit - Game.cpu.getUsed() > 20) {
    for(const name in Game.creeps) {
        Game.creeps[name].moveTo(target);
    }
}
```

在本房间内查询到目标的最佳路径并向目标移动。该方法是 <a href="#RoomPosition.findPathTo">pos.findPathTo( )</a> <a href="#Creep.move">move( )</a> 的调用简写。如果目标在其他房间，则相应的出口将被当做目标(在本房间中)。

{% api_method_params %}
x : number
目标在 creep 所在房间中的 x 坐标。
===
y : number
目标在 creep 所在房间中的 y 坐标。
===
target : object
可以是 <a href="#RoomPosition">RoomPosition</a> 对象或者任何包含 <a href="#RoomPosition">RoomPosition</a> 属性的对象。 The position doesn't have to be in the same room with the creep.
===
opts (可选) : object
包含可选项的对象：
					<ul>
						<li>
							<div class="api-arg-title">reusePath</div>
							<div class="api-arg-type">number</div>
							<div class="api-arg-desc">此选项将缓存前方多个 tick 将要移动的路径。该操作可以节省 cpu 时间，但是会导致 creep 的反应变慢。路径被缓存到 creep 内存中的 <code>_move</code> 属性里。<code>reusePath</code> 的值定义了要缓存前方多少 tick 的移动路径。默认值为 5。增加该值来节省更多的 CPU。减少该值来使移动更加连贯。设置为 0 来禁用路径重用。</div>
						</li>
						<li>
							<div class="api-arg-title">serializeMemory</div>
							<div class="api-arg-type">boolean</div>
							<div class="api-arg-desc">如果 <code>reusePath</code> 启用并且该值设为 true，重用的路径将会使用 <a href="#Room.Room-serializePath"><code>Room.serializePath</code></a> 进行序列化并储存在内存中。默认值为 true。</div>
						</li>
						<li>
							<div class="api-arg-title">noPathFinding</div>
							<div class="api-arg-type">boolean</div>
							<div class="api-arg-desc">如果该选择设为 true 并且内存中没有重用路径时，<code>moveTo</code> 将会返回 <code>ERR_NOT_FOUND</code>。在某些情况下，这回节省大量的 CPU 时间。默认值为 false。</div>
						</li>
						<li>
							<div class="api-arg-title">visualizePathStyle</div>
							<div class="api-arg-type">object</div>
							<div class="api-arg-desc">使用 <a href="#RoomVisual.poly"><code>RoomVisual.poly</code></a> 来在 creep 的移动路线上画一条线。你可以提供一个空对象或者自定义样式参数。默认的样式如下：
								<pre class="language-javascript"><code>{
    fill: 'transparent',
    stroke: '#fff',
    lineStyle: 'dashed',
    strokeWidth: .15,
    opacity: .1
}</code></pre>
							</div>
						</li>
						<li>任何 <a href="#Room.findPath"><code>Room.findPath</code></a> 方法支持的可选项。</li>
					</ul>

{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个creep的拥有者。
ERR_BUSY | 该 power creep 还没有出生。
ERR_TIRED | 该 creep 的疲劳(fatigue)计数器不为零。
ERR_INVALID_TARGET | 提供了无效目标。
ERR_NO_PATH | 没有找到可以抵达目标的路径。
ERR_NOT_FOUND | 该 creep 没有找到可重用的路径。
{% endapi_return_codes %}



{% api_method notifyWhenAttacked 'enabled' A %}

```javascript
Game.powerCreeps['PC1'].notifyWhenAttacked(true);
```

当 creep 受到攻击时切换自动通知。通知将发送到您的帐户邮箱。默认情况下启用。

{% api_method_params %}
enabled : boolean
是否启用通知。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个creep的拥有者。
ERR_BUSY | 该 power creep 还没有出生。
ERR_INVALID_ARGS | <code>enable</code> 参数不是 boolean 值。
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

捡起一个物品 (如捡起一些能量)。目标必须在紧邻 creep 的正方形区域中或者和 creep 在相同位置。

{% api_method_params %}
target : <a href="#Resource">Resource</a>
要捡起的目标对象。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个creep的拥有者。
ERR_BUSY | 该 power creep 还没有出生。
ERR_INVALID_TARGET | 目标不是一个有效的可拾取对象。
ERR_FULL | 该 creep 已无法存储更多资源。
ERR_NOT_IN_RANGE | 目标太远了。
{% endapi_return_codes %}




{% api_method rename 'name' 0 %}

```javascript
Game.powerCreeps['PC1'].rename('PC1X');
```

重命名 power creep。该 creep 必须尚未出生。

{% api_method_params %}
name : string
power creep 的新名字。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是该 creep 的所有者。
ERR_BUSY | power creep 已经出生。
ERR_NAME_EXISTS | 指定的名称已经被已存在的 power creep 使用。
{% endapi_return_codes %}



{% api_method renew 'target' A %}

```javascript
let powerBank = Game.getObjectById('XXX');
Game.powerCreeps['PowerCreep1'].renew(powerBank);

```

立刻使用一个 Power Spawn 或者附近的 Power Bank 恢复最大的存活时间。目标必须在相邻的地块上。

{% api_method_params %}
target : <a href="#StructurePowerBank">StructurePowerBank</a> | <a href="#StructurePowerSpawn">StructurePowerSpawn</a>
目标建筑。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个creep的拥有者。
ERR_BUSY | 该 power creep 还没有出生。
ERR_INVALID_TARGET | 目标不是一个有效的 power bank 对象。
ERR_NOT_IN_RANGE | 目标太远了。
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

在该 creep 上显示带有指定内容的可视对话气泡。此信息只会显示 1 tick。你可以通过 <code>saying</code> 属性获取说过的最后一条信息。允许使用任何有效的 Unicode 字符。包括 <a href="http://unicode.org/emoji/charts/emoji-style.txt" target="_blank">emoji</a>。

{% api_method_params %}
message : string
要显示的信息，最长 10 字符。
===
public (optional) : boolean
设置为 true 来让其他玩家也能看到该信息。默认为 false。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个creep的拥有者。
ERR_BUSY | 该 power creep 还没有出生。
{% endapi_return_codes %}



{% api_method spawn 'powerSpawn' A %}

```javascript
Game.powerCreeps['PowerCreep1'].spawn(Game.getObjectById('XXX'));
```

使用指定的 Power Spawn 孵化该 power creep。

{% api_method_params %}
powerSpawn : <a href="#StructurePowerSpawn">StructurePowerSpawn</a>
您的 Power Spawn 建筑。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 您不是该 creep 或者 spawn 的所有者。
ERR_BUSY | 该 power creep 已经出生了。
ERR_RCL_NOT_ENOUGH | 房间控制等级（RCL）不足以使用该 spawn。
ERR_INVALID_TARGET | 指定的对象不是一个 Power Spawn。
ERR_TIRED | 由于 power creep 仍在冷却中导致其无法生成。
{% endapi_return_codes %}



{% api_method suicide '' A %}



立刻杀死一个 power creep。这不会永久的删除它，而是将其转为未孵化状态，
所以你可以重新 [`spawn`](#PowerCreep.spawn) 它。



### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个creep的拥有者。
ERR_BUSY | 该 power creep 还没有出生。
{% endapi_return_codes %}



{% api_method transfer 'target, resourceType, [amount]' A %}

```javascript
if(creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	creep.moveTo(storage);
}
```

```javascript
// 转移所有资源
for(const resourceType in creep.carry) {
	creep.transfer(storage, resourceType);
}
```

将资源从该 creep 转移至其他对象。目标必须在紧邻 creep 的正方形区域中。

{% api_method_params %}
target : <a href="#Creep">Creep</a>, <a href="#Structure">Structure</a>
The target object.
===
resourceType : string
<code>RESOURCE_*</code>常量之一。
===
amount (optional) : number
要转移的资源数量。如果省略，将转移携带的全部指定资源。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个creep的拥有者。
ERR_BUSY | 该 power creep 还没有出生。
ERR_NOT_ENOUGH_RESOURCES | 该 creep 没有携带足够的资源。
ERR_INVALID_TARGET | 目标不是一个能存放指定资源的有效对象。
ERR_FULL | 目标无法携带更多的资源。
ERR_NOT_IN_RANGE | 目标太远了。
ERR_INVALID_ARGS | resourceType 不是 <code>RESOURCE_*</code> 常量之一，或者 amount 数量错误。
{% endapi_return_codes %}



{% api_method upgrade 'power' A %}

```javascript
Game.powerCreeps['PowerCreep1'].upgrade(PWR_GENERATE_OPS);
```
升级该 creep，给它添加一个新的 power 能力或者升级已存在的 power 能力。
你账户中需要有一个空闲的 Power Level 才能执行该操作。

{% api_method_params %}
power : number
要升级的 power，`PWR_*` 常量之一。
{% endapi_method_params %}

### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是该 creep 的所有者。
ERR_NOT_ENOUGH_RESOURCES | 您账户中的 Power Level 不足。
ERR_FULL | 该 creep 的等级不允许升级指定的 power，或者 creep 已经到达了最大等级。
ERR_INVALID_ARGS | 指定了无效的 power ID。
{% endapi_return_codes %}


{% api_method usePower 'power, [target]' A %}

```javascript
Game.powerCreeps['PowerCreep1'].usePower(PWR_GENERATE_OPS);
```

```javascript
Game.powerCreeps['PowerCreep1'].usePower(PWR_OPERATE_SPAWN, Game.spawns['Spawn1']);
```

在指定目标上附加该 creep 的 power。
你只能在没有控制器或者 [power-enabled](#PowerCreep.enableRoom) 的控制器所在的房间中使用 power。
同一 tick 中只能使用一种 power，每个 `usePower` 调用都将覆盖前一个。
如果目标拥有较低或相同等级的效果，则将已存在的效果覆盖。如果已存在的效果等级更高，则返回一个错误码。

[可用 power 的完整列表](/power.html#Powers)   


{% api_method_params %}
power : number
要使用的 power 能力，`PWR_*`常量之一。
===
target : <a href="#RoomObject">RoomObject</a>
房间中的指定目标。
{% endapi_method_params %}

### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是该 creep 的所有者。
ERR_BUSY | 该 creep 还没有出生。
ERR_NO_BODYPART | 该 creep 没有指定的 power 能力。
ERR_TIRED | 该 power 能力仍在冷却中。
ERR_NOT_ENOUGH_RESOURCES | 该 creep 没有足够的资源来使用这个 power。
ERR_INVALID_TARGET | 指定了无效的目标。
ERR_NOT_IN_RANGE | 指定目标距离过远。
ERR_INVALID_ARGS | 该房间控制器还没有启用 power。
ERR_FULL | 目标拥有相同或更高等级的已激活效果。
{% endapi_return_codes %}

{% api_method withdraw 'target, resourceType, [amount]' A %}

```javascript
if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	creep.moveTo(storage);
}
```

从建筑(structure)或是墓碑(tombstone)中拿取资源。目标必须在紧邻 creep 的正方形区域中。多个 creep 可以在同一 tick 里从相同对象中拿取资源。你的 creep 同样也可以从敌对建筑/墓碑中拿取资源，如果它上面没有敌对的 rampart 的话。

此方法不应该被用来在 creep 之间转移资源。想要在 creep 之间转移，请对携带资源的 creep 执行 [`transfer`](#Creep.transfer) 方法。

{% api_method_params %}
target : <a href="#Structure">Structure</a>, <a href="#Tombstone">Tombstone</a>
目标对象。
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
ERR_NOT_OWNER | 你不是此 creep 的所有者，或者目标位于敌方 rampart 之下。
ERR_BUSY | 该 power creep 还没有出生。
ERR_NOT_ENOUGH_RESOURCES | 目标中没有足够数量的资源。
ERR_INVALID_TARGET | 目标不是一个能存储指定资源的对象。
ERR_FULL | 此 creep 的存储已经满了。
ERR_NOT_IN_RANGE | 目标太远了。
ERR_INVALID_ARGS | resourceType 不是 <code>RESOURCE_*</code> 常量之一, 或者 amount 数量错误。
{% endapi_return_codes %}



