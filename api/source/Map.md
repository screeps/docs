# Game.map

A global object representing world map. Use it to navigate between rooms. The object is accessible via [`Game.map`](#Game.map) property.


{% api_method Game.map.describeExits 'roomName' 1 %}

```javascript
const exits = Game.map.describeExits('W8N3');
```

List all exits available from the room with the given name.

{% api_method_params %}
roomName : string
The room name.
{% endapi_method_params %}


### Return value

The exits information in the following format, or null if the room not found.

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
    // go to some place in another room
}
```

```javascript
creep.moveTo(new RoomPosition(25, 25, anotherRoomName));
```

Find the exit direction from the given room en route to another room.

{% api_method_params %}
fromRoom : string, <a href="#Room">Room</a>
Start room name or room object.
===
toRoom : string, <a href="#Room">Room</a>
Finish room name or room object.
===
opts (optional) : object
An object with the pathfinding options. See <code><a href="#findRoute">findRoute</a></code>.
{% endapi_method_params %}


### Return value

The room direction constant, one of the following:

* `FIND_EXIT_TOP`
* `FIND_EXIT_RIGHT`
* `FIND_EXIT_BOTTOM`
* `FIND_EXIT_LEFT`
			
Or one of the following error codes:
{% api_return_codes %}
ERR_NO_PATH | Path can not be found.
ERR_INVALID_ARGS | The location is incorrect.
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
		if(roomName == 'W10S10') {	// avoid this room
			return Infinity;
		}
		return 1;
	}});
```

```javascript
let from = new RoomPosition(25, 25, 'E1N1');
let to = new RoomPosition(25, 25, 'E4N1');

// Use `findRoute` to calculate a high-level plan for this path,
// prioritizing highways and owned rooms
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

// Invoke PathFinder, allowing access only to rooms from `findRoute`
let ret = PathFinder.search(from, to, {
	roomCallback(roomName) {
		if (allowedRooms[roomName] === undefined) {
			return false;
		}
	}
});

console.log(ret.path);
```

Find route from the given room to another room.

{% api_method_params %}
fromRoom : string, <a href="#Room">Room</a>
Start room name or room object.
===
toRoom : string, <a href="#Room">Room</a>
Finish room name or room object.
===
opts (optional) : object
An object with the following options:
					<ul>
						<li>
							<div class="api-arg-title">routeCallback</div>
							<div class="api-arg-type">function</div>
							<div class="api-arg-desc">This callback accepts two arguments: <code>function(roomName, fromRoomName)</code>. It can be used to calculate the cost of entering that room. You can use this to do things like prioritize your own rooms, or avoid some rooms. You can return a floating point cost or <code>Infinity</code> to block the room.</div>
						</li>
					</ul>
				
{% endapi_method_params %}


### Return value

The route array in the following format:

```javascript-content
[
    { exit: FIND_EXIT_RIGHT, room: 'arena21' },
    { exit: FIND_EXIT_BOTTOM, room: 'arena22' },
    ...
]
```

Or one of the following error codes:
{% api_return_codes %}
ERR_NO_PATH | Path can not be found.
{% endapi_return_codes %}



{% api_method Game.map.getRoomLinearDistance 'roomName1, roomName2, [continuous]' 0 %}

```javascript
Game.map.getRoomLinearDistance('W1N1', 'W4N2'); // 3
Game.map.getRoomLinearDistance('E65S55','W65S55', false) // 131
Game.map.getRoomLinearDistance('E65S55','W65S55', true) // 11
```

Get the linear distance (in rooms) between two rooms. You can use this function to estimate the energy cost of sending resources through terminals, or using observers and nukes.

{% api_method_params %}
roomName1 : string
The name of the first room.
===
roomName2 : string
The name of the second room.
===
continuous (optional) : boolean
Whether to treat the world map continuous on borders. Set to true if you want to calculate the trade or terminal send cost. Default is false.
{% endapi_method_params %}


### Return value

A number of rooms between the given two rooms.

{% api_method Game.map.getTerrainAt 'x, y, roomName|pos' 1 %}

```javascript
console.log(Game.map.getTerrainAt(25,20,'W10N10'));
```

```javascript
console.log(Game.map.getTerrainAt(new RoomPosition(25,20,'W10N10'));
```

Get terrain type at the specified room position. This method works for any room in the world even if you have no access to it.

{% api_method_params %}
x : number
X position in the room.
===
y : number
Y position in the room.
===
roomName : string
The room name.
===
pos : <a href="#RoomPosition">RoomPosition</a>
The position object.
{% endapi_method_params %}


### Return value

One of the following string values:
<ul>
				<li><code>plain</code></li>
				<li><code>swamp</code></li>
				<li><code>wall</code></li>
			</ul>


{% api_method Game.map.isRoomAvailable 'roomName' 2 %}

```javascript
if(Game.map.isRoomAvailable(room.name)) {
    creep.moveTo(room.getPositionAt(25,25));
}
```

Check if the room is available to move into.

{% api_method_params %}
roomName : string
The room name.
{% endapi_method_params %}


### Return value

A boolean value.
