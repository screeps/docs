# RoomPosition

表示房间中指定位置的对象。房间中的每个 `RoomObject` 都通过其 `pos` 属性链接到对应的 `RoomPosition` 上。可以使用 [`Room.getPositionAt`](#Room.getPositionAt) 或者构造函数创建自定义地点的位置对象。

{% api_method constructor 'x, y, roomName' 0 %}

```javascript
const pos = new RoomPosition(10, 25, 'sim');

```

你可以使用其构造函数创建一个新的 <code>RoomPosition</code> 对象。

{% api_method_params %}
x : number
房间中的 X 坐标。
===
y : number
房间中的 Y 坐标。
===
roomName : string
房间名称。
{% endapi_method_params %}



{% api_property roomName 'string' %}



所处房间的名称。



{% api_property x 'number' %}



所处房间的 X 坐标。



{% api_property y 'number' %}



所处房间的 Y 坐标。


{% api_method createConstructionSite 'structureType, [name]' A %}

```javascript
Game.flags['Flag1'].pos.createConstructionSite(STRUCTURE_ROAD);
```
```javascript
Game.flags['Flag1'].pos.createConstructionSite(STRUCTURE_SPAWN, 'MySpawn2');
```

在指定位置创建新的 <a href="#ConstructionSite">ConstructionSite</a>。

{% api_method_params %}
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
ERR_RCL_NOT_ENOUGH | 房间控制器等级不足。<a href="/control.html">了解更多</a>
{% endapi_return_codes %}



{% api_method createFlag '[name], [color], [secondaryColor]' A %}

```javascript
creep.pos.createFlag('Flag1');
```

在指定位置创建一个新的 <a href="#Flag">Flag</a>。

{% api_method_params %}
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
<br>

{% api_return_codes %}
ERR_NAME_EXISTS | 该名称已被现有的旗帜使用。
ERR_INVALID_ARGS | 位置或者颜色不正确。
{% endapi_return_codes %}



{% api_method findClosestByPath 'type, [opts]|objects, [opts]' 3 %}

```javascript
const target = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
creep.moveTo(target);
```

```javascript
const target = creep.pos.findClosestByPath(FIND_MY_SPAWNS, {maxOps: 500});
creep.moveTo(target);
```

```javascript
const target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
    filter: function(object) {
        return object.getActiveBodyparts(ATTACK) == 0;
    }
});
```

```javascript
const target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
    filter: { owner: { username: 'Invader' } }
});
```

```javascript
const targets = [
    Game.creeps.John,
    Game.creeps.Mike,
    room.getPositionAt(10,10)
];
const closest = creep.pos.findClosestByPath(targets);
```

查找到该位置路径最短的对象。使用<a href="http://en.wikipedia.org/wiki/Jump_point_search" target="_blank">跳点搜索（Jump Point Search）算法</a>和 <a href="http://en.wikipedia.org/wiki/Dijkstra">Dijkstra's 算法</a>进行搜索。

{% api_method_params %}
type : number
详见 <a href="#Room.find">Room.find</a>。
===
objects : array
要执行搜索的房间对象数组或者 <a href="#RoomPosition">RoomPosition</a> 对象数组。
===
opts (可选) : object
一个对象，包含了寻路选项（详见 <a href="#Room.findPath">Room.findPath</a>），或下列属性：
					<ul>
						<li>
							<div class="api-arg-title">filter</div>
							<div class="api-arg-type">object, function, string</div>
							<div class="api-arg-desc">只有通过筛选器的对象才会被使用，由 <a href="https://lodash.com/docs#filter">Lodash.filter</a> 执行筛选。</div>
						</li>
						<li>
							<div class="api-arg-title">algorithm</div>
							<div class="api-arg-type">string</div>
							<div class="api-arg-desc">下列常量之一：
								<ul>
									<li><code>astar</code> 当可能存在的目标相对较少时运行速度更快；</li>
									<li><code>dijkstra</code> 当可能存在的目标较多或者附近就有最近的目标时，速度会更快。</li>
								</ul>
								默认算法是使用启发法自行决定的。</div>
						</li>
					</ul>

{% endapi_method_params %}


### 返回值

返回找到的最近对象，没找到则返回 null。

{% api_method findClosestByRange 'type, [opts]|objects, [opts]' 2 %}

```javascript
const target = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
creep.moveTo(target);
```

```javascript
const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
    filter: function(object) {
        return object.getActiveBodyparts(ATTACK) == 0;
    }
});
```

```javascript
const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
    filter: { owner: { username: 'Invader' } }
});
```

```javascript
const targets = [
    Game.creeps.John,
    Game.creeps.Mike,
    room.getPositionAt(10,10)
];
const closest = creep.pos.findClosestByRange(targets);
```

查找到该位置线性距离最短的对象。

{% api_method_params %}
type : number
See <a href="#Room.find">Room.find</a>.
===
objects : array
要执行搜索的房间对象数组或者 <a href="#RoomPosition">RoomPosition</a> 对象数组。
===
opts (可选) : object
一个对象，包含下列选项：
					<ul>
						<li>
							<div class="api-arg-title">filter</div>
							<div class="api-arg-type">object, function, string</div>
							<div class="api-arg-desc">只有通过筛选器的对象才会被使用，由 <a href="https://lodash.com/docs#filter">Lodash.filter</a> 执行筛选。</div>
						</li>
					</ul>

{% endapi_method_params %}


### 返回值

返回找到的最近对象，没找到则返回 null。

{% api_method findInRange 'type, range, [opts]|objects, range, [opts]' 2 %}

```javascript
const targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
if(targets.length > 0) {
    creep.rangedAttack(targets[0]);
}
```

```javascript
const targets = [
    Game.creeps.John,
    Game.creeps.Mike,
    room.getPositionAt(10,10)
];
const inRangeTargets = creep.pos.findInRange(targets, 3);
```

查找在指定线性范围中的所有对象。

{% api_method_params %}
type : number
详见 <a href="#Room.find">Room.find</a>。
===
objects : array
要执行搜索的房间对象数组或者 <a href="#RoomPosition">RoomPosition</a> 对象数组。
===
range : number
范围距离（半径）。
===
opts (optional) : object
详见 <a href="#Room.find">Room.find</a>。
{% endapi_method_params %}


### 返回值

找到的对象数组。

{% api_method findPathTo 'x, y, [opts]|target, [opts]' 3 %}


```javascript
const path = creep.pos.findPathTo(target);
creep.move(path[0].direction);
```

```javascript
let path = creep.pos.findPathTo(target, {maxOps: 200});
if( !path.length || !target.equalsTo(path[path.length - 1]) ) {
    path = creep.pos.findPathTo(target,
        {maxOps: 1000, ignoreDestructibleStructures: true});
}
if( path.length ) {
    creep.move(path[0].direction);
}
```

使用 <a href="http://en.wikipedia.org/wiki/Jump_point_search" target="_blank">跳点搜索（Jump Point Search）算法</a>查找到指定位置的最佳路径。该方法是 <a href="#Room.findPath">Room.findPath</a> 的简写。如果目标在其他房间，则相应的出口将被作为目标。

{% api_method_params %}
x : number
该房间中的 X 坐标。
===
y : number
该房间中的 Y 坐标。
===
target : object
可以是 <a href="#RoomPosition">RoomPosition</a> 对象或者任何包含 <a href="#RoomPosition">RoomPosition</a> 属性的对象。
===
opts (可选) : object
一个对象，包含了寻路相关的选项标识 (查看 <a href="#Room.findPath">Room.findPath</a> 来获得更多信息)。
{% endapi_method_params %}


### 返回值

一个如下格式的路径步骤（path step）数组：
```javascript-content
[
    { x: 10, y: 5, dx: 1,  dy: 0, direction: RIGHT },
    { x: 10, y: 6, dx: 0,  dy: 1, direction: BOTTOM },
    { x: 9,  y: 7, dx: -1, dy: 1, direction: BOTTOM_LEFT },
    ...
]    
```


{% api_method getDirectionTo 'x,y|target' 1 %}

```javascript
const direction = creep.pos.getDirectionTo(target);
creep.move(direction);
```

获取到指定位置的直线方向。

{% api_method_params %}
x : number
房间中的 X 坐标。
===
y : number
房间中的 Y 坐标。
===
target : object
可以是 <a href="#RoomPosition">RoomPosition</a> 对象或者任何包含 <a href="#RoomPosition">RoomPosition</a> 属性的对象。
{% endapi_method_params %}


### 返回值

某一个方向常量的数字值。

{% api_method getRangeTo 'x,y|target' 1 %}

```javascript
const range = creep.pos.getRangeTo(target);
if(range <= 3) {
    creep.rangedAttack(target);
}
```

获取到指定位置的线性范围。

{% api_method_params %}
x : number
房间中的 X 坐标。
===
y : number
房间中的 Y 坐标。
===
target : object
可以是 <a href="#RoomPosition">RoomPosition</a> 对象或者任何包含 <a href="#RoomPosition">RoomPosition</a> 属性的对象。
{% endapi_method_params %}


### 返回值

到指定位置的地块数。

{% api_method inRangeTo 'x, y, range|target, range' 1 %}

```javascript
if(creep.pos.inRangeTo(target, 3)) {
    creep.rangedAttack(target);
}
```

检查该位置是否在其他位置的指定范围内。

{% api_method_params %}
x : number
房间中的 X 坐标。
===
y : number
房间中的 Y 坐标。
===
target : <a href="#RoomPosition">RoomPosition</a>
目标位置
===
range : number
范围距离（半径）。
{% endapi_method_params %}


### 返回值

一个布尔值。

{% api_method isEqualTo 'x,y|target' 1 %}

```javascript
if(creep.pos.isEqualTo(10,25)) {
    creep.move(RIGHT);
}
```

```javascript
if(creep.pos.isEqualTo(Game.flags.Flag1)) {
    creep.move(RIGHT);
}
```

检查该位置是否和指定位置相同。

{% api_method_params %}
x : number
房间中的 X 坐标。
===
y : number
房间中的 Y 坐标。
===
target : object
可以是 <a href="#RoomPosition">RoomPosition</a> 对象或者任何包含 <a href="#RoomPosition">RoomPosition</a> 属性的对象。
{% endapi_method_params %}


### 返回值

一个布尔值。

{% api_method isNearTo 'x,y|target' 1 %}

```javascript
if(creep.pos.isNearTo(target)) {
    creep.transfer(target, RESOURCE_ENERGY);
}
```

检查该位置是否在紧邻指定位置的正方形区域内。类似于 <code>inRangeTo(target, 1)</code>。

{% api_method_params %}
x : number
房间中的 X 坐标。
===
y : number
房间中的 Y 坐标。
===
target : object
可以是 <a href="#RoomPosition">RoomPosition</a> 对象或者任何包含 <a href="#RoomPosition">RoomPosition</a> 属性的对象。
{% endapi_method_params %}


### 返回值

一个布尔值。

{% api_method look '' 2 %}

```javascript
const look = Game.flags.Flag1.pos.look();
look.forEach(function(lookObject) {
    if(lookObject.type == LOOK_CREEPS &&
       lookObject[LOOK_CREEPS].getActiveBodyparts(ATTACK) == 0) {
        creep.moveTo(lookObject.creep);
    }
});
```

获取位于该位置的对象列表。



### 返回值

如下格式的数组，元素为位于该位置的所有对象。

```javascript-content
[
    { type: 'creep', creep: {...} },
    { type: 'structure', structure: {...} },
    ...
    { type: 'terrain', terrain: 'swamp' }
]
```


{% api_method lookFor 'type' 1 %}

```javascript
const found = Game.flags.Flag1.pos.lookFor(LOOK_CREEPS);
if(found.length && found[0].getActiveBodyparts(ATTACK) == 0) {
    creep.moveTo(found[0]);
}
```

获取该位置上给定类型的对象列表。

{% api_method_params %}
type : string
<code>LOOK_*</code> 常量之一。
{% endapi_method_params %}


### 返回值

在该位置上找到的指定类型的对象数组。
