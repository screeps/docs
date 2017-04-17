title: Global Objects
---

## `Game` object

You operate the game through the global [`Game`](/api/#Game) object which is described in detail in the [API Reference](/api/) section. This object lets you access the complete list of your creeps, "review" rooms, pass commands, etc.

```javascript
var target = Game.spawns.Spawn1;
for(var i in Game.creeps) {
    Game.creeps[i].moveTo(target);
}  
```

No changes in the `Game` object are passed from tick to tick. Even if you manually change any properties of the object, it will not affect the game state. Changing properties and giving commands are possible only through special methods of game objects.

The `Game` object is created from scratch and filled with data at each tick. In order to memorize information between game ticks, you can use the Memory object. See the next article for more about it.

## `Memory` object

Each player has access to the global object `Memory` in which he/she may store any information in the JSON format. All the changes written in it are automatically stored using `JSON.stringify` and passed from tick to tick, allowing you memorize the setting, your own decisions, and temporary data.

    Memory.someData = {...};

The amount of memory available to a player is limited to **2 MB**.

For your convenience, some game objects are linked to the global `Memory` object and store their own keys in it. For example, you may address the memory of an individual creep with the help of its `memory` property:

    Game.creeps.John.memory = {...};


Actually, this property is an alias for a corresponding key in the global `Memory` object:

    Game.creeps.John.memory.role = 'harvester';
    console.log(Memory.creeps.John.role); // -> 'harvester'


Information is stored and recorded via the `Memory` object, but game objects just allow quick access to some corresponding keys. You can use the memory addressing method which is more convenient for you.

### Storing game objects in memory

You should not store functions or full game objects as is in `Memory`. The `Memory` object is for storing JSON data and cannot contain live objects references. Their data will not be relevant. Moreover, it will waste your memory which is limited.

    // This is an incorrect example!
    var source = creep.pos.findClosestByRange(FIND_SOURCES);
    creep.memory.source = source;
    // ... 
    creep.moveTo(creep.memory.source); // ERR_INVALID_TARGET

Instead of storing live objects, it is better to store the `id` property that any game object has, and then use [`Game.getObjectById`](/api/#Game.getObjectById) to retrieve the game object by its `id`:

    // This is correct
    var source = creep.pos.findClosestByRange(FIND_SOURCES);
    creep.memory.sourceId = source.id;
    // ...
    var source = Game.getObjectById(creep.memory.sourceId);
    creep.moveTo(source); // OK

### Serialization

The Memory object is stored in the stringified form and is parsed each time upon the first in the tick access from your script with the help of the `JSON.parse` method. The CPU cost of this method execution is counted as your script expense. If you wish, you may write your own stringifier/destringifier using the global variable [`RawMemory`](/api/#RawMemory). It stores the original memory representation as a string. In fact, the default work of the memory basically corresponds to the following code:

    Memory = JSON.parse(RawMemory.get()); //on the first access to Memory object
    // ...your script
    RawMemory.set(JSON.stringify(Memory));

You can implement your own algorithm using [`RawMemory`](/api/#RawMemory) getter/setter.
