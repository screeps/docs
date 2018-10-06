# Room

An object representing the room in which your units and structures are in.
It can be used to look around, find paths, etc. Every `RoomObject` in the room contains
its linked `Room` instance in the `room` property.

{% api_property controller '<a href="#StructureController">StructureController</a>' %}



The Controller structure of this room, if present, otherwise undefined.



{% api_property energyAvailable 'number' %}



Total amount of energy available in all spawns and extensions in the room.



{% api_property energyCapacityAvailable 'number' %}



Total amount of <code>energyCapacity</code> of all spawns and extensions in the room.


{% api_property memory 'any' %}

```javascript
room.memory.stage = 2;
```

A shorthand to <code>Memory.rooms[room.name]</code>. You can use it for quick access the room’s specific memory data object. <a href="/global-objects.html#Memory-object">Learn more about memory</a>



{% api_property name 'string' %}



The name of the room.



{% api_property storage '<a href="#StructureStorage">StructureStorage</a>' %}



The Storage structure of this room, if present, otherwise undefined.



{% api_property terminal '<a href="#StructureTerminal">StructureTerminal</a>' %}



The Terminal structure of this room, if present, otherwise undefined.



{% api_property visual '<a href="#RoomVisual">RoomVisual</a>' %}



A <a href="#RoomVisual">RoomVisual</a> object for this room. You can use this object to draw simple shapes (lines, circles, text labels) in the room.



{% api_method Room.serializePath 'path' 1 %}

```javascript
const path = spawn.pos.findPathTo(source);
Memory.path = Room.serializePath(path);
creep.moveByPath(Memory.path);
```

Serialize a path array into a short string representation, which is suitable to store in memory.

{% api_method_params %}
path : array
A path array retrieved from <code><a href="#Room.findPath">Room.findPath</a></code>.
{% endapi_method_params %}


### Return value

A serialized string form of the given path.

{% api_method Room.deserializePath 'path' 1 %}

```javascript
const path = Room.deserializePath(Memory.path);
creep.moveByPath(path);
```

Deserialize a short string path representation into an array form.

{% api_method_params %}
path : string
A serialized path string.
{% endapi_method_params %}


### Return value

A path array.

{% api_method createConstructionSite 'x, y, structureType, [name]|pos, structureType, [name]' A %}

```javascript
Game.rooms.sim.createConstructionSite(10, 15, STRUCTURE_ROAD);
```

```javascript
Game.rooms.sim.createConstructionSite(10, 15, STRUCTURE_SPAWN, 
    'MySpawn2');
```

Create new <a href="#ConstructionSite">ConstructionSite</a> at the specified location.

{% api_method_params %}
x : number
The X position.
===
y : number
The Y position.
===
pos : object
Can be a <a href="#RoomPosition">RoomPosition</a> object or any object containing <a href="#RoomPosition">RoomPosition</a>.
===
structureType : string
One of the <code>STRUCTURE_*</code> constants.
===
name (optional) : string
The name of the structure, for structures that support it (currently only spawns).
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_INVALID_TARGET | The structure cannot be placed at the specified location.
ERR_FULL | You have too many construction sites. The maximum number of construction sites per player is 100.
ERR_INVALID_ARGS | The location is incorrect.
ERR_RCL_NOT_ENOUGH | Room Controller Level insufficient. <a href="/control.html">Learn more</a>
{% endapi_return_codes %}



{% api_method createFlag 'x, y, [name], [color], [secondaryColor]|pos, [name], [color], [secondaryColor]' A %}

```javascript
Game.rooms.sim.createFlag(5, 12, 'Flag1');
```

Create new <a href="#Flag">Flag</a> at the specified location.

{% api_method_params %}
x : number
The X position.
===
y : number
The Y position.
===
pos : object
Can be a <a href="#RoomPosition">RoomPosition</a> object or any object containing <a href="#RoomPosition">RoomPosition</a>.
===
name (optional) : string
The name of a new flag. It should be unique, i.e. the <code>Game.flags</code> object should not contain another flag with the same name (hash key). If not defined, a random name will be generated. The maximum length is 60 characters.
===
color (optional) : string
The color of a new flag. Should be one of the <code>COLOR_*</code> constants. The default value is <code>COLOR_WHITE</code>.
===
secondaryColor (optional) : string
The secondary color of a new flag. Should be one of the <code>COLOR_*</code> constants. The default value is equal to <code>color</code>.
{% endapi_method_params %}


### Return value

The name of a new flag, or one of the following error codes:
{% api_return_codes %}
ERR_NAME_EXISTS | There is a flag with the same name already.
ERR_INVALID_ARGS | The location or the color constant is incorrect.
ERR_FULL | You have too many flags. The maximum number of flags per player is 10000.
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

Find all objects of the specified type in the room.

{% api_method_params %}
type : number
One of the <code>FIND_*</code> constants.
===
opts (optional) : object
An object with additional options:
					<ul>
						<li>
							<div class="api-arg-title">filter</div>
							<div class="api-arg-type">object, function, string</div>
							<div class="api-arg-desc">The result list will be filtered using the <a href="https://lodash.com/docs#filter">Lodash.filter</a> method.</div>
						</li>
					</ul>

{% endapi_method_params %}


### Return value

An array with the objects found.

{% api_method findExitTo 'room' 3 %}

```javascript
const exitDir = creep.room.findExitTo(anotherCreep.room);
const exit = creep.pos.findClosestByRange(exitDir);
creep.moveTo(exit);

// or simply:
creep.moveTo(anotherCreep);
creep.moveTo(new RoomPosition(25,25, anotherCreep.pos.roomName));
```

Find the exit direction en route to another room. Please note that this method is not required for inter-room movement, you can simply pass the target in another room into <a href="#Creep.moveTo"><code>Creep.moveTo</code></a> method.

{% api_method_params %}
room : string, <a href="#Room">Room</a>
Another room name or room object.
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
		    // set anotherCreep's location as walkable
			costMatrix.set(anotherCreep.pos.x, anotherCreep.pos.y, 0);
			// set flag location as an obstacle
			costMatrix.set(flag.pos.x, flag.pos.y, 255);
			// increase cost for (25,20) location to 50
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

Find an optimal path inside the room between fromPos and toPos using <a href="http://en.wikipedia.org/wiki/Jump_point_search" target="_blank">Jump Point Search algorithm</a>.

{% api_method_params %}
fromPos : <a href="#RoomPosition">RoomPosition</a>
The start position.
===
toPos : <a href="#RoomPosition">RoomPosition</a>
The end position.
===
opts (optional) : object
An object containing additonal pathfinding flags:
<ul>
    <li>
        <div class="api-arg-title">ignoreCreeps</div>
        <div class="api-arg-type">boolean</div>
        <div class="api-arg-desc">Treat squares with creeps as walkable. Can be useful with too many moving creeps around or in some other cases. The default value is false.</div>
    </li>
    <li>
        <div class="api-arg-title">ignoreDestructibleStructures</div>
        <div class="api-arg-type">boolean</div>
        <div class="api-arg-desc">Treat squares with destructible structures (constructed walls, ramparts, spawns, extensions) as walkable. The default value is false.</div>
    </li>
    <li>
        <div class="api-arg-title">ignoreRoads</div>
        <div class="api-arg-type">boolean</div>
        <div class="api-arg-desc">Ignore road structures. Enabling this option can speed up the search. The default value is false. This is only used when the new <a href="#PathFinder"><code>PathFinder</code></a> is enabled.</div>
    </li>
    <li>
        <div class="api-arg-title">costCallback</div>
        <div class="api-arg-type">function(string, CostMatrix)</div>
        <div class="api-arg-desc">You can use this callback to modify a <a href="#PathFinder-CostMatrix"><code>CostMatrix</code></a> for any room during the search. The callback accepts two arguments, <code>roomName</code> and <code>costMatrix</code>. Use the <code>costMatrix</code> instance to make changes to the positions costs. If you return a new matrix from this callback, it will be used instead of the built-in cached one. This option is only used when the new <a href="#PathFinder"><code>PathFinder</code></a> is enabled.</div>
    </li>
    <li>
        <div class="api-arg-title">ignore</div>
        <div class="api-arg-type">array</div>
        <div class="api-arg-desc">An array of the room's objects or <a href="#RoomPosition">RoomPosition</a> objects which should be treated as walkable tiles during the search. This option cannot be used when the new <a href="#PathFinder"><code>PathFinder</code></a> is enabled (use <code>costCallback</code> option instead).</div>
    </li>
    <li>
        <div class="api-arg-title">avoid</div>
        <div class="api-arg-type">array</div>
        <div class="api-arg-desc">An array of the room's objects or <a href="#RoomPosition">RoomPosition</a> objects which should be treated as obstacles during the search. This option cannot be used when the new <a href="#PathFinder"><code>PathFinder</code></a> is enabled (use <code>costCallback</code> option instead).</div>
    </li>
    <li>
        <div class="api-arg-title">maxOps</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">The maximum limit of possible pathfinding operations. You can limit CPU time used for the search based on ratio 1 op ~ 0.001 CPU. The default value is 2000.</div>
    </li>
    <li>
        <div class="api-arg-title">heuristicWeight</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">Weight to apply to the heuristic in the A* formula <code>F = G + weight * H</code>. Use this option only if you understand the underlying A* algorithm mechanics! The default value is 1.2.</div>
    </li>
    <li>
        <div class="api-arg-title">serialize</div>
        <div class="api-arg-type">boolean</div>
        <div class="api-arg-desc">If true, the result path will be serialized using <code><a href="#Room.serializePath">Room.serializePath</a></code>. The default is false.</div>
    </li>
    <li>
        <div class="api-arg-title">maxRooms</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">The maximum allowed rooms to search. The default (and maximum) is 16. This is only used when the new <a href="#PathFinder"><code>PathFinder</code></a> is enabled.</div>
    </li>
    <li>
        <div class="api-arg-title">range</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">Find a path to a position in specified linear range of target. The default is 0.</div>
    </li>
    <li>
        <div class="api-arg-title">plainCost</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">Cost for walking on plain positions. The default is 1.</div>
    </li>
    <li>
        <div class="api-arg-title">swampCost</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">Cost for walking on swamp positions. The default is 5.</div>
    </li>
</ul>

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

{% api_method getEventLog '[raw]' 1 %}

```javascript
// track events performed by a particular creep
_.filter(creep.room.getEventLog(), {objectId: creep.id});
```

```javascript
// Find all hostile actions against your creeps and structures
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

Returns an array of events happened on the previous tick in this room.  

{% api_method_params %}
raw : boolean
If this parameter is false or undefined, the method returns an object parsed using `JSON.parse` which incurs some CPU cost on the first access (the return value is cached on subsequent calls). If `raw` is truthy, then raw JSON in string format is returned.
{% endapi_method_params %}


### Return value

An array of events. Each event represents some game action in the following format:
 
```javascript-content
{
    event: EVENT_ATTACK,
    objectId: '54bff72ab32a10f73a57d017',
    data: { /* ... */ }
}
```

The `data` property is different for each event type according to the following table:
<table>
    <tr>
        <th>event</th><th>description</th>
    </tr>
    <tr>
        <td>`EVENT_ATTACK`</td>
        <td>
            A creep or a structure performed an attack to another object.
            <ul>
                <li>`targetId` - the target object ID</li>
                <li>`damage` - the amount of hits damaged</li>
                <li>`attackType` - one of the following constants:
                    <ul>
                        <li>`EVENT_ATTACK_TYPE_MELEE` - a creep attacked with [attack](#Creep.attack)</li>
                        <li>`EVENT_ATTACK_TYPE_RANGED` - a creep attacked with [rangedAttack](#Creep.rangedAttack), or a tower attacked with [attack](#StructureTower.attack)</li> 
                        <li>`EVENT_ATTACK_TYPE_RANGED_MASS` - a creep attacked with [rangedMassAttack](#Creep.rangedMassAttack)</li>
                        <li>`EVENT_ATTACK_TYPE_DISMANTLE` - a creep attacked with [dismantle](#Creep.dismantle)</li>
                        <li>`EVENT_ATTACK_TYPE_HIT_BACK` - a creep hit back on another creep's [attack](#Creep.attack)</li>
                        <li>`EVENT_ATTACK_TYPE_NUKE` - a nuke landed</li>
                    </ul>
                </li></ul>
        </td>
    </tr>
    <tr>
        <td>`EVENT_OBJECT_DESTROYED`</td>
        <td>
            A game object is destroyed or killed.
            <ul><li>`type` - the type of the destroyed object</li></ul>
        </td>
    </tr>
    <tr>
        <td>`EVENT_ATTACK_CONTROLLER`</td>
        <td>A creep performed [`attackController`](#Creep.attackController) in the room.</td>
    </tr>
    <tr>
        <td>`EVENT_BUILD`</td>
        <td>
            A creep performed [`build`](#Creep.build) in the room.
            <ul>
                <li>`targetId` - the target object ID</li>
                <li>`amount` - the amount of build progress gained</li>
                <li>`energySpent` - the energy amount spent on the operation</li></ul>
        </td>
    </tr>
    <tr>
        <td>`EVENT_HARVEST`</td>
        <td>
            A creep performed [`harvest`](#Creep.harvest) in the room.
            <ul>
                <li>`targetId` - the target object ID</li>
                <li>`amount` - the amount of resource harvested</li></ul>
        </td>
    </tr>
    <tr>
        <td>`EVENT_HEAL`</td>
        <td>
            A creep or a tower healed a creep.
            <ul>
                <li>`targetId` - the target object ID</li>
                <li>`amount` - the amount of hits healed</li>
                <li>`healType` - one of the following constants:
                    <ul>
                        <li>`EVENT_HEAL_TYPE_MELEE` - a creep healed with [heal](#Creep.heal)</li>
                        <li>`EVENT_HEAL_TYPE_RANGED` - a creep healed with [rangedHeal](#Creep.rangedHeal), or a tower healed with [heal](#StructureTower.heal)</li>
                    </ul>
                </li></ul>
        </td>
    </tr>
    <tr>
        <td>`EVENT_REPAIR`</td>
        <td>
            A creep or a tower repaired a structure.
            <ul>
                <li>`targetId` - the target object ID</li>
                <li>`amount` - the amount of hits repaired</li> 
                <li>`energySpent` - the energy amount spent on the operation</li></ul>
            </ul>
        </td>
    </tr>        
    <tr>
        <td>`EVENT_RESERVE_CONTROLLER`</td>
        <td>
            A creep performed [`reserveController`](#Creep.reserveController) in the room.
            <ul>
                <li>`amount` - the amount of reservation time gained</li></ul>
        </td>
    </tr> 
    <tr>
        <td>`EVENT_UPGRADE_CONTROLLER`</td>
        <td>
            A creep performed [`upgradeController`](#Creep.upgradeController) in the room.
            <ul>
                <li>`amount` - the amount of control points gained</li> 
                <li>`energySpent` - the energy amount spent on the operation</li></ul>
            </ul>
        </td>
    </tr>    
    <tr>
        <td>`EVENT_EXIT`</td>
        <td>
            A creep moved to another room.
            <ul>
                <li>`room` - the name of the target room</li> 
                <li>`x`, `y` - the coordinates in another room where the creep has appeared</li></ul>
            </ul>
        </td>
    </tr>           
</table>

{% api_method getPositionAt 'x, y' 1 %}

```javascript
const pos = Game.rooms.sim.getPositionAt(5,12);
const source = pos.findClosestByRange(FIND_SOURCES_ACTIVE);
```

Creates a <a href="#RoomPosition">RoomPosition</a> object at the specified location.

{% api_method_params %}
x : number
The X position.
===
y : number
The Y position.
{% endapi_method_params %}


### Return value

A
<a href="#RoomPosition">RoomPosition</a>
object or null if it cannot be obtained.

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

Get a <a href="#Room-Terrain">`Room.Terrain`</a> object which provides fast access to static terrain data. This method works for any room in the world even if you have no access to it.

### Return value

Returns new <a href="#Room-Terrain">`Room.Terrain`</a> object.

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

Get the list of objects at the specified room position.

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

An array with objects at the specified position in the following format:

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

Get the list of objects at the specified room area.

{% api_method_params %}
top : number
The top Y boundary of the area.
===
left : number
The left X boundary of the area.
===
bottom : number
The bottom Y boundary of the area.
===
right : number
The right X boundary of the area.
===
asArray (optional) : boolean
Set to true if you want to get the result as a plain array.
{% endapi_method_params %}


### Return value

If `asArray` is set to false or undefined, the method returns
an object with all the objects in the specified area in the following format:

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

If `asArray` is set to true, the method returns an array in the following format:

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

Get an object with the given type at the specified room position.

{% api_method_params %}
type : string
One of the <code>LOOK_*</code> constants.
===
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

An array of objects of the given type at the specified position if found.

{% api_method lookForAtArea 'type, top, left, bottom, right, [asArray]' 1 %}

```javascript
const look = creep.room.lookForAtArea(LOOK_STRUCTURES,10,5,11,7);
```

Get the list of objects with the given type at the specified room area.

{% api_method_params %}
type : string
One of the <code>LOOK_*</code> constants.
===
top : number
The top Y boundary of the area.
===
left : number
The left X boundary of the area.
===
bottom : number
The bottom Y boundary of the area.
===
right : number
The right X boundary of the area.
===
asArray (optional) : boolean
Set to true if you want to get the result as a plain array.
{% endapi_method_params %}


### Return value

If `asArray` is set to false or undefined, the method returns an object
with all the objects of the given type in the specified area in the following format:

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

If `asArray` is set to true, the method returns an array in the following format:

```javascript-content
[
	{x: 5, y: 10, structure: {...}},
	{x: 6, y: 11, structure: {...}},
	{x: 6, y: 11, structure: {...}}
]
```
