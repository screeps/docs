# Creep  


creep 是你的单位, creep 可以移动、采集能量、建造建筑、攻击其他 creep 以及执行其他动作。每个 creep 都由最多 50 个身体部件构成，身体部件的类型如下：

![](img/bodyparts.png)   

<table class="table gameplay-info">
    <tbody>
    <tr>
        <th style="width: 20%;">身体部件</th>
        <th style="width: 10%;">生产成本</th>
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



一个描述了该 creep 身体部件的数组，每一个数组元素都拥有如下的属性:

{% api_method_params %}
boost : string | undefined
如果该身体部件被强化(boost)了，则该属性指定了强化所用的化合物类型。化合物为 <code>RESOURCE_*</code> 常量之一。 <a href="/minerals.html">了解更多</a>
===
type : string
身体部件常量之一。
===
hits : number
该身体部件剩余的生命值。
{% endapi_method_params %}


{% api_property carry object '{"deprecated": true}' %}

[`Creep.store`](#Creep.store) 的别名。


{% api_property carryCapacity number '{"deprecated": true}' %}

[`Creep.store.getCapacity()`](#Store.getCapacity) 的别名。


{% api_property fatigue number %}



每次移动的疲劳值指示器，当该值大于零时 creep 无法移动。



{% api_property hits number %}



当前的 creep 生命值。



{% api_property hitsMax number %}



该 creep 的最大生命值。



{% api_property id string %}



一个唯一的对象标识。你可以使用<a href="#Game.getObjectById"><code>Game.getObjectById</code></a>方法获取对象实例。



{% api_property memory any %}

```javascript
creep.memory.task = 'building';
```

指向 <code>Memory.creeps[creep.name]</code> 的链接。你可以用它来快速访问该 creep 的特定内存对象。 <a href="/global-objects.html#Memory-object">点此了解更多关于 memory 的信息</a>



{% api_property my boolean %}



该 creep 属于您还是其他人。



{% api_property name string %}



creep 的名字。您可以在创建一个新的 creep 时给它取名，名称一旦指定无法更改。此名称是 <a href="#Game.creeps">Game.creeps</a> 对象中指向该 creep 对象的哈希键。你可以使用它来快速访问到该 creep。



{% api_property owner object %}



该 creep 的所有者信息，包含以下属性：

{% api_method_params %}
username : string
所有者姓名。
{% endapi_method_params %}


{% api_property saying string %}


creep 所说的最后一句话。



{% api_property spawning boolean %}



该 creep 是否仍在孵化中。

{% api_property store '<a href="#Store">Store</a>' %}

```javascript
if(creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()) {
    goHarvest(creep);
}
```

一个包含了该建筑中所存储的货物的 [`Store`](#Store) 对象。


{% api_property ticksToLive number %}



该 creep 还有多少 tick 死亡。



{% api_method attack 'target' A %}

```javascript
const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
if(target) {
    if(creep.attack(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
    }
}

```

使用近战攻击其他 creep、超能(power) creep 或建筑。需要 <code>ATTACK</code> 身体部件。如果目标在 rampart 中，则优先攻击 rampart。目标必须在紧邻 creep 的正方形区域中，如果目标是一个带有 <code>ATTACK</code> 身体的 creep 并且没有自己没有在 rampart 中，则该目标会自动进行反击。

{% api_method_params %}
target : <a href="#Creep">Creep</a>, <a href="#PowerCreep">PowerCreep</a>, <a href="#Structure">Structure</a>
要攻击的目标
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个 creep 的拥有者。
ERR_BUSY | 这个 creep 依然在孵化中。
ERR_INVALID_TARGET | 这个目标不是一个有效的攻击目标。
ERR_NOT_IN_RANGE | 目标太远了。
ERR_NO_BODYPART | 这个 creep 身上没有 <code>ATTACK</code> 部件。
{% endapi_return_codes %}



{% api_method attackController 'target' A %}

```javascript
if(creep.room.controller && !creep.room.controller.my) {
    if(creep.attackController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
    }
}

```

攻击时，每个 <code>CLAIM</code> 身体部件都能使得房间控制器的降级计时器降低 300 tick，或者将预定计时器降低 1 tick。如果受到攻击的控制器已经有所属者，则接下来的 1000 tick 将无法升级(upgrade)或再次进行攻击。目标必须在紧邻 creep 的正方形区域中。

{% api_method_params %}
target : <a href="#Structure">Structure</a>
目标房间控制器对象。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个 creep 的拥有者。
ERR_BUSY | 这个 creep 依然在孵化中。
ERR_INVALID_TARGET | 该目标不存在有效的所属者或者预订者对象。
ERR_NOT_IN_RANGE | 目标太远了。
ERR_NO_BODYPART | 这个 creep 身上没有 <code>CLAIM</code> 部件。
ERR_TIRED | 您必须等待控制器可以被再次攻击。
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

使用自己携带的能量来在目标工地上建造一个建筑。需要 <code>WORK</code> 和 <code>CARRY</code> 身体部件。目标必须在以 creep 为中心的 3 格正方形区域中。

{% api_method_params %}
target : <a href="#ConstructionSite">ConstructionSite</a>
待建造的目标工地。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个 creep 的拥有者。
ERR_BUSY | 这个 creep 依然在孵化中。
ERR_NOT_ENOUGH_RESOURCES | 这个creep没有携带任何能量。
ERR_INVALID_TARGET | 该目标不是一个有效的建筑工地(construction site)或者此处无法建造建筑(有可能是 creep 站在该地块上导致的)。
ERR_NOT_IN_RANGE | 目标太远了。
ERR_NO_BODYPART | 这个 creep 身上没有 <code>WORK</code> 部件。
{% endapi_return_codes %}



{% api_method cancelOrder 'methodName' 0 %}

```javascript
creep.move(LEFT);
creep.cancelOrder('move');
// creep 本 tick 将不会移动
```

取消当前 tick 中给出的某个指令。

{% api_method_params %}
methodName : string
需要被取消的 creep 方法名。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作被成功取消了。
ERR_NOT_FOUND | 找不到给出的指令名。
{% endapi_return_codes %}



{% api_method claimController 'target' A %}

```javascript
if(creep.room.controller) {
    if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
    }
}

```

占领一个中立的房间。需要 <code>CLAIM</code> 身体部件。目标必须在紧邻 creep 的正方形区域中。你需要有对应的全局控制等级(Global Control Level)才能占领新的房间。如果你没有足够的 GCL。请考虑 <a href="#reserveController">预定(reserving)</a> 该房间。<a href="/control.html#Global-Control-Level">点击了解更多</a>

{% api_method_params %}
target : <a href="#StructureController">StructureController</a>
目标控制中心对象。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个 creep 的拥有者。
ERR_BUSY | 这个 creep 依然在孵化中。
ERR_INVALID_TARGET | 目标不是一个有效的中立控制中心对象。
ERR_FULL | 你不能在新手区占领超过3个房间。
ERR_NOT_IN_RANGE | 目标太远了。
ERR_NO_BODYPART | 这个 creep 身上没有 <code>CLAIM</code> 部件。
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

拆除任意可以建造的建筑(即时是敌人的)并且返回 50% 其修理所花的能量。需要 <code>WORK</code> 身体部件。如果 creep 有空余的 <code>CARRY</code> 身体部件，则能量会直接转移进去；否则能量将掉落在地上。目标必须在紧邻 creep 的正方形区域中。

{% api_method_params %}
target : <a href="#Structure">Structure</a>
目标建筑。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个 creep 的拥有者。
ERR_BUSY | 这个 creep 依然在孵化中。
ERR_INVALID_TARGET | 目标不是一个有效的建筑对象。
ERR_NOT_IN_RANGE | 目标太远了。
ERR_NO_BODYPART | 这个 creep 身上没有 <code>WORK</code> 部件。
{% endapi_return_codes %}



{% api_method drop 'resourceType, [amount]' A %}

```javascript
creep.drop(RESOURCE_ENERGY);
```

```javascript
// 丢弃身上所有资源
for(const resourceType in creep.carry) {
	creep.drop(resourceType);
}
```

将资源丢弃到地上。

{% api_method_params %}
resourceType : string
<code>RESOURCE_*</code> 常量之一。
===
amount (optional) : number
丢弃资源的数量。如果没有这个参数，丢弃全部资源。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个 creep 的拥有者。
ERR_BUSY | 这个 creep 依然在孵化中。
ERR_INVALID_ARGS | resourceType不是一个有效的<code>RESOURCE_*</code>常量。
ERR_NOT_ENOUGH_RESOURCES | 这个creep没有足够的资源。
{% endapi_return_codes %}



{% api_method generateSafeMode 'controller' A %}

```javascript
if(creep.generateSafeMode(creep.room.controller) == ERR_NOT_IN_RANGE) {
    creep.moveTo(creep.room.controller);
}

```

向房间控制器添加一个新的安全模式激活次数。房间控制器必须在紧邻 creep 的正方形区域中并且 creep 带有 1000 ghodium 资源。

{% api_method_params %}
target : <a href="#StructureController">StructureController</a>
目标控制中心。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个 creep 的拥有者。
ERR_BUSY | 这个 creep 依然在孵化中。
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

身体部件的数量。

{% api_method harvest 'target' A %}

```javascript
const target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
if(target) {
    if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
    }
}

```

从 source 中采集能量或者从 mineral 或 deposit 中采集资源。需要 <code>WORK</code> 身体部件。如果 creep 有空余的 <code>CARRY</code> 身体，则采集到的资源会自动转移进去；否则将会掉落在地上。目标必须在紧邻 creep 的正方形区域中。

{% api_method_params %}
target : <a href="#Source">Source</a>, <a href="#Mineral">Mineral</a>, <a href="#Deposit">Deposit</a>
The object to be harvested.
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是该 creep 的所有者，或者其他玩家已经占领或者预定了该房间的控制器。
ERR_BUSY | 这个 creep 依然在孵化中。
ERR_NOT_FOUND | 未找到 extractor。你必须建造一个 extractor 来开采矿物。<a href="/minerals.html">了解更多</a>
ERR_NOT_ENOUGH_RESOURCES | 目标中已经没有可采集的能量或者矿物。
ERR_INVALID_TARGET | 目标不是有效的 source 或者 mineral 对象。
ERR_NOT_IN_RANGE | 目标太远了。
ERR_TIRED | extractor 仍在冷却中。
ERR_NO_BODYPART | 这个 creep 身上没有 <code>WORK</code> 部件。
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

治疗自己或者其他 creep。这将恢复目标 creep 受损身体部件的功能，并恢复已损失的生命值(hits)。需要 <code>HEAL</code> 身体部件。目标必须在紧邻 creep 的正方形区域中。

{% api_method_params %}
target : <a href="#Creep">Creep</a>, <a href="#PowerCreep">PowerCreep</a>
目标 creep 对象。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个 creep 的拥有者。
ERR_BUSY | 这个 creep 依然在孵化中。
ERR_INVALID_TARGET | 目标不是有效的 creep 对象。
ERR_NOT_IN_RANGE | 目标太远了。
ERR_NO_BODYPART | 这个 creep 身上没有 <code>HEAL</code> 部件。
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

使 creep 朝指定方向移动一个地块。需要 <code>MOVE</code> 身体部件，或者其他 creep 在其附近并<a href="#Creep.pull">拉动</a>该 creep。如果你对着一个相邻 creep 调用了 <code>move</code> 方法，将会使本 creep 跳过 <code>ERR_TIRED</code> 和 <code>ERR_NO_BODYPART</code> 检查; 否则将跳过 <code>ERR_NOT_IN_RANGE</code> 检查。

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
ERR_NOT_OWNER | 你不是这个 creep 的拥有者。
ERR_BUSY | 这个 creep 依然在孵化中。
ERR_TIRED | 该 creep 的疲劳(fatigue)计数器不为零。
ERR_NO_BODYPART | 该 creep 没有 <code>MOVE</code> 身体部件。
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

使用预先定义的路径进行移动。需要 <code>MOVE</code> 身体部件。

{% api_method_params %}
path : array|string
<a href="#Room.findPath"><code>Room.findPath</code></a>、<a href="#RoomPosition.findPathTo"><code>RoomPosition.findPathTo</code></a> 或 <a href="#PathFinder.PathFinder-search"><code>PathFinder.search</code></a> 的返回值。数组和序列化的字符串都可以接受。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个 creep 的拥有者。
ERR_BUSY | 这个 creep 依然在孵化中。
ERR_NOT_FOUND | 指定的路径与该 creep 的位置不匹配。
ERR_INVALID_ARGS | <code>path</code> 不是一个有效的路径数组。
ERR_TIRED | 该 creep 的疲劳(fatigue)计数器不为零。
ERR_NO_BODYPART | 该 creep 没有 <code>MOVE</code> 身体部件。
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

在本房间内查询到目标的最佳路径并向目标移动。该方法是 <a href="#RoomPosition.findPathTo">pos.findPathTo( )</a> <a href="#Creep.move">move( )</a> 的调用简写。如果目标在其他房间，则相应的出口将被当做目标(在本房间中)。需要 <code>MOVE</code> 身体部件。

{% api_method_params %}
x : number
目标在 creep 所在房间中的 x 坐标。
===
y : number
目标在 creep 所在房间中的 y 坐标。
===
target : object
可以是 <a href="#RoomPosition">RoomPosition</a> 对象或者任何包含 <a href="#RoomPosition">RoomPosition</a> 属性的对象。该位置不必和 creep 在同一房间。
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
ERR_NOT_OWNER | 你不是这个 creep 的拥有者。
ERR_BUSY | 这个 creep 依然在孵化中。
ERR_TIRED | 该 creep 的疲劳(fatigue)计数器不为零。
ERR_NO_BODYPART | 该 creep 没有 <code>MOVE</code> 身体部件。
ERR_INVALID_TARGET | 提供了无效目标。
ERR_NO_PATH | 没有找到可以抵达目标的路径。
ERR_NOT_FOUND | 该 creep 没有找到可重用的路径。
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

当 creep 受到攻击时切换自动通知。通知将发送到您的帐户邮箱。默认情况下启用。

{% api_method_params %}
enabled : boolean
是否启用通知。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个 creep 的拥有者。
ERR_BUSY | 这个 creep 依然在孵化中。
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

捡起一个物品 (如捡起一些能量)。需要 <code>CARRY</code> 身体部件。目标必须在紧邻 creep 的正方形区域中或者和 creep 在相同位置。

{% api_method_params %}
target : <a href="#Resource">Resource</a>
要捡起的目标对象。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个 creep 的拥有者。
ERR_BUSY | 这个 creep 依然在孵化中。
ERR_INVALID_TARGET | 目标不是一个有效的可拾取对象。
ERR_FULL | 该 creep 已无法存储更多资源。
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

帮助其他 creep 跟随该 creep。目标 creep 移动产生的疲劳值将由该 creep 承担。需要 <code>MOVE</code> 身体部件。目标必须在紧邻 creep 的正方形区域中。该 creep 必须<a href="#Creep.move">移动</a>到其他地方，目标 creep 也必须朝该 creep 移动。

{% api_method_params %}
target : <a href="#Creep">Creep</a>
目标 creep。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个 creep 的拥有者。
ERR_BUSY | 这个 creep 依然在孵化中。
ERR_INVALID_TARGET | 提供了无效目标。
ERR_NOT_IN_RANGE | 目标太远了。
{% endapi_return_codes %}



{% api_method rangedAttack 'target' A %}

```javascript
const targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
if(targets.length > 0) {
    creep.rangedAttack(targets[0]);
}

```

远程攻击其他 creep 或者建筑。需要 <code>RANGED_ATTACK</code> 身体部件。如果目标在 rampart 中，则 rampart 将被优先攻击。目标必须在以 creep 为中心的 3 格正方形区域中。

{% api_method_params %}
target : <a href="#Creep">Creep</a>, <a href="#PowerCreep">PowerCreep</a>, <a href="#Structure">Structure</a>
要攻击的目标。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个 creep 的拥有者。
ERR_BUSY | 这个 creep 依然在孵化中。
ERR_INVALID_TARGET | 这个目标不是一个有效的攻击目标。
ERR_NOT_IN_RANGE | 目标太远了。
ERR_NO_BODYPART | 该 creep 没有 <code>RANGED_ATTACK</code> 身体部件。
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

远程治疗其他 creep。这将恢复目标 creep 受损身体部件的功能，并恢复已损失的生命值(hits)。需要 <code>HEAL</code> 身体部件。目标必须在以 creep 为中心的 3 格正方形区域中。

{% api_method_params %}
target : <a href="#Creep">Creep</a>, <a href="#PowerCreep">PowerCreep</a>
目标 creep 对象。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个 creep 的拥有者。
ERR_BUSY | 这个 creep 依然在孵化中。
ERR_INVALID_TARGET | 目标不是一个有效的creep对象。
ERR_NOT_IN_RANGE | 目标太远了。
ERR_NO_BODYPART | 这个 creep 身上没有 <code>HEAL</code> 部件。
{% endapi_return_codes %}



{% api_method rangedMassAttack '' A %}

```javascript
const targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
if(targets.length > 0) {
    creep.rangedMassAttack();
}
```

对以该 creep 为中心，3 格范围内的所有敌方 creep 和建筑进行攻击。需要 <code>RANGED_ATTACK</code> 身体部件。对目标造成的伤害随距离的增加而衰减。友方单位不会受到影响。



### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个 creep 的拥有者。
ERR_BUSY | 这个 creep 依然在孵化中。
ERR_NO_BODYPART | 这个 creep 身上没有 <code>RANGED_ATTACK</code> 部件。
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

使用携带的能量修复受损建筑。需要 <code>WORK</code> 和 <code>CARRY</code> 身体部件。目标必须在以 creep 为中心的 3 格正方形区域中。

{% api_method_params %}
target : <a href="#Structure">Structure</a>
要修复的目标建筑。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个 creep 的拥有者。
ERR_BUSY | 这个 creep 依然在孵化中。
ERR_NOT_ENOUGH_RESOURCES | 这个creep没有携带任何能量。
ERR_INVALID_TARGET | 目标不是一个有效的 structure 对象。
ERR_NOT_IN_RANGE | 目标太远了。
ERR_NO_BODYPART | 这个 creep 身上没有 <code>WORK</code> 部件。
{% endapi_return_codes %}



{% api_method reserveController 'target' A %}

```javascript
if(creep.room.controller) {
    if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
    }
}

```

暂时阻止其他玩家占领该房间控制器并且将 source 的能量上限恢复至正常容量。每 tick 执行该命令都可以让控制器的不可占领时间增加，增加的 tick 等同于 <code>CLAIM</code> 身体部件的数量。最大的预定时间为 5,000 tick。目标必须在紧邻 creep 的正方形区域中。

{% api_method_params %}
target : <a href="#StructureController">StructureController</a>
要预定的目标控制器对象。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个 creep 的拥有者。
ERR_BUSY | 这个 creep 依然在孵化中。
ERR_INVALID_TARGET | 目标不是一个有效的中立房间控制器对象。
ERR_NOT_IN_RANGE | 目标太远了。
ERR_NO_BODYPART | 这个 creep 身上没有 <code>CLAIM</code> 部件。
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
ERR_NOT_OWNER | 你不是这个 creep 的拥有者。
ERR_BUSY | 这个 creep 依然在孵化中。
{% endapi_return_codes %}



{% api_method signController 'target, text' A %}

```javascript
if(creep.room.controller) {
    if(creep.signController(creep.room.controller, "I'm going to claim this room in a few days. I warned ya!") == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
    }
}

```

用对所有玩家可见的任意文本对控制器进行签名。该文本将显示在世界地图的房间 UI 中。并可通过 api 进行访问。你可以签名无主甚至敌对玩家的控制器。目标必须在紧邻 creep 的正方形区域中。传递一个空字符串来移除签名。

{% api_method_params %}
target : <a href="#StructureController">StructureController</a>
要签名的目标控制器对象。
===
text : string
签名文本，最多 100 字符，之后的内容将被截断。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_BUSY | 这个 creep 依然在孵化中。
ERR_INVALID_TARGET | 目标不是一个有效的控制器对象。
ERR_NOT_IN_RANGE | 目标太远了。
{% endapi_return_codes %}



{% api_method suicide '' A %}



立刻杀死该 creep。



### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个 creep 的拥有者。
ERR_BUSY | 这个 creep 依然在孵化中。
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
target : <a href="#Creep">Creep</a>, <a href="#PowerCreep">PowerCreep</a>, <a href="#Structure">Structure</a>
目标对象。
===
resourceType : string
<code>RESOURCE_*</code> 常量之一。
===
amount (optional) : number
要转移的资源数量。如果省略，将转移携带的全部指定资源。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个 creep 的拥有者。
ERR_BUSY | 这个 creep 依然在孵化中。
ERR_NOT_ENOUGH_RESOURCES | 该 creep 没有携带足够的资源。
ERR_INVALID_TARGET | 目标不是一个能存放指定资源的有效对象。
ERR_FULL | 目标无法携带更多的资源。
ERR_NOT_IN_RANGE | 目标太远了。
ERR_INVALID_ARGS | resourceType 不是 <code>RESOURCE_*</code> 常量之一，或者 amount 数量错误。
{% endapi_return_codes %}



{% api_method upgradeController 'target' A %}

```javascript
if(creep.room.controller) {
    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
    }
}

```

使用携带的能量将您的控制器升级到新的等级。升级控制器将同时提高你的全局控制等级(Global Control Level)。需要 <code>WORK</code> 和 <code>CARRY</code> 身体部件。目标必须在以 creep 为中心的 3 格正方形区域中。

一个完全升级的 8 级控制器每 tick 最多接受 15 能量的升级，无论 creep 的能力有没有超过。该值限制了当前 tick 所有 creep 执行 <code>upgradeController</code> 积累的总能量值。可以使用 <a href="/resources.html">ghodium 化合物强化</a> 来提高此上限。

升级控制器会把它的 `ticksToDowngrade` 计时器提高 100 tick。该计时器必须填满才能提升控制器等级。

{% api_method_params %}
target : <a href="#StructureController">StructureController</a>
要进行升级的目标控制器。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是该 creep 或目标控制器的所有者。
ERR_BUSY | 这个 creep 依然在孵化中。
ERR_NOT_ENOUGH_RESOURCES | 这个creep没有携带任何能量。
ERR_INVALID_TARGET | 目标不是有效的控制器对象，或控制器的升级被阻滞了。
ERR_NOT_IN_RANGE | 目标太远了。
ERR_NO_BODYPART | 这个 creep 身上没有 <code>WORK</code> 部件。
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
target : <a href="#Structure">Structure</a>, <a href="#Tombstone">Tombstone</a>, <a href="#Ruin">Ruin</a>
目标对象。
===
resourceType : string
<code>RESOURCE_*</code> 常量之一。
===
amount (optional) : number
被传递资源的数量。如果没有这个参数，传递全部可用数量的资源。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是此 creep 的所有者，或者目标位于敌方 rampart 之下。
ERR_BUSY | 这个 creep 依然在孵化中。
ERR_NOT_ENOUGH_RESOURCES | 目标中没有足够数量的资源。
ERR_INVALID_TARGET | 目标不是一个能存储指定资源的对象。
ERR_FULL | 此 creep 的存储已经满了。
ERR_NOT_IN_RANGE | 目标太远了。
ERR_INVALID_ARGS | resourceType 不是 <code>RESOURCE_*</code> 常量之一, 或者 amount 数量错误。
{% endapi_return_codes %}
