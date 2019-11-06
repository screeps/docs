# Room

一个代表了你的单位和建筑所在房间的对象。
它可以被用来“环顾四周”，查找路径等。所有 `RoomObject` 都有一个链接到其所在房间 `Room` 实例的属性 `room`。

{% api_property controller '<a href="#StructureController">StructureController</a>' %}



该房间中的控制器（Controller）建筑，如果它存在的话，否则为 undefined。



{% api_property energyAvailable 'number' %}



本房间中所有 spawn 和 extension 中的可用能量总额。



{% api_property energyCapacityAvailable 'number' %}



本房间中所有 spawn 和 extension 的 <code>energyCapacity</code> 总额。


{% api_property memory 'any' %}

```javascript
room.memory.stage = 2;
```

<code>Memory.rooms[room.name]</code> 的简写。你可以用它来快速访问到该房间特定的内存数据对象。<a href="/global-objects.html#Memory-object">点此了解有关内存的更多信息</a>。



{% api_property name 'string' %}



房间名称。



{% api_property storage '<a href="#StructureStorage">StructureStorage</a>' %}



该房间中的 Storage 建筑，如果它存在的话，否则为 undefined。



{% api_property terminal '<a href="#StructureTerminal">StructureTerminal</a>' %}



该房间中的 Terminal 建筑，如果它存在的话，否则为 undefined。



{% api_property visual '<a href="#RoomVisual">RoomVisual</a>' %}


该房间的 <a href="#RoomVisual">RoomVisual</a> 对象。您可以使用该对象在房间中绘制简单的形状 (线条，圆，文本标签)。



{% api_method Room.serializePath 'path' 1 %}

```javascript
const path = spawn.pos.findPathTo(source);
Memory.path = Room.serializePath(path);
creep.moveByPath(Memory.path);
```

将路径数组序列化为适合存储在内存中的短字符串形式。

{% api_method_params %}
path : array
<code><a href="#Room.findPath">Room.findPath</a></code> 返回的路径数组。
{% endapi_method_params %}


### 返回值

参数路径的序列化字符串。

{% api_method Room.deserializePath 'path' 1 %}

```javascript
const path = Room.deserializePath(Memory.path);
creep.moveByPath(path);
```

将短字符串形式的路径反序列化为路径数组。

{% api_method_params %}
path : string
一个序列化路径字符串。
{% endapi_method_params %}


### 返回值

一个路径数组

{% api_method createConstructionSite 'x, y, structureType, [name]|pos, structureType, [name]' A %}

```javascript
Game.rooms.sim.createConstructionSite(10, 15, STRUCTURE_ROAD);
```

```javascript
Game.rooms.sim.createConstructionSite(10, 15, STRUCTURE_SPAWN, 
    'MySpawn2');
```

在指定位置创建一个新的 <a href="#ConstructionSite">ConstructionSite</a>。

{% api_method_params %}
x : number
X 坐标。
===
y : number
Y 坐标。
===
pos : object
可以为 <a href="#RoomPosition">RoomPosition</a>  对象或任何包含 <a href="#RoomPosition">RoomPosition</a> 的对象。
===
structureType : string
<code>STRUCTURE_*</code> 常量之一。
===
name (可选) : string
建筑的名称，该建筑必须支持设置名字（当前仅有 spawn）。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_INVALID_TARGET | 该建筑无法被放置在指定位置。
ERR_FULL | 你已经放置了太多建筑工地。其上限为 100。
ERR_INVALID_ARGS | 不正确的位置。
ERR_RCL_NOT_ENOUGH | 房间控制器级别不足。<a href="/control.html">了解更多</a>
{% endapi_return_codes %}



{% api_method createFlag 'x, y, [name], [color], [secondaryColor]|pos, [name], [color], [secondaryColor]' A %}

```javascript
Game.rooms.sim.createFlag(5, 12, 'Flag1');
```

在指定位置创建一个新的 <a href="#Flag">Flag</a>。

{% api_method_params %}
x : number
X 坐标。
===
y : number
Y 坐标。
===
pos : object
可以为 <a href="#RoomPosition">RoomPosition</a>  对象或任何包含 <a href="#RoomPosition">RoomPosition</a> 的对象。
===
name (可选) : string
新旗帜的名称。它应该是唯一的，即 <code>Game.flags</code> 不应该包含拥有相同名称(哈希键)的不同旗帜。如果未定义，则会生成随机名称。最长不得超过 60 字符。
===
color (可选) : string
新旗帜的颜色。应为 <code>COLOR_*</code> 常量之一。默认值为 <code>COLOR_WHITE</code>。
===
secondaryColor (可选) : string
新旗帜的次要颜色。应为 <code>COLOR_*</code> 常量之一。默认值等于 <code>color</code> 属性值。
{% endapi_method_params %}


### 返回值

新旗帜的名称，或者下列错误码之一：
{% api_return_codes %}
ERR_NAME_EXISTS | 该名称已被现有的旗帜使用。
ERR_INVALID_ARGS | 位置或者颜色不正确。
ERR_FULL | 你放置了太多旗帜，每个玩家最多允许放置 10000 个旗帜。
{% endapi_return_codes %}



{% api_method find 'type, [opts]' 2 %}

```javascript
const targets = creep.room.find(FIND_DROPPED_RESOURCES);
if(targets.length) {
    creep.moveTo(targets[0]);
    creep.pickup(targets[0]);
}
```

```javascript
const extensions = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, {
    filter: { structureType: STRUCTURE_EXTENSION }
});
console.log('Spawn has '+extensions.length+' extensions available');
```

```javascript
const targets = creep.room.find(FIND_HOSTILE_CREEPS, {
    filter: function(object) {
        return object.getActiveBodyparts(ATTACK) == 0;
    }
});
```

查找房间中指定类型的所有对象。在应用自定义的 filter 之前，搜索结果会被自动缓存到指定的房间和类型，自动缓存将持续到本 tick 结束。

{% api_method_params %}
type : number
<code>FIND_*</code> 常量之一。
===
opts (可选) : object
包含下列可选项的对象：
					<ul>
						<li>
							<div class="api-arg-title">filter</div>
							<div class="api-arg-type">object, function, string</div>
							<div class="api-arg-desc">将会使用 <a href="https://lodash.com/docs#filter">Lodash.filter</a> 方法对结果列表进行筛选。</div>
						</li>
					</ul>

{% endapi_method_params %}


### 返回值

找到的对象数组

常量|类型|介绍
---|---|---
`FIND_EXIT_TOP` | RoomPosition | 位于房间顶部的出口位置。
`FIND_EXIT_RIGHT` | RoomPosition | 位于房间右侧的出口位置。
`FIND_EXIT_BOTTOM` | RoomPosition | 位于房间底部的出口位置。
`FIND_EXIT_LEFT` | RoomPosition | 位于房间左侧的出口位置。
`FIND_EXIT` | RoomPosition | 所有出口位置。
`FIND_CREEPS` | Creep | 所有 creep。
`FIND_MY_CREEPS` | Creep | 所有属于您的 creep。
`FIND_HOSTILE_CREEPS` | Creep | 所有不属于您的 creep。
`FIND_SOURCES_ACTIVE` | Source | 仍有能量的 source。
`FIND_SOURCES` | Source | 所有 source。
`FIND_DROPPED_RESOURCES` | Resource | 所有掉落的资源。
`FIND_STRUCTURES` | Structure | 所有建筑。
`FIND_MY_STRUCTURES` | Structure | 所有属于您的建筑，不包含中立建筑。
`FIND_HOSTILE_STRUCTURES` | Structure | 所有不属于您的建筑，不包含中立建筑。
`FIND_FLAGS` | Flag | 所有旗帜。
`FIND_MY_SPAWNS` | StructureSpawn | 属于您的 spawn。
`FIND_HOSTILE_SPAWNS` | StructureSpawn | 不属于您的 spawn。
`FIND_CONSTRUCTION_SITES` | ConstructionSite | 所有建筑工地。
`FIND_MY_CONSTRUCTION_SITES` | ConstructionSite | 所有属于您的建筑工地。
`FIND_HOSTILE_CONSTRUCTION_SITES` | ConstructionSite | 所有不属于您的建筑工地。
`FIND_MINERALS` | Mineral | 所有矿床。
`FIND_NUKES` | Nuke | 所有已发射的核弹。
`FIND_TOMBSTONES` | Tombstone | 所有墓碑。

{% api_method findExitTo 'room' 3 %}

```javascript
const exitDir = creep.room.findExitTo(anotherCreep.room);
const exit = creep.pos.findClosestByRange(exitDir);
creep.moveTo(exit);

// 或简写为：
creep.moveTo(anotherCreep);
creep.moveTo(new RoomPosition(25,25, anotherCreep.pos.roomName));
```

找到通往另一个房间的出口方向。请注意，房间之间的移动不需要此方法，您只需将另一个房间中的目标传递给 <a href="#Creep.moveTo"><code>Creep.moveTo</code></a> 方法即可。

{% api_method_params %}
room : string, <a href="#Room">Room</a>
其他房间的名称或者房间对象。
{% endapi_method_params %}


### 返回值

出口方向常量，下列之一：

* `FIND_EXIT_TOP`
* `FIND_EXIT_RIGHT`
* `FIND_EXIT_BOTTOM`
* `FIND_EXIT_LEFT`

或者下列错误码之一：
{% api_return_codes %}
ERR_NO_PATH | 无法找到路径。
ERR_INVALID_ARGS | 不正确的位置。
{% endapi_return_codes %}



{% api_method findPath 'fromPos, toPos, [opts]' 3 %}

```javascript
const path = creep.room.findPath(creep.pos, targetPos);
creep.move(path[0].direction);
```

```javascript
PathFinder.use(true);
const path = creep.room.findPath(creep.pos, targetPos, {
    costCallback: function(roomName, costMatrix) {
	    if(roomName == 'W1N5') {
		    // 将其他 creep 所处位置设置为可通过
			costMatrix.set(anotherCreep.pos.x, anotherCreep.pos.y, 0);
			// 将旗帜的位置设置为障碍
			costMatrix.set(flag.pos.x, flag.pos.y, 255);
			// 将位置 (25,20) 的移动成本设置为 50
			costMatrix.set(25, 20, 50);
		}
	}
});

```

```javascript
let path = creep.room.findPath(creep.pos, targetPos, {maxOps: 200});
if( !path.length || !targetPos.isEqualTo(path[path.length - 1]) ) {
    path = creep.room.findPath(creep.pos, targetPos, {
		maxOps: 1000, ignoreDestructibleStructures: true
	});
}
if( path.length ) {
    creep.move(path[0].direction);
}
```

使用跳点搜索算法 (<a href="http://en.wikipedia.org/wiki/Jump_point_search" target="_blank">Jump Point Search</a>) 在 fromPos 和 toPos 之间找到房间内的最佳路径。

{% api_method_params %}
fromPos : <a href="#RoomPosition">RoomPosition</a>
起始位置。
===
toPos : <a href="#RoomPosition">RoomPosition</a>
结束位置。
===
opts (可选) : object
包含下列寻路可选项的对象：
<ul>
    <li>
        <div class="api-arg-title">ignoreCreeps</div>
        <div class="api-arg-type">boolean</div>
        <div class="api-arg-desc">将其他 creep 所处的地块视作可通行的。在附件有大量移动的 creep 或者其他一些情况时会很有用。默认值为 false。</div>
    </li>
    <li>
        <div class="api-arg-title">ignoreDestructibleStructures</div>
        <div class="api-arg-type">boolean</div>
        <div class="api-arg-desc">将可破坏的建筑 (constructed walls, ramparts, spawns, extensions) 所在的地块视作可通行的。默认为 false。</div>
    </li>
    <li>
        <div class="api-arg-title">ignoreRoads</div>
        <div class="api-arg-type">boolean</div>
        <div class="api-arg-desc">无视道路。启用该项将加快搜索速度。默认值为 false。仅当新的 <a href="#PathFinder"><code>PathFinder</code></a> 启用时才可用。</div>
    </li>
    <li>
        <div class="api-arg-title">costCallback</div>
        <div class="api-arg-type">function(string, CostMatrix)</div>
        <div class="api-arg-desc">你可以使用该回调在搜索过程中为任意房间修改 <a href="#PathFinder-CostMatrix"><code>CostMatrix</code></a>。回调接受两个参数，<code>roomName</code> 和 <code>costMatrix</code>。使用 <code>costMatrix</code> 实例来修改地形移动成本。如果你从回调中返回了一个新的 matrix。它将会代替内置的缓存 matrix。仅当新的 <a href="#PathFinder"><code>PathFinder</code></a> 启用时才可用。</div>
    </li>
    <li>
        <div class="api-arg-title">ignore</div>
        <div class="api-arg-type">array</div>
        <div class="api-arg-desc">一个数组，其元素为房间中的对象或者 <a href="#RoomPosition">RoomPosition</a> 对象，在搜索时会将该数组中的对象位置视作可通行的地块。当启用新的 <a href="#PathFinder"><code>PathFinder</code></a> 时无法使用。（请用 <code>costCallback</code> 选项代替）。</div>
    </li>
    <li>
        <div class="api-arg-title">avoid</div>
        <div class="api-arg-type">array</div>
        <div class="api-arg-desc">一个数组，其元素为房间中的对象或者 <a href="#RoomPosition">RoomPosition</a> 对象，在搜索时会将该数组中的对象位置视作无法通行的地块。当启用新的 <a href="#PathFinder"><code>PathFinder</code></a> 时无法使用。（请用 <code>costCallback</code> 选项代替）。</div>
    </li>
    <li>
        <div class="api-arg-title">maxOps</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">用于寻路的消耗上限。你可以限制在寻路上花费的 CPU 时间，基于 1 op ~ 0.001 CPU 的比例。默认值为 2000。</div>
    </li>
    <li>
        <div class="api-arg-title">heuristicWeight</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">应用于 A\* 算法 <code>F = G + weight \* H</code> 中的启发式权重(weight)。在使用该选项之前您最好已经了解了 A\* 算法的底层实现！默认值为 1。</div>
    </li>
    <li>
        <div class="api-arg-title">serialize</div>
        <div class="api-arg-type">boolean</div>
        <div class="api-arg-desc">如果为 true，将会使用 <code><a href="#Room.serializePath">Room.serializePath</a></code> 对结果路径进行序列化。默认值为 false。</div>
    </li>
    <li>
        <div class="api-arg-title">maxRooms</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">寻路所允许的最大房间数。默认值为 16。仅当新的 <a href="#PathFinder"><code>PathFinder</code></a> 启用时才可用。</div>
    </li>
    <li>
        <div class="api-arg-title">range</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">找到到达位于目标指定线性区域内位置的路径。默认值为 0.</div>
    </li>
    <li>
        <div class="api-arg-title">plainCost</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">平原地形的移动成本。默认为 1。</div>
    </li>
    <li>
        <div class="api-arg-title">swampCost</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">沼泽地形的移动成本。默认为 5。</div>
    </li>
</ul>

{% endapi_method_params %}


### 返回值

一个数组，其元素为如下形式的路径步骤：

```javascript-content
[
    { x: 10, y: 5, dx: 1,  dy: 0, direction: RIGHT },
    { x: 10, y: 6, dx: 0,  dy: 1, direction: BOTTOM },
    { x: 9,  y: 7, dx: -1, dy: 1, direction: BOTTOM_LEFT },
    ...
]
```

{% api_method getEventLog '[raw]' 1 %}

```javascript
// 追踪特定 creep 执行的事件
_.filter(creep.room.getEventLog(), {objectId: creep.id});
```

```javascript
// 查找针对您的 creep 和建筑的所有敌对行动
_.forEach(Game.rooms, room => {
    let eventLog = room.getEventLog();
    let attackEvents = _.filter(eventLog, {event: EVENT_ATTACK});
    attackEvents.forEach(event => {
        let target = Game.getObjectById(event.targetId);
        if(target && target.my) {
            console.log(event);
        }
    });
});
```

返回该房间中前一个 tick 发生的事件数组。

{% api_method_params %}
raw : boolean
如果该参数为 false 或者未定义，则本方法将会返回使用 `JSON.parse` 解析后的对象，在首次访问时可能会造成一些 CPU 消耗（返回值会被缓存以方便后续调用）。如果 `raw` 为 true。则原始的 JSON 字符串将会被返回。
{% endapi_method_params %}


### 返回值

事件数组。每个事件都代表一个游戏动作，其格式如下：
 
```javascript-content
{
    event: EVENT_ATTACK,
    objectId: '54bff72ab32a10f73a57d017',
    data: { /* ... */ }
}
```

不同类型事件的 `data` 属性都是不相同的，详见下表：
<table>
    <tr>
        <th>事件</th><th>介绍</th>
    </tr>
    <tr>
        <td>`EVENT_ATTACK`</td>
        <td>
            一个 creep 或者建筑攻击了另一个对象。
            <ul>
                <li>`targetId` - 目标对象 ID</li>
                <li>`damage` - 造成的 hit 伤害量</li>
                <li>`attackType` - 下列常量之一：
                    <ul>
                        <li>`EVENT_ATTACK_TYPE_MELEE` - creep 使用 [attack](#Creep.attack) 进行了攻击</li>
                        <li>`EVENT_ATTACK_TYPE_RANGED` - creep 使用 [rangedAttack](#Creep.rangedAttack) 进行了攻击，或者 tower 使用 [attack](#StructureTower.attack) 进行了攻击</li> 
                        <li>`EVENT_ATTACK_TYPE_RANGED_MASS` - creep 使用 [rangedMassAttack](#Creep.rangedMassAttack) 进行了攻击</li>
                        <li>`EVENT_ATTACK_TYPE_DISMANTLE` - creep 使用 [dismantle](#Creep.dismantle) 进行了攻击</li>
                        <li>`EVENT_ATTACK_TYPE_HIT_BACK` - creep 反击了其他 creep 的 [attack](#Creep.attack) 攻击</li>
                        <li>`EVENT_ATTACK_TYPE_NUKE` - 核弹着陆</li>
                    </ul>
                </li></ul>
        </td>
    </tr>
    <tr>
        <td>`EVENT_OBJECT_DESTROYED`</td>
        <td>
            一个游戏对象被摧毁或是被消灭。
            <ul><li>`type` - 被摧毁对象的类型</li></ul>
        </td>
    </tr>
    <tr>
        <td>`EVENT_ATTACK_CONTROLLER`</td>
        <td>一个 creep 在该房间执行了 [`attackController`](#Creep.attackController)</td>
    </tr>
    <tr>
        <td>`EVENT_BUILD`</td>
        <td>
            一个 creep 在该房间执行了 [`build`](#Creep.build)。
            <ul>
                <li>`targetId` - 目标对象的 ID</li>
                <li>`amount` - 取得的建造进度</li>
                <li>`energySpent` - 此次行动消耗的能量</li></ul>
        </td>
    </tr>
    <tr>
        <td>`EVENT_HARVEST`</td>
        <td>
            一个 creep 在该房间执行了 [`harvest`](#Creep.harvest)。
            <ul>
                <li>`targetId` - 目标对象的 ID</li>
                <li>`amount` - 资源采集量</li></ul>
        </td>
    </tr>
    <tr>
        <td>`EVENT_HEAL`</td>
        <td>
            一个 creep 或者 tower 治疗了另一个 creep。
            <ul>
                <li>`targetId` - 目标对象的 ID</li>
                <li>`amount` - hit 治疗量</li>
                <li>`healType` - 下列常量之一:
                    <ul>
                        <li>`EVENT_HEAL_TYPE_MELEE` - 一个 creep 使用 [heal](#Creep.heal) 进行了治疗</li>
                        <li>`EVENT_HEAL_TYPE_RANGED` - 一个 creep 使用 [rangedHeal](#Creep.rangedHeal)进行了治疗，或者一个 tower 使用 [heal](#StructureTower.heal) 进行了治疗</li>
                    </ul>
                </li></ul>
        </td>
    </tr>
    <tr>
        <td>`EVENT_REPAIR`</td>
        <td>
            一个 creep 或者 tower 修复了建筑。
            <ul>
                <li>`targetId` - 目标对象 ID</li>
                <li>`amount` - hit 修复量</li> 
                <li>`energySpent` - 此次行动消耗的能量</li></ul>
            </ul>
        </td>
    </tr>        
    <tr>
        <td>`EVENT_RESERVE_CONTROLLER`</td>
        <td>
            一个 creep 在该房间执行了 [`reserveController`](#Creep.reserveController)。
            <ul>
                <li>`amount` - 取得的预定时间</li></ul>
        </td>
    </tr> 
    <tr>
        <td>`EVENT_UPGRADE_CONTROLLER`</td>
        <td>
            一个 creep 在该房间执行了 [`upgradeController`](#Creep.upgradeController)。
            <ul>
                <li>`amount` - 获得的控制点数（control points）</li> 
                <li>`energySpent` - 此次行动消耗的能量</li></ul>
            </ul>
        </td>
    </tr>    
    <tr>
        <td>`EVENT_EXIT`</td>
        <td>
            一个 creep 移动到了其他房间。
            <ul>
                <li>`room` - 目标房间的名称</li> 
                <li>`x`, `y` - creep 将要出现在其他房间的坐标位置</li></ul>
            </ul>
        </td>
    </tr>           
    <tr>
        <td>`EVENT_TRANSFER`</td>
        <td>
            一个 link 执行了 [`transferEnergy`](https://docs.screeps.com/api/#StructureLink.transferEnergy) 或者一个 creep 执行了 [`transfer`](#Creep.transfer) 或 [`withdraw`](#Creep.withdraw)。
            <ul>
                <li>`targetId` - 目标对象 ID</li>
                <li>`resourceType` - 被转移的资源类型</li>
                <li>`amount` - 被转移的资源总量</li>
            </ul>
        </td>
    </tr>
</table>

{% api_method getPositionAt 'x, y' 1 %}

```javascript
const pos = Game.rooms.sim.getPositionAt(5,12);
const source = pos.findClosestByRange(FIND_SOURCES_ACTIVE);
```

获取指定位置的 <a href="#RoomPosition">RoomPosition</a>  对象。

{% api_method_params %}
x : number
X 坐标。
===
y : number
Y 坐标。
{% endapi_method_params %}


### 返回值

一个 
<a href="#RoomPosition">RoomPosition</a>
对象，如果无法获取则返回 null。

{% api_method getTerrain '' 0 %}

```javascript
const terrain = Game.rooms['W1N1'].getTerrain();
switch(terrain.get(10,15)) {
    case TERRAIN_MASK_WALL:
        break;
    case TERRAIN_MASK_SWAMP:
        break;
    case 0:
        break;
}
```

获取一个 <a href="#Room-Terrain">`Room.Terrain`</a> 对象，可以用它来快速访问房间内的静态地形数据。即使没有指定房间的视野，您依旧可以使用该方法访问它的地形数据，该方法适用于游戏世界中的所有房间。

### 返回值

返回一个新的 <a href="#Room-Terrain">`Room.Terrain`</a> 对象。

{% api_method lookAt 'x, y|target' 2 %}

```javascript
const look = creep.room.lookAt(target);
look.forEach(function(lookObject) {
    if(lookObject.type == LOOK_CREEPS &&
       lookObject[LOOK_CREEPS].getActiveBodyparts(ATTACK) == 0) {
        creep.moveTo(lookObject.creep);
    }
});
```

获取指定房间位置的对象数组。

{% api_method_params %}
x : number
该房间中的 X 坐标。
===
y : number
该房间中的 Y 坐标。
===
target : object
可以是 <a href="#RoomPosition">RoomPosition</a> 对象或者任何包含 <a href="#RoomPosition">RoomPosition</a> 属性的对象。
{% endapi_method_params %}


### 返回值

一个位于指定位置的对象数组，格式如下：

```javascript-content
[
    { type: 'creep', creep: {...} },
    { type: 'structure', structure: {...} },
    ...
    { type: 'terrain', terrain: 'swamp' }
]
```


{% api_method lookAtArea 'top, left, bottom, right, [asArray]' 2 %}

```javascript
const look = creep.room.lookAtArea(10,5,11,7);
```

获取指定房间区域内的对象列表。

{% api_method_params %}
top : number
区域顶部边界的 Y 坐标。
===
left : number
区域左侧边界的 X 坐标。
===
bottom : number
区域底部边界的 Y 坐标。
===
right : number
区域右侧边界的 X 坐标。
===
asArray (可选) : boolean
设为 true 来获得纯数组形式。
{% endapi_method_params %}


### 返回值

如果 `asArray` 值为 false 或者未定义，则该方法以如下格式返回指定区域内的对象：

```javascript-content
// 10,5,11,7

{
    10: {
        5: [{ type: 'creep', creep: {...} },
            { type: 'terrain', terrain: 'swamp' }],
        6: [{ type: 'terrain', terrain: 'swamp' }],
        7: [{ type: 'terrain', terrain: 'swamp' }]
    },
    11: {
        5: [{ type: 'terrain', terrain: 'plain' }],
        6: [{ type: 'structure', structure: {...} },
            { type: 'terrain', terrain: 'swamp' }],
        7: [{ type: 'terrain', terrain: 'wall' }]
    }
}
```

如果 `asArray` 值为 true，则该方法以如下格式返回指定区域内的对象数组：

```javascript-content
[
    {x: 5, y: 10, type: 'creep', creep: {...}},
    {x: 5, y: 10, type: 'terrain', terrain: 'swamp'},
    {x: 6, y: 10, type: 'terrain', terrain: 'swamp'},
    {x: 7, y: 10, type: 'terrain', terrain: 'swamp'},
    {x: 5, y: 11, type: 'terrain', terrain: 'plain'},
    {x: 6, y: 11, type: 'structure', structure: {...}},
    {x: 6, y: 11, type: 'terrain', terrain: 'swamp'},
    {x: 7, y: 11, type: 'terrain', terrain: 'wall'}
]
```


{% api_method lookForAt 'type, x, y|type, target' 1 %}

```javascript
const found = creep.room.lookForAt(LOOK_CREEPS, target);
if(found.length && found[0].getActiveBodyparts(ATTACK) == 0) {
    creep.moveTo(found[0]);
}
```

在指定位置查找指定类型的对象。

{% api_method_params %}
type : string
<code>LOOK_*</code> 常量之一。
===
x : number
该房间中的 X 坐标。
===
y : number
该房间中的 Y 坐标。
===
target : object
可以是 <a href="#RoomPosition">RoomPosition</a> 对象或者任何包含 <a href="#RoomPosition">RoomPosition</a> 属性的对象。
{% endapi_method_params %}


### 返回值

在指定位置找到的指定类型的对象数组。

{% api_method lookForAtArea 'type, top, left, bottom, right, [asArray]' 1 %}

```javascript
const look = creep.room.lookForAtArea(LOOK_STRUCTURES,10,5,11,7);
```

在指定房间区域查找指定类型的对象列表。

{% api_method_params %}
type : string
<code>LOOK_*</code> 常量之一
===
top : number
区域顶部边界的 Y 坐标。
===
left : number
区域左侧边界的 X 坐标。
===
bottom : number
区域底部边界的 Y 坐标。
===
right : number
区域右侧边界的 X 坐标。
===
asArray (可选) : boolean
设为 true 来获得纯数组形式。
{% endapi_method_params %}


### 返回值

如果 `asArray` 值为 false 或者未定义，则该方法以如下格式返回指定区域内的对象：

```javascript-content
// 10,5,11,7

{
    10: {
        5: [{...}],
        6: undefined,
        7: undefined
    },
    11: {
        5: undefined,
        6: [{...}, {...}],
        7: undefined
    }
}
```

如果 `asArray` 值为 true，则该方法以如下格式返回指定区域内的对象数组：

```javascript-content
[
	{x: 5, y: 10, structure: {...}},
	{x: 6, y: 11, structure: {...}},
	{x: 6, y: 11, structure: {...}}
]
```
