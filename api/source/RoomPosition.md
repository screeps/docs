# RoomPosition

An object representing the specified position in the room. Every `RoomObject` in the room 
contains `RoomPosition` as the `pos` property. The position object of a custom location 
can be obtained using the [`Room.getPositionAt`](#Room.getPositionAt) method or using the constructor.

{% api_method constructor 'x, y, roomName' 0 %}

```javascript
const pos = new RoomPosition(10, 25, 'sim');

```

You can create new <code>RoomPosition</code> object using its constructor.

{% api_method_params %}
x : number
X position in the room.
===
y : number
Y position in the room.
===
roomName : string
The room name.
{% endapi_method_params %}



{% api_property roomName 'string' %}



The name of the room.



{% api_property x 'number' %}



X position in the room.



{% api_property y 'number' %}



Y position in the room. 
 

{% api_method createConstructionSite 'structureType' A %}

```javascript
Game.flags.Flag1.pos.createConstructionSite(STRUCTURE_ROAD);
```

Create new <a href="#ConstructionSite">ConstructionSite</a> at the specified location.

{% api_method_params %}
structureType : string
One of the <code>STRUCTURE_*</code> constants.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_INVALID_TARGET | The structure cannot be placed at the specified location.
ERR_FULL | You have too many construction sites. The maximum number of construction sites per player is 100.
ERR_INVALID_ARGS | The location is incorrect.
ERR_RCL_NOT_ENOUGH | Room Controller Level insufficient. <a href="/hc/en-us/articles/203086021-Territory-control">Learn more</a>
{% endapi_return_codes %}



{% api_method createFlag '[name], [color], [secondaryColor]' A %}

```javascript
creep.pos.createFlag('Flag1');
```

Create new <a href="#Flag">Flag</a> at the specified location.

{% api_method_params %}
name (optional) : string
The name of a new flag. It should be unique, i.e. the <code>Game.flags</code> object should not contain another flag with the same name (hash key). If not defined, a random name will be generated.
===
color (optional) : string
The color of a new flag. Should be one of the <code>COLOR_*</code> constants. The default value is <code>COLOR_WHITE</code>.
===
secondaryColor (optional) : string
The secondary color of a new flag. Should be one of the <code>COLOR_*</code> constants. The default value is equal to <code>color</code>.
{% endapi_method_params %}


### Return value

The name of a new flag, or one of the following error codes:
<br>

{% api_return_codes %}
ERR_NAME_EXISTS | There is a flag with the same name already.
ERR_INVALID_ARGS | The location or the color constant is incorrect.
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

Find an object with the shortest path from the given position. Uses <a href="http://en.wikipedia.org/wiki/Jump_point_search" target="_blank">Jump Point Search algorithm</a> and <a href="http://en.wikipedia.org/wiki/Dijkstra">Dijkstra's algorithm</a>.

{% api_method_params %}
type : number
See <a href="#Room.find">Room.find</a>.
===
objects : array
An array of room's objects or <a href="#RoomPosition">RoomPosition</a> objects that the search should be executed against.
===
opts (optional) : object
An object containing pathfinding options (see <a href="#Room.findPath">Room.findPath</a>), or one of the following:
					<ul>
						<li>
							<div class="api-arg-title">filter</div>
							<div class="api-arg-type">object, function, string</div>
							<div class="api-arg-desc">Only the objects which pass the filter using the <a href="https://lodash.com/docs#filter">Lodash.filter</a> method will be used.</div>
						</li>
						<li>
							<div class="api-arg-title">algorithm</div>
							<div class="api-arg-type">string</div>
							<div class="api-arg-desc">One of the following constants:
								<ul>
									<li><code>astar</code> is faster when there are relatively few possible targets;</li>
									<li><code>dijkstra</code> is faster when there are a lot of possible targets or when the closest target is nearby.</li>
								</ul>
								The default value is determined automatically using heuristics.</div>
						</li>
					</ul>
				
{% endapi_method_params %}


### Return value

The closest object if found, null otherwise.

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

Find an object with the shortest linear distance from the given position.

{% api_method_params %}
type : number
See <a href="#Room.find">Room.find</a>.
===
objects : array
An array of room's objects or <a href="#RoomPosition">RoomPosition</a> objects that the search should be executed against.
===
opts (optional) : object
An object containing one of the following options:
					<ul>
						<li>
							<div class="api-arg-title">filter</div>
							<div class="api-arg-type">object, function, string</div>
							<div class="api-arg-desc">Only the objects which pass the filter using the <a href="https://lodash.com/docs#filter">Lodash.filter</a> method will be used.</div>
						</li>
					</ul>
				
{% endapi_method_params %}


### Return value

The closest object if found, null otherwise.

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

Find all objects in the specified linear range.

{% api_method_params %}
type : number
See <a href="#Room.find">Room.find</a>.
===
objects : array
An array of room's objects or <a href="#RoomPosition">RoomPosition</a> objects that the search should be executed against.
===
range : number
The range distance.
===
opts (optional) : object
See <a href="#Room.find">Room.find</a>.
{% endapi_method_params %}


### Return value

An array with the objects found.

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

Find an optimal path to the specified position using <a href="http://en.wikipedia.org/wiki/Jump_point_search" target="_blank">Jump Point Search algorithm</a>. This method is a shorthand for <a href="#Room.findPath">Room.findPath</a>. If the target is in another room, then the corresponding exit will be used as a target.

{% api_method_params %}
x : number
X position in the room.
===
y : number
Y position in the room.
===
target : object
Can be a <a href="#RoomPosition">RoomPosition</a> object or any object containing <a href="#RoomPosition">RoomPosition</a>.
===
opts (optional) : object
An object containing pathfinding options flags (see <a href="#Room.findPath">Room.findPath</a> for more details).
{% endapi_method_params %}


### Return value

An array with path steps in the following format:
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

Get linear direction to the specified position.

{% api_method_params %}
x : number
X position in the room.
===
y : number
Y position in the room.
===
target : object
Can be a <a href="#RoomPosition">RoomPosition</a> object or any object containing <a href="#RoomPosition">RoomPosition</a>.
{% endapi_method_params %}


### Return value

A number representing one of the direction constants.

{% api_method getRangeTo 'x,y|target' 1 %}

```javascript
const range = creep.pos.getRangeTo(target);
if(range <= 3) {
    creep.rangedAttack(target);
}
```

Get linear range to the specified position.

{% api_method_params %}
x : number
X position in the room.
===
y : number
Y position in the room.
===
target : object
Can be a <a href="#RoomPosition">RoomPosition</a> object or any object containing <a href="#RoomPosition">RoomPosition</a>.
{% endapi_method_params %}


### Return value

A number of squares to the given position.

{% api_method inRangeTo 'x, y, range|target, range' 1 %}

```javascript
if(creep.pos.inRangeTo(target, 3)) {
    creep.rangedAttack(target);
}
```

Check whether this position is in the given range of another position.

{% api_method_params %}
x : number
X position in the same room.
===
y : number
Y position in the same room.
===
target : <a href="#RoomPosition">RoomPosition</a>
The target position.
===
range : number
The range distance.
{% endapi_method_params %}


### Return value

A boolean value.

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

Check whether this position is the same as the specified position.

{% api_method_params %}
x : number
X position in the room.
===
y : number
Y position in the room.
===
target : object
Can be a <a href="#RoomPosition">RoomPosition</a> object or any object containing <a href="#RoomPosition">RoomPosition</a>.
{% endapi_method_params %}


### Return value

A boolean value.

{% api_method isNearTo 'x,y|target' 1 %}

```javascript
if(creep.pos.isNearTo(target)) {
    creep.transferEnergy(target);
}
```

Check whether this position is on the adjacent square to the specified position. The same as <code>inRangeTo(target, 1)</code>.

{% api_method_params %}
x : number
X position in the room.
===
y : number
Y position in the room.
===
target : object
Can be a <a href="#RoomPosition">RoomPosition</a> object or any object containing <a href="#RoomPosition">RoomPosition</a>.
{% endapi_method_params %}


### Return value

A boolean value.

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

Get the list of objects at the specified room position.



### Return value

An array with objects at the specified position in the following format:

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

Get an object with the given type at the specified room position.

{% api_method_params %}
type : string
One of the <code>LOOK_*</code> constants.
{% endapi_method_params %}


### Return value

An array of objects of the given type at the specified position if found.
