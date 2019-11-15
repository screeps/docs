---
title: 修改对象原型
contributed:
    name: Helam
    link: https://screeps.com/a/#!/profile/Helam
    date: 2017-05-14
---

本文将讨论对象原型以及可以使用/修改的几种原型，阅读本文来使您的 Screeps 生活更加轻松！

## 什么是原型?
原型[（Prototypes）](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes)允许在 Javascript 中进行继承[（inheritance）](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance)，并且拥有许多强大的使用方法。

Javascript 中的每个对象都有到另一个对象的链接，该对象称为**原型**对象，它从该对象继承属性和方法。而作为另一个对象，原型对象可能还具有到另一个原型对象的链接，从而构成了一个[原型链](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)。或者，原型也可以是 null。

如果您创建了一个名为 “John” 的 creep，那么 `Game.creeps.John` 将有一个指向 [`Creep`](http://docs.screeps.com/api/#Creep) 原型的链接。该 [`Creep`](http://docs.screeps.com/api/#Creep) 原型具有许多有用的属性和定义好的方法，例如你所熟悉的 [`.name`](http://docs.screeps.com/api/#Creep.name)，[`.moveTo()`](http://docs.screeps.com/api/#Creep.moveTo) 和 [`.harvest()`](http://docs.screeps.com/api/#Creep.harvest)。由于您的 creep 都是基于 [`Creep`](http://docs.screeps.com/api/#Creep) 对象的，所以这些方法在您的 creep 上都可以访问到。您所有的 creep 对象都有此原型的链接，所以可以继承该原型上的属性。这也是其他所有游戏对象中定义方法和属性的方式。查看更多原型例如：[`Room`](http://docs.screeps.com/api/#Room)，[`Source`](http://docs.screeps.com/api/#Source)，和 [`Structure`](http://docs.screeps.com/api/#Structure)。

## 在原型上添加方法
向原型添加方法的功能非常有用，尤其是在 Screeps 中。 您只需定义一次方法，就可以在所有的 creep 上使用它！

在你开始使用原型方式时，最重要的是要了解 [functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions) 已经，或者说可以被存放在一个变量或者对象的属性里，就像是数字、对象、数组、字符串和布尔值一样。[`.attack()`](http://docs.screeps.com/api/#Creep.attack) 或者 [`.move()`](http://docs.screeps.com/api/#Creep.move) 这样的 Creep 方法都被存放在了 [`Creep`](http://docs.screeps.com/api/#Creep) 原型的属性上。

因为这些方法都是一个对象上的属性，就和其他类型的值一样，所以你可以这样添加一个新的方法：
```javascript
Creep.prototype.sayHello = function() { 
    // 在原型方法中，"this" 通常代指该原型对象本身
    // 无论你在哪个 creep 上调用 '.sayHello()' 都可以执行这段代码
    this.say("Hello!"); 
};
```
在这段代码之后你可以在任何你的 creep 上调用 `creep.sayHello();` 之类的方法，然后它们就会向你打招呼！

你甚至可以重写已经存在的原型方法：
```javascript
Creep.prototype.suicide = function() {
    this.say("NO WAY!");
};
```
上面的代码重写了正常的 [`creep.suicide()`](http://docs.screeps.com/api/#Creep.suicide) 方法，所以这段代码将会替代自杀操作，在你调用这个方法之后，creep 会生气的拒绝你的命令。

### 保存原始方法
当你重写了一个原型方法后，你将无法访问原始方法。在 Screeps 中，无法访问像 [`.move()`](http://docs.screeps.com/api/#Creep.move) 之类的重要方法可能会导致很严重的后果。所以在覆盖原始方法之前，你最好把它存储在其他属性中，这样可以避免无法访问重要的功能，以便以后可以在需要时使用它。

在上面的例子里，我们在重写 [`.suicide()`](http://docs.screeps.com/api/#Creep.suicide) 方法时并没有保存其原始方法，所以在需要时的时候我们就没办法真正的执行自杀了。接下来我们再次重写 [`.suicide()`](http://docs.screeps.com/api/#Creep.suicide) 方法，不过这次我们添加一点新东西。

我们将把原始方法存储在名为 `._suicide` 的新属性中。在属性名称前加下划线是一种 Javascript 命名约定，旨在表示该属性是[私有](https://developer.mozilla.org/en-US/Add-ons/SDK/Guides/Contributor_s_Guide/Private_Properties)的。
```javascript
// 先确定我们还没把原始方法保存下来
if (!Creep.prototype._suicide) {

	// 保存原始方法
	Creep.prototype._suicide = Creep.prototype.suicide;

	// 创建一个新属性
	Creep.prototype.suicide = function() {

		// 添加自定义功能
		console.log(`May ${this.name} rest in peace.`);

		// 调用并返回原始方法
		return this._suicide();
	}

}
```
运行上述代码后，在你的 creep 上调用该方法将会在控制台中显示这个 creep 实际自杀返回值和一条令人欣慰的信息。

上面的代码演示了很多重要的地方：
- 为了保证幂等性（无论执行多少次，返回值都是相同的），仅在原始方法没有保存时才进行保存并创建你的新方法。
- 永远记得保存你的原始方法。
- 如果可能的话，请始终返回原始方法的返回值，以使新方法尽可能与原始方法相似。其他代码，包括您自己的代码和游戏内部代码，都可能依赖于您正在修改的函数的返回值。

### 使用任意参数列表
前面的示例很简单，因为 [`Creep.prototype.suicide`](http://docs.screeps.com/api/#Creep.suicide) 没有任何的参数。但是在覆盖原型方法时，正确处理参数非常重要。

[`Creep.prototype.moveTo`](http://docs.screeps.com/api/#Creep.moveTo) 方法是一个很好的例子，在覆盖该方法时需要仔细的处理参数，因为它具有两种可能的参数列表：`(x, y, [opts])` 或者 `(target, [opts])`。下面的示例将覆盖 [`.moveTo()`](http://docs.screeps.com/api/#Creep.moveTo) 来记录每个 creep 移动所消耗的 CPU。接下来的三个示例会展示不同的参数处理方式：

1. 使用你自己的参数类别:
```javascript
if (!Creep.prototype._moveTo) {
	Creep.prototype._moveTo = Creep.prototype.moveTo;
	Creep.prototype.moveTo = function(myArg1, myArg2, myArg3) {
	    console.log(`My moveTo with my own arguments!`);
	    
	    let startCpu = Game.cpu.getUsed();
	    // 调用原始方法并保存返回值
	    let returnValue = this._moveTo(myArg1, myArg2, myArg3);
	    let endCpu = Game.cpu.getUsed();
	    
	    let used = endCpu - startCpu;
	    
	    if (!this.memory.moveToCPU) this.memory.moveToCPU = 0;
	    
	    this.memory.moveToCPU += used;
	    
	    return returnValue; // 返回原方法返回值
	};
}
```
2. 使用每个函数中都有的 [`arguments`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) 对象：
```javascript
if (!Creep.prototype._moveTo) {
	Creep.prototype._moveTo = Creep.prototype.moveTo;
	Creep.prototype.moveTo = function() {
	    console.log(`My moveTo using the arguments object!`);
	    
	    let startCpu = Game.cpu.getUsed();
	    // 稍后会对 Function.apply() 方法进行简单描述
	    let returnValue = this._moveTo.apply(this, arguments);
	    let endCpu = Game.cpu.getUsed();
	    
	    let used = endCpu - startCpu;
	    
	    if (!this.memory.moveToCPU) this.memory.moveToCPU = 0;
	    
	    this.memory.moveToCPU += used;
	    
	    return returnValue;
	};
}
```
3. 使用 ["rest parameters"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters):
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

#### [Function.apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
`Function.apply(thisArg, argumentsArray)` 调用具有指定 `this` 值的函数，并将参数数组的每个元素作为该函数的参数传递。
例如：
```javascript
let name = "Helam";
console.log("Hello my name is: ", name);
```
执行的结果和下面代码相同：
```javascript
let name = "Helam";
let myArguments = ["Hello my name is: ", name];
console.log.apply(console, myArguments);
```
另请参加 [Function.call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)。

### 其他例子

#### [Spawn.createCreep](http://docs.screeps.com/api/#StructureSpawn.createCreep) - 自动命名
当您有大量 creep 时，使用默认的自动命名可能会消耗大量 CPU。 自己命名它们不失为节省 CPU 的一种方法。
```javascript
// 检查该方法是否已经被重写
if (!StructureSpawn.prototype._createCreep) {
    StructureSpawn.prototype._createCreep = StructureSpawn.prototype.createCreep;
    
    // 原始参数列表：createCreep(body, [name], [memory])
    // 构造新的参数列表 createCreep(body, [memory])
    StructureSpawn.prototype.createCreep = function(body, memory = {}) { 
        if (!Memory.myCreepNameCounter) Memory.myCreepNameCounter = 0;
        
        // 现在我们需要生成一个没有使用的名字
        let name;
        let canCreate;
        do {
            name = `c${Memory.creepNameCounter++}`;
            canCreate = this.canCreateCreep(body, name);
        } while (canCreate === ERR_NAME_EXISTS);
        
        // 现在我们调用原始方法并传入我们生成的名称，然后
        // 返回原始返回值
        return this._createCreep(body, name, memory);
    };
}
```

#### [StructureObserver.observeRoom](http://docs.screeps.com/api/#StructureObserver) - 防止调用覆盖
在同一 tick 中如果对单个 observer 调用多次 [`.observeRoom`](http://docs.screeps.com/api/#StructureObserver.observeRoom) 的话，后面的调用将会覆盖之前的调用，而且哪怕只有最后一个调用会被真正执行，所有的调用也都会返回 `OK`。下面的例子将会介绍如何修改其行为，使得后续调用返回 `ERR_BUSY` 而不是覆盖先前的调用。
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

## 在原型上添加属性
就像原型方法一样，原型对象上还有很多并不是方法的属性，例如从 [`Creep`](http://docs.screeps.com/api/#Creep) 原型上继承的 [`.name`](http://docs.screeps.com/api/#Creep.name) 或者从 [`Structure`](http://docs.screeps.com/api/#Structure) 原型上继承的 [`hits`](http://docs.screeps.com/api/#Structure.hits) 属性。这些属性从原型继承到游戏对象，所以你可以访问它们。而且并不是只能使用游戏 API 提供的属性，你还可以创建自己的属性！！！

有很多方法来创建自定义的属性，这里我们仅介绍其中的几种：使用 [`Object.defineProperty`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 和 [`Object.defineProperties`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties) 来添加属性。

我们将在 [`Room`](http://docs.screeps.com/api/#Room) 原型上创建一个属性 `sources`，该属性包含房间中的能量矿数组。在 Screeps 有 4 种不同的方法来创建自己的属性，我们会分别说明其中的不同。

### 只有 getter 访问器并且无缓存的基础属性
注意：[`Object.defineProperty`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 需要下面三个参数：
1. 要添加属性的对象，通常是原型对象。在该例子里为 `Room.prototype`。
2. 要添加的属性名。在该例子里为 `sources`，但其实你可以起任何名字比如 `'foo'` 或者 `'myProp'`。
3. 一个对象，其中包含用于定义属性行为的选项。详情请参见 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)。
```javascript
Object.defineProperty(Room.prototype, 'sources', {
    // 这个是 getter 访问器，当你输入 room.sources 时
    // 它的值就是该方法返回的
    get: function() {
        // 由于我们是在 Room 原型上定义的属性，
        // 因此下面一行中的 'this' 是我们要从中获取 .sources 的任何 room 对象。
        return this.find(FIND_SOURCES);
    },
    // 这样可以使 creep 在枚举属性时不显示该属性
    // 如果你不太了解或者不太确定，将其设置为 false。
    enumerable: false,
    // 这使属性的特性可以被修改，也可以删除该属性。
    // 如果你不太了解或者不太确定，将其设置为 true。
    configurable: true
});
```
这种写法是最最基本的写法了，其实只是将 `room.find(FIND_SOURCES)` 替换成了 `room.sources`，这可能会让你节省一些打字的时间，但是没什么其他的好处了，请继续阅读下面的示例来了解更好的写法。

### 对象内部缓存
在下面的代码中第一次调用 `this._sources` 时，getter 方法发现没有值，所以它将找到该值并将其保存下来，以便下次访问该属性时直接返回已存储的值。以这种方式存储的值在只能在当前 tick 访问，下个 tick 就会消失，下面的 Memory 缓存法会解决该问题。请注意，我们使用带有 `_` 的 `._sources` 来存储值，而不是直接访问 `.sources`。这是因为尝试访问 `.sources` 将再次调用其 getter 访问器，然后就导致了无限循环！
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

### 添加 setter 访问器
这个示例添加了 setter 方法。如果你想修改自定义属性的值的话，就必须添加一个 setter，否则在赋值时就会出现错误。在本文的需求中不需要给 room.sources 赋值，因为 getter 访问器已经处理好了这一切，但是我们将展示如何使用 setter。
```javascript
Object.defineProperty(Room.prototype, 'sources', {
    get: function() {
        if (!this._sources) {
            this._sources = this.find(FIND_SOURCES);
        }
        return this._sources;
    },
    set: function(newValue) {
        // 我们可以自行设置私有变量的值，来使下次调用 getter 访问器时可以
        // 返回新的值
        this._sources = newValue;
    },
    enumerable: false,
    configurable: true
});
```

### Memory 缓存
在这个版本中，我们将添加内存缓存来使得我们的值可以在 tick 之间持久保存。尽管在这个例子里很有用，但内存缓存并不总是适合任何情况。请记住，存储在内存中的对象越多，解析它所花费的 CPU 就越多！

由于房间中的 source 并不会改变，这个例子中添加的缓存可以使得你只需要调用一次 `room.find(FIND_SOURCES)` 就可以永远使用其结果，除非内存中的值被删除了。

```javascript
Object.defineProperty(Room.prototype, 'sources', {
    get: function() {
    		// 如果 room 对象内部没有保存该值
        if (!this._sources) {
        		// 如果房间内存中没有保存该值
            if (!this.memory.sourceIds) {
            		// 查找 source 并将它们的 id 保存到内存里，
            		// **不要** 保存整个 source 对象
                this.memory.sourceIds = this.find(FIND_SOURCES)
                                        .map(source => source.id);
            }
            // 从内存中获取它们的 id 并找到对应的 source 对象，然后保存在 room 对象内部
            this._sources = this.memory.sourceIds.map(id => Game.getObjectById(id));
        }
        // 返回内部保存的 source 对象
        return this._sources;
    },
    set: function(newValue) {
        // 当数据保存在内存中时，你会希望在修改 room 上的 source 时
        // 也会自动修改内存中保存的 id 数据
        this.memory.sources = newValue.map(source => source.id);
        this._sources = newValue;
    },
    enumerable: false,
    configurable: true
});
```
在这个例子中，非常重要的一点是，你只能将对象的 ID 存储在内存中，并使用 [`Game.getObjectById(id)`](http://docs.screeps.com/api/#Game.getObjectById) 在每 tick 时获取最新的对象。将完整对象存储在内存中不仅会导致更高的内存使用率，进而导致 CPU 使用率增加，而且旧对象中的过时信息还有可能导致更多错误出现。请参阅[在内存中保存游戏对象](http://docs.screeps.com/global-objects.html#Storing-game-objects-in-memory)。


### 其他例子

#### Creep.prototype.isFull - 你的 CARRY 装满了么？
一个向 creep 添加属性的简单示例。可以这样用：`if (creep.isFull)`。这是一个说明在内存缓存不可用时应该怎么做的好例子，因为 CARRY 部件的资源携带量可能会随着 tick 的流逝发生变化，这会使得在内存里保存值变得毫无意义。
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

#### Source.memory - (给其他对象添加内存)
让我们更进一步，向所有的 source 添加 `.memory` 属性。而且对下面例子进行简单的修改就可以向你所需的任何原型添加 `.memory` 属性。
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
        return Memory.mySourcesMemory[this.id] = 
                Memory.mySourcesMemory[this.id] || {};
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

#### Source.freeSpaceCount - 该 source 边上有多少空位可供 creep 开采？
这个例子建立在上个例子的基础上，使用新的 `source.memory` 属性来在 source 上缓存 `.freeSpaceCount` 属性，该属性返回一个数字，告诉你在 source 周围有多少个不是墙的空位。
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
