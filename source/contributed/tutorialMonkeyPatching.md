# Making use of Prototypes
This article will discuss object prototypes and several ways that they can be used/modified to make your life a little easier in Screeps!

# What are prototypes?
[Prototypes](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes) are what allow for [inheritance](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance) in Javascript and can be used in many powerful ways.

Every object in Javascript has a link to another object called a **prototype** object from which it inherits properties and methods. Being another object itself, the prototype object may also have a link to another prototype object, creating a [prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain). Alternatively, a prototype may also be `null`.

If you had created a creep named "John", then `Game.creeps.John` would have a link to the [`Creep`](http://docs.screeps.com/api/#Creep) prototype. The [`Creep`](http://docs.screeps.com/api/#Creep) prototype has many useful properties and methods defined that you are familiar with such as [`.name`](http://docs.screeps.com/api/#Creep.name), [`.moveTo()`](http://docs.screeps.com/api/#Creep.moveTo), and [`.harvest()`](http://docs.screeps.com/api/#Creep.harvest). All of these properties and methods are accessible to all of your creeps only because they are defined on the [`Creep`](http://docs.screeps.com/api/#Creep) prototype. All of your creep objects have a link to this prototype and therefore inherit from it. This is how all in game objects have their properties and methods defined. See more prototypes like [`Room`](http://docs.screeps.com/api/#Room), [`Source`](http://docs.screeps.com/api/#Source), and [`Structure`](http://docs.screeps.com/api/#Structure).

# Adding methods to a prototype
The ability to add methods to a prototype is extremely useful, especially in Screeps. You can define a method once and it will be available to all of your creeps!

When working with prototype methods it is important to understand that [functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions) are/can be stored in variables and object properties just like numbers, objects, arrays, strings, and booleans. Creep methods like [`.attack()`](http://docs.screeps.com/api/#Creep.attack) or [`.move()`](http://docs.screeps.com/api/#Creep.move) are functions stored as properties of the [`Creep`](http://docs.screeps.com/api/#Creep) prototype.

Because these functions are properties of an object just like any other, you can add new ones:
```javascript
Creep.prototype.sayHello = function() { 
    // In prototype functions, 'this' usually has the value of the object calling the function. in this case that is whatever creep you are calling '.sayHello()' on.
    this.say("Hello!"); 
};
```
After this code you could do something like `creep.sayHello();` on any of your creeps and they will greet you!

You can also overwrite existing prototype methods:
```javascript
Creep.prototype.suicide = function() {
    this.say("NO WAY!");
};
```
The above code overwrites the normal [`creep.suicide()`](http://docs.screeps.com/api/#Creep.suicide) function so that instead of suiciding, the creep will voice his disagreement with the command.

## Storing the original method
When you overwrite a prototype method you lose access to the original function. In Screeps losing access to a vital function such as [`.move()`](http://docs.screeps.com/api/#Creep.move) could be detrimental. Losing access to vital functions can be avoided by storing the original function in a different property before overwriting it so that it can be used later if needed.

Before, when we overwrote the [`.suicide()`](http://docs.screeps.com/api/#Creep.suicide) function, we failed to store the original. This left us unable to really suicide a creep if needed. Lets overwrite [`.suicide()`](http://docs.screeps.com/api/#Creep.suicide) again but this time we'll do it a little differently.

We will store the original function in a new property called `._suicide`. Placing an underscore before a property name is a Javascript naming convention intended to denote that the property is [private](https://developer.mozilla.org/en-US/Add-ons/SDK/Guides/Contributor_s_Guide/Private_Properties).
```javascript
// Make sure we haven't already stored the original
if (!Creep.prototype._suicide) {

	// Store the original method
	Creep.prototype._suicide = Creep.prototype.suicide;

	// Create our new function
	Creep.prototype.suicide = function() {

		// Add custom functionality
		console.log(`May ${this.name} rest in peace.`);

		// Call and return the original method
		return this._suicide();
	}

}
```
After running the above code, calling `creep.suicide()` on one of your creeps will cause a comforting message to appear in the console as well as the creep actually committing suicide.

There are a number of important things to remember that are demonstrated in the above code:
- To ensure idempotence (executing the code multiple times has the same effect as executing it once), only store the original and place your new function if the original has not already been stored.
- Always remember to store the original method.
- When possible, always return the value returned by the original function in order to keep the new function as similar as possible to the original. Other code, both your own code and internal game code, may rely on the return values from the function you are modifying.

## Working with arbitrary arguments list
The previous example was a simple one because [`Creep.prototype.suicide`](http://docs.screeps.com/api/#Creep.suicide) does not take any parameters. It is very important to handle arguments correctly when overwriting prototype methods. 

[`Creep.prototype.moveTo`](http://docs.screeps.com/api/#Creep.moveTo) is a good example of a method that requires careful handling of arguments when overwriting because it has two possible signatures: `(x, y, [opts])` OR `(target, [opts])`. The following examples will overwrite [`.moveTo()`](http://docs.screeps.com/api/#Creep.moveTo) so that it will record the amount of CPU used for movement for each creep. Each of the three examples will show a different way of handling arguments:
1. Use your own arguments:
```javascript
if (!Creep.prototype._moveTo) {
	Creep.prototype._moveTo = Creep.prototype.moveTo;
	Creep.prototype.moveTo = function(myArg1, myArg2, myArg3) {
	    console.log(`My moveTo with my own arguments!`);
	    
	    let startCpu = Game.cpu.getUsed();
	    // Call original function and store the return value
	    let returnValue = this._moveTo(myArg1, myArg2, myArg3);
	    let endCpu = Game.cpu.getUsed();
	    
	    let used = endCpu - startCpu;
	    
	    if (!this.memory.moveToCPU) this.memory.moveToCPU = 0;
	    
	    this.memory.moveToCPU += used;
	    
	    return returnValue; // return original value
	};
}
```
2. Use the [`arguments`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) object available in every function:
```javascript
if (!Creep.prototype._moveTo) {
	Creep.prototype._moveTo = Creep.prototype.moveTo;
	Creep.prototype.moveTo = function() {
	    console.log(`My moveTo using the arguments object!`);
	    
	    let startCpu = Game.cpu.getUsed();
	    // There is a short description of Function.apply() later
	    let returnValue = this._moveTo.apply(this, arguments);
	    let endCpu = Game.cpu.getUsed();
	    
	    let used = endCpu - startCpu;
	    
	    if (!this.memory.moveToCPU) this.memory.moveToCPU = 0;
	    
	    this.memory.moveToCPU += used;
	    
	    return returnValue;
	};
}
```
3. Use ["rest parameters"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters):
```javascript
if (!Creep.prototype._moveTo) {
	Creep.prototype._moveTo = Creep.prototype.moveTo;
	Creep.prototype.moveTo = function(...myArgumentsArray) {
	    console.log(`My moveTo using rest parameters!`);
	    
	    let startCpu = Game.cpu.getUsed();
	    let returnValue = this._moveTo.apply(this, myArgumentsArray);
	    let endCpu = Game.cpu.getUsed();
	    
	    let used = endCpu - startCpu;
	    
	    if (!this.memory.moveToCPU) this.memory.moveToCPU = 0;
	    
	    this.memory.moveToCPU += used;
	    
	    return returnValue;
	};
}
```

### [Function.apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
`Function.apply(thisArg, argumentsArray)` calls a function with the specified `this` value and passes each element of the arguments array as an argument to the function.
Example:
```javascript
let name = "Helam";
console.log("Hello my name is: ", name);
```
Will do the same thing as:
```javascript
let name = "Helam";
let myArguments = ["Hello my name is: ", name];
console.log.apply(console, myArguments);
```
Also see [Function.call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call).

## Other examples

### [Spawn.createCreep](http://docs.screeps.com/api/#StructureSpawn.createCreep) - Automatic naming
When you have a large amount of creeps, using the default automatic naming can consume a large amount of CPU. Naming them yourself can be one way to reduce your CPU usage.
```javascript
// Make sure the method has not already been overwritten
if (!StructureSpawn.prototype._createCreep) {
    StructureSpawn.prototype._createCreep = StructureSpawn.prototype.createCreep;
    
    // The original signature: createCreep(body, [name], [memory])
    // Make a new version with the signature createCreep(body, [memory])
    StructureSpawn.prototype.createCreep = function(body, memory = {}) { 
        if (!Memory.myCreepNameCounter) Memory.myCreepNameCounter = 0;
        
        // Now we need to generate a name and make sure it hasnt been taken
        let name;
        let canCreate;
        do {
            name = `c${Memory.creepNameCounter++}`;
            canCreate = this.canCreateCreep(body, name);
        } while (canCreate === ERR_NAME_EXISTS);
        
        // Now we call the original function passing in our generated name and returning the value
        return this._createCreep(body, name, memory);
    };
}
```

### [StructureObserver.observeRoom](http://docs.screeps.com/api/#StructureObserver) - prevent overriding calls
Each subsequent call to [`.observeRoom`](http://docs.screeps.com/api/#StructureObserver.observeRoom) on the same observer in the same tick will override the previous one, and only the last one will actually execute, even though all of them may have returned `OK`. This is an example of how to modify that behavior so that subsequent calls return `ERR_BUSY` instead of overriding previous ones.
```javascript
if (!StructureObserver.prototype._observeRoom) {
    StructureObserver.prototype._observeRoom = StructureObserver.prototype.observeRoom;
    StructureObserver.prototype.observeRoom = function() {
        if (this.observing) 
            return ERR_BUSY;
        let observeResult = this._observeRoom.apply(this, arguments);
        if (observeResult === OK)
            this.observing = roomName;
        return observeResult;
    };
}
```

# Adding properties to a prototype
Just like with prototype functions, there are also non-function prototype properties like [`.name`](http://docs.screeps.com/api/#Creep.name) from the [`Creep`](http://docs.screeps.com/api/#Creep) prototype or [`hits`](http://docs.screeps.com/api/#Structure.hits) from the [`Structure`](http://docs.screeps.com/api/#Structure) prototype. Theses properties are inherited from the prototypes to the game objects, allowing you to access them. You are not limited to the properties provided by the game's [API](http://docs.screeps.com/api/), you can create your own!!!

There are many possibilities when creating custom properties, here we will outline only a few. Properties are added using [`Object.defineProperty`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) and [`Object.defineProperties`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties).

We will create a custom property on the [`Room`](http://docs.screeps.com/api/#Room) prototype called `sources` that will contain an array of the energy sources in the room. We will do this 4 different ways to illustrate different features or possibilities when creating your own properties in Screeps.

## Basic property with getter only and no caching
Note that [`Object.defineProperty`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) takes 3 parameters:
1. The object to which you are adding a property, commonly a prototype object. `Room.prototype` in these examples.
2. The name of the property you are adding. `'sources'` in these examples but it could be anything like `'foo'` or `'myProp'`.
3. An object containing options that define how the property behaves. See the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) for a list of all possible options.
```javascript
Object.defineProperty(Room.prototype, 'sources', {
    // This is the getter function, when you type room.sources it will have the value returned by this function
    get: function() {
        // Since we are defining the property on the Room prototype, 'this' in the line below is whatever room object we are getting the .sources from
        return this.find(FIND_SOURCES);
    },
    // This makes it so the property doesn't show up when enumerating the properties of the creep. If you arent sure, put false.
    enumerable: false,
    // This makes the characteristics of the property modifiable and also makes the property deletable. if you arent sure, put true.
    configurable: true
});
```
This option is the most basic and is basically just a shortcut that replaces `room.find(FIND_SOURCES)` with `room.sources`, perhaps saving you some keystrokes but not much else. See the rest of the examples for better options.

## Local object caching
In the following code `this._sources` will have no value the first time the getter function is called, so it will find the value and store it so that the next time you access the property it will return the stored value.
Values stored this way do not last between ticks, see the memory caching option to see how to remedy this.
Note that we are using `._sources` with an `_` to store the value and not just plain `.sources`. This is because trying to access `.sources` will call the getter function again and cause an infinite loop!
```javascript
Object.defineProperty(Room.prototype, 'sources', {
    get: function() {
        if (!this._sources) {
            this._sources = this.find(FIND_SOURCES);
        }
        return this._sources;
    },
    enumerable: false,
    configurable: true
});
```

## Adding a setter
This version adds a setter function. If you want to be able to assign your custom property a value then you must add a setter, otherwise you will get an error when assigning a value. In this particular case you would not set room.sources to anything because the getter value does the setting for you but we will show how to do the setter anyway.
```javascript
Object.defineProperty(Room.prototype, 'sources', {
    get: function() {
        if (!this._sources) {
            this._sources = this.find(FIND_SOURCES);
        }
        return this._sources;
    },
    set: function(newValue) {
        // We set the stored private variable so the next time the getter is called it returns this new value
        this._sources = newValue;
    },
    enumerable: false,
    configurable: true
});
```

## Memory caching
In this version we will add memory caching so that the stored value will last between ticks. While useful in this particular example, memory caching may not always be appropriate. Remember that the more objects you store in memory, the more CPU must be spent parsing it!

Because the sources in a room do not change, adding memory caching in this example allows you to store the sources for the room once and never have to call `room.find(FIND_SOURCES)` again unless the memory value gets deleted.

```javascript
Object.defineProperty(Room.prototype, 'sources', {
    get: function() {
    		// If we dont have the value stored locally
        if (!this._sources) {
        		// If we dont have the value stored in memory
            if (!this.memory.sourceIds) {
            		// Find the sources and store their id's in memory, NOT the full objects
                this.memory.sourceIds = this.find(FIND_SOURCES).map(source => source.id);
            }
            // Get the source objects from the id's in memory and store them locally
            this._sources = this.memory.sourceIds.map(id => Game.getObjectById(id));
        }
        // return the locally stored value
        return this._sources;
    },
    set: function(newValue) {
        // when storing in memory you will want to change the setter
        // to set the memory value as well as the local value
        this.memory.sources = newValue.map(source => source.id);
        this._sources = newValue;
    },
    enumerable: false,
    configurable: true
});
```
It is critical in situations like this that you only store the id's of the objects in memory, and use [`Game.getObjectById(id)`](http://docs.screeps.com/api/#Game.getObjectById) to get the fresh objects every tick. Storing the full objects in memory not only causes much higher memory usage and therefore CPU usage, but also can cause bugs related to stale information in old objects. See [Storing game objects in memory](http://docs.screeps.com/global-objects.html#Storing-game-objects-in-memory).


## Other examples

### Creep.prototype.isFull - are your carry parts full?
A simple example of adding a property to your creeps. Can be used like `if (creep.isFull)`. This is a good example of when memory caching would not be useful, because the amount of resources in carry parts can change between ticks and would invalidate the memory value.
```javascript
Object.defineProperty(Creep.prototype, 'isFull', {
    get: function() {
        if (!this._isFull) {
            this._isFull = _.sum(this.carry) === this.carryCapacity;
        }
        return this._isFull;
    },
    enumerable: false,
    configurable: true
});
```

## Source.memory - (Adding memory to things)
A little more advanced, adds a `.memory` property to all sources. This can easily be modified to add a `.memory` property to any prototype you desire.
```javascript
Object.defineProperty(Source.prototype, 'memory', {
    configurable: true,
    get: function() {
        if(_.isUndefined(Memory.mySourcesMemory)) {
            Memory.mySourcesMemory = {};
        }
        if(!_.isObject(Memory.mySourcesMemory)) {
            return undefined;
        }
        return Memory.mySourcesMemory[this.id] = Memory.mySourcesMemory[this.id] || {};
    },
    set: function(value) {
        if(_.isUndefined(Memory.mySourcesMemory)) {
            Memory.mySourcesMemory = {};
        }
        if(!_.isObject(Memory.mySourcesMemory)) {
            throw new Error('Could not set source memory');
        }
        Memory.mySourcesMemory[this.id] = value;
    }
});
```

## Source.freeSpaceCount - How many creeps can you fit near that source?
This example builds on the previous example and uses your new `source.memory` property to cache a `.freeSpaceCount` property on your sources that returns a number telling you how many spots are around the source that are not natural walls.
```javascript
Object.defineProperty(Source.prototype, 'freeSpaceCount', {
    get: function () {
        if (this._freeSpaceCount == undefined) {
            if (this.memory.freeSpaceCount == undefined) {
                let freeSpaceCount = 0;
                [this.pos.x - 1, this.pos.x, this.pos.x + 1].forEach(x => {
                    [this.pos.y - 1, this.pos.y, this.pos.y + 1].forEach(y => {
                    	if (Game.map.getTerrainAt(x, y, this.pos.roomName) != 'wall')
                				freeSpaceCount++;
            				}, this);
            		}, this);
                this.memory.freeSpaceCount = freeSpaceCount;
            }
            this._freeSpaceCount = this.memory.freeSpaceCount;
        }
        return this._freeSpaceCount;
    },
    enumerable: false,
    configurable: true
});
```
