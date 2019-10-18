# Game.map

世界地图对象，用于在房间之间导航。


{% api_method Game.map.describeExits 'roomName' 1 %}

```javascript
const exits = Game.map.describeExits('W8N3');
```

根据给定的房间名列出所有可用的出口。

{% api_method_params %}
roomName : string
房间名。
{% endapi_method_params %}


### 返回值

出口信息按照以下格式给出，在房间不存在时返回null。

```javascript-content
{
    "1": "W8N4",    // TOP
    "3": "W7N3",    // RIGHT
	"5": "W8N2",    // BOTTOM
	"7": "W9N3"     // LEFT
}
```


{% api_method Game.map.findExit 'fromRoom, toRoom, [opts]' 3 %}

```javascript
if(creep.room != anotherRoomName) {
    const exitDir = Game.map.findExit(creep.room, anotherRoomName);
    const exit = creep.pos.findClosestByRange(exitDir);
    creep.moveTo(exit);
}
else {
    // 到另一个房间的某处去
}
```

```javascript
creep.moveTo(new RoomPosition(25, 25, anotherRoomName));
```

查找从给定房间到另一个房间的出口方向。

{% api_method_params %}
fromRoom : string, <a href="#Room">Room</a>
起点房间名或房间对象。
===
toRoom : string, <a href="#Room">Room</a>
终点房间名或房间对象。
===
opts (optional) : object
包含寻路选项的对象。参见<code><a href="#findRoute">findRoute</a></code>。
{% endapi_method_params %}


### 返回值

房间方向常量，下列之一：

* `FIND_EXIT_TOP`
* `FIND_EXIT_RIGHT`
* `FIND_EXIT_BOTTOM`
* `FIND_EXIT_LEFT`
			
或下列错误码：
{% api_return_codes %}
ERR_NO_PATH | 找不到路径。
ERR_INVALID_ARGS | 位置不正确。
{% endapi_return_codes %}



{% api_method Game.map.findRoute 'fromRoom, toRoom, [opts]' 3 %}

```javascript
const route = Game.map.findRoute(creep.room, anotherRoomName);
if(route.length > 0) {
    console.log('Now heading to room '+route[0].room);
    const exit = creep.pos.findClosestByRange(route[0].exit);
    creep.moveTo(exit);
}
```

```javascript
const route = Game.map.findRoute(creep.room, anotherRoomName, {
	routeCallback(roomName, fromRoomName) {
		if(roomName == 'W10S10') {	// 回避这个房间
			return Infinity;
		}
		return 1;
	}});
```

```javascript
let from = new RoomPosition(25, 25, 'E1N1');
let to = new RoomPosition(25, 25, 'E4N1');

// 使用`findRoute`计算路径的高阶计划，优先选择大路和自有房间
let allowedRooms = { [ from.roomName ]: true };
Game.map.findRoute(from.roomName, to.roomName, {
	routeCallback(roomName) {
		let parsed = /^[WE]([0-9]+)[NS]([0-9]+)$/.exec(roomName);
		let isHighway = (parsed[1] % 10 === 0) || 
		                (parsed[2] % 10 === 0);
		let isMyRoom = Game.rooms[roomName] &&
			Game.rooms[roomName].controller &&
			Game.rooms[roomName].controller.my;
		if (isHighway || isMyRoom) {
			return 1;
		} else {
			return 2.5;
		}
	}
}).forEach(function(info) {
	allowedRooms[info.room] = true;
});

// 调用PathFinder, 只允许访问`findRoute`中的房间
let ret = PathFinder.search(from, to, {
	roomCallback(roomName) {
		if (allowedRooms[roomName] === undefined) {
			return false;
		}
	}
});

console.log(ret.path);
```

查找从给定房间到另一个房间的路径。

{% api_method_params %} 
fromRoom : string, <a href="#Room">Room</a>
起点房间名或房间对象。
===
toRoom : string, <a href="#Room">Room</a>
终点房间名或房间对象。
===
opts (optional) : object
包含下列选项的对象：
					<ul>
						<li>
							<div class="api-arg-title">routeCallback</div>
							<div class="api-arg-type">function</div>
							<div class="api-arg-desc">这个回调函数接受两个参数： <code>function(roomName, fromRoomName)</code>。 它可以用来计算进入一个房间的开销。你可以用它实现优先进入自己的房间或者回避某些房间等功能。你应该返回一个浮点数开销，或者返回<code>Infinity</code>代表不可进入。</div>
						</li>
					</ul>
				
{% endapi_method_params %}


### 返回值

如下格式的路径数组：

```javascript-content
[
    { exit: FIND_EXIT_RIGHT, room: 'arena21' },
    { exit: FIND_EXIT_BOTTOM, room: 'arena22' },
    ...
]
```

或如下错误码之一：
{% api_return_codes %}
ERR_NO_PATH | 找不到路径。
{% endapi_return_codes %}



{% api_method Game.map.getRoomLinearDistance 'roomName1, roomName2, [continuous]' 0 %}

```javascript
Game.map.getRoomLinearDistance('W1N1', 'W4N2'); // 3
Game.map.getRoomLinearDistance('E65S55','W65S55', false) // 131
Game.map.getRoomLinearDistance('E65S55','W65S55', true) // 11
```

获取两个房间之间直线距离（房间数）。你可以使用这个函数估算使用终端发送资源的能源开销，或用于使用观察者和核武器。

{% api_method_params %}
roomName1 : string
第一个房间名。
===
roomName2 : string
第二个房间名。
===
continuous (optional) : boolean
是否视世界地图为在边界连续。 如果要计算交易或终端发送开销，请设置为true。 默认值为false。
{% endapi_method_params %}


### 返回值

给定两个房间之间的房间数。


{% api_method Game.map.getRoomTerrain 'roomName' 0 %}

```javascript
const terrain = Game.map.getRoomTerrain("E2S7");
switch(terrain.get(10,15)) {
    case TERRAIN_MASK_WALL:
        break;
    case TERRAIN_MASK_SWAMP:
        break;
    case 0:
        break;
}
```

获取<a href="#Room-Terrain">`Room.Terrain` </a>对象，快捷访问静态地形数据。此方法适用于所有房间，哪怕是无法访问的房间。

{% api_method_params %}
roomName : string
房间名。
{% endapi_method_params %}


### 返回值

一个新<a href="#Room-Terrain">`Room.Terrain`</a>对象。


{% api_method Game.map.getTerrainAt 'x, y, roomName|pos' 1 '{"deprecated": "请使用更高效的方法[`Game.map.getRoomTerrain`](#Game.map.getRoomTerrain)替代."}'%}

```javascript
console.log(Game.map.getTerrainAt(25,20,'W10N10'));
```

```javascript
console.log(Game.map.getTerrainAt(new RoomPosition(25,20,'W10N10'));
```

获取指定房间坐标的地形类型。此方法适用于所有房间，哪怕是无法访问的房间。

{% api_method_params %}
x : number
房间内X坐标。
===
y : number
房间内Y坐标。
===
roomName : string
房间名。
===
pos : <a href="#RoomPosition">RoomPosition</a>
坐标对象。
{% endapi_method_params %}


### 返回值

下列字符串值：
<ul>
				<li><code>plain</code></li>
				<li><code>swamp</code></li>
				<li><code>wall</code></li>
			</ul>


{% api_method Game.map.getWorldSize 0 %}

返回世界尺寸，即世界对角之间的房间数。例如对于一个从 W50N50 至 E50S50 的世界这个方法返回102。

{% api_method Game.map.isRoomAvailable 'roomName' 2 %}

```javascript
if(Game.map.isRoomAvailable(room.name)) {
    creep.moveTo(room.getPositionAt(25,25));
}
```

检查一个房间是否可以进入。

{% api_method_params %}
roomName : string
The room name.
{% endapi_method_params %}


### 返回值

布尔值
