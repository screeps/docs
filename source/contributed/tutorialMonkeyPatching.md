# Monkey Patching Tutorial for Screeps
WARNING: Monkey patching is often considered bad practice and there are those that will tell you that you should NEVER do it, and there are good reasons for this. Monkey patching, while very powerful and convenient (especially in Screeps), is a dangerous practice that should not be taken lightly.

Monkey patching is the practice of modifying the way that existing prototype functions operate.

We will provide examples that will demonstrate a few of the infinite uses for monkey patching each example will try to build on the previous one, so you'll want to read through all of it to make sure you understand it fully.


## Introduction - Adding functions to prototypes

To understand monkey patching it is important to understand that functions are/can be stored in variables just like numbers, objects, arrays, and strings. Creep functions like `.moveTo`, `.harvest`, or `.withdraw` are all stored in variables belonging to the Creep prototype object. These functions can be accessed like so: `Creep.prototype.moveTo`, `Creep.prototype.harvest`, and `Creep.prototype.withdraw`. Any values that belong to the Creep prototype will be accessible from any Creep object.  This is why you are able to call `creep.moveTo` on all of your creeps. 

Because these functions are variables in an object just like any other, you can add new ones: 
```javascript
Creep.prototype.sayHello = function() { 
    // In prototype functions, 'this' usually has the value of the object calling the function. in this case that is whatever creep you are calling 'sayHello' on.
    this.say("Hello!"); 
};
```
after this code, you can do `creep.sayHello();` on any of your creeps and they will say "Hello!"

You can overwrite existing functions:
```javascript
Creep.prototype.suicide = function() {
    this.say("NO WAY MAN");
};
```
The above code overwrites the normal `creep.suicide` function so that instead of suiciding, the creep will voice his disagreement with the command.

But.. what if you really need the creep to suicide? You no longer have the normal suicide function because you overwrote it with our own!!! (in game this is not permanent. It would regain its original value on a global reset, this also means you can execute these code examples outside of your main loop, they dont need to be executed every tick.

# EXAMPLE #1 - upgradeController - "Praise GCL"
Let's try another one but a little differently. We'll modify the `.upgradeController` function so that the creep says "Praise GCL" whenever it upgrades the controller. First, unlike what we did with `.suicide`, we are going to store the original function so we don't lose it.
### Store the original function
```javascript
// Store the original function
Creep.prototype.storedUpgradeController = Creep.prototype.upgradeController;
// or
let storedUpgradeController = Creep.prototype.upgradeController;
```

Now that the normal `Creep.prototype.upgradeController` function is safely stored in `.storedUpgradeController` or `storedUpgradeController`, we can replace it with our own.
### Add custom functionality
```javascript
Creep.prototype.upgradeController = function() {
    this.say("Praise GCL");
};
```
Now that you have put in our own function for `.upgradeController`, your creeps will now praise GCL whenever you tell them to upgrade. The only issue now is they wont actually upgrade the controller.

To fix this so they will still upgrade the controller, you can call the stored version of the original function in your new function. Note that you are including an argument this time because the original `.upgradeController` function requires that you pass a room controller as an argument.
### Call the original function
```javascript
Creep.prototype.upgradeController = function(controller) {
    this.say("Praise GCL");
    // call the stored original function
    this.storedUpgradeController(controller);
};
```
Now you have successfully modified the `.upgradeController` function so it will still upgrade the controller AND praise GCL. There is just one problem left in this function, and it is a common mistake in monkey patching.

You should always remember to return the value returned by the original function in case other parts of your code or the game engine code rely on that return value. Basically you want your modified function to behave as closely to the original function as possible in order to be safe. You can of course violate this if you wish, just be aware of what you are doing.
### Return the value from the original function
```javascript
Creep.prototype.upgradeController = function(controller) {
    this.say("Praise GCL");
    // return the value from the original function
    return this.storedUpgradeController(controller);
};
```

## EXAMPLE #2 - moveTo - Measure CPU

Again we start with storing the original function.
```javascript
Creep.prototype._moveTo = Creep.prototype.moveTo;
// or 
let originalMoveTo = Creep.prototype.moveTo;
```
The `_` in front of `._moveTo` is a common naming convention in JS that indicates the variable is meant to be "private" (only meant to be called by other internal functions) we'll use this naming convention to store the original functions from now on.

Now you'll modify the `moveTo` function to record how much cpu each creep is using for `.moveTo` calls.

This example is different because `.moveTo` can accept different arguments, and your monkey patched version should be able to accept the same arguments if you are being safe. The original function can take either `(x, y, [opts])` OR `(target, [opts])`.

You have a few options to handle this:

### Option #1 Use your own arguments
This option is not recommended as it is easier to make a mistake and accidentally leave out an argument or use them incorrectly.
```javascript
Creep.prototype.moveTo = function(myArg1, myArg2, myArg3) {
    console.log(`My monkey patched moveTo with my own arguments!`);
    
    let startCpu = Game.cpu.getUsed();
    // call original function and store the return value
    let returnValue = this._moveTo(myArg1, myArg2, myArg3);
    let endCpu = Game.cpu.getUsed();
    
    let used = endCpu - startCpu;
    
    if (!this.memory.moveToCPU) this.memory.moveToCPU = 0;
    
    this.memory.moveToCPU += used;
    
    return returnValue; // return original value
};
```

### Option #2 - use the `arguments` object available in every function
This is the recommended option if you do not need to modify or use any of the arguments. The `arguments` object behaves somewhat like an array but is not a proper array. Use option #3 if you want an array of the arguments instead.
```javascript
Creep.prototype.moveTo = function() {
    console.log(`My monkey patched moveTo using the arguments object!`);
    
    let startCpu = Game.cpu.getUsed();
    // there is a short description of Function.apply() later
    let returnValue = this._moveTo.apply(this, arguments);
    let endCpu = Game.cpu.getUsed();
    
    let used = endCpu - startCpu;
    
    if (!this.memory.moveToCPU) this.memory.moveToCPU = 0;
    
    this.memory.moveToCPU += used;
    
    return returnValue;
};
```

### Option #3 - use "rest parameters" to get an array of the arguments passed into the funtion
This time we will use rest parameters to get a proper array of the arguments. Note `function(...myArguments)` and `this._moveTo.apply(this, myArgumentsArray);`.
```javascript
Creep.prototype.moveTo = function(...myArgumentsArray) {
    console.log(`My monkey patched moveTo using rest parameters!`);
    
    let startCpu = Game.cpu.getUsed();
    let returnValue = this._moveTo.apply(this, myArgumentsArray);
    let endCpu = Game.cpu.getUsed();
    
    let used = endCpu - startCpu;
    
    if (!this.memory.moveToCPU) this.memory.moveToCPU = 0;
    
    this.memory.moveToCPU += used;
    
    return returnValue;
};
```

#### Function.apply
`Function.apply(thisArg, argumentsArray)` calls a function with the specified `this` value and passes each element of the arguments array as an argument to the function.
Example:
```javascript
var name = "Helam";
console.log("Hello my name is: ", name);
```
Will do the same thing as:
```javascript
var name = "Helam";
var myArguments = ["Hello my name is: ", name];
console.log.apply(console, myArguments);
```


# Now you know how to monkey patch! More game examples:

## Spawn.createCreep - Automatic naming
When you have a large amount of creeps, using the default automatic naming can consume a large amount of CPU. Naming them yourself can be one way to reduce your CPU usage.
```javascript
// store the original
StructureSpawn.prototype._createCreep = StructureSpawn.prototype.createCreep;

// the original signature: createCreep(body, [name], [memory])
// make a new version with the signature createCreep(body, [memory])
StructureSpawn.prototype.createCreep = function(body, memory = {}) { 
    if (!Memory.myCreepNameCounter) Memory.myCreepNameCounter = 0;
    
    // now we need to generate a name and make sure it hasnt been taken
    let name;
    let canCreate;
    do {
        name = `c${Memory.creepNameCounter++}`;
        canCreate = this.canCreateCreep(body, name);
    } while (canCreate === ERR_NAME_EXISTS);
    
    // now we call the original function passing in our generated name and returning the value
    return this._createCreep(body, name, memory);
};
```

## StructureObserver.observeRoom - prevent overriding calls
Each subsequent call to `.observeRoom` on the same observer in the same tick will override the previous one, and only the last one will actually execute, even though all of them may have returned `OK`. This is an example of how to modify that behavior so that subsequent calls return `ERR_BUSY` instead of overriding previous ones.
```
StructureObserver.prototype._observeRoom = StructureObserver.prototype.observeRoom;
StructureObserver.prototype.observeRoom = function() {
    if (this.observing) 
        return ERR_BUSY;
    let observeResult = this._observeRoom.apply(this, arguments);
    if (observeResult === OK)
        this.observing = roomName;
    return observeResult;
};
```
