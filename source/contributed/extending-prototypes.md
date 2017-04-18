title: Extending Object Prototypes
---

Extending prototypes is generally something you should avoid doing in most cases, however Screeps encourages it. This article will take you through the basics of how, when, and why.

Generally the reason you will be adding to the prototype is for convenience. Other times will be because your property or method doesn't fit anywhere else in your code. An example of this is adding properties to the Room prototype to access the room's mineral and sources.

```
Object.defineProperties(Room.prototype, {
    mineral: {
        // The configurable option means you can change the property later
        // Like on the next tick. It's important we set this to true.
        configurable: true,
        get() {
            if (!_.isUndefined(this._mineral)) {
                [this._mineral] = this.find(FIND_MINERALS);
            }
            return this._mineral;
        },
    },

    sources: {
        configurable: true,
        get() {
            if (!_.isUndefined(this._sources)) {
                this._sources = this.find(FIND_SOURCES);
            }
            return this._sources;
        },
    }
});
```

These properties can now be accessed using `room.mineral` or `room.sources`.

If you want to create a method instead of a property, you have two methods. Use the ES6 `Object.defineProperty` syntax that was used above, or use the classic method. I will show you both below.

```
// ES6 Object.defineProperty
Object.defineProperty(Room.prototype, 'isMine', {
    configurable: true,
    value: function() {
        return this.controller && this.controller.my;
    }
});

// Classic Prototype Extend
Room.prototype.isMine = function() {
    return this.controller && this.controller.my;
};
```

With this power, you can do things like give memory to structures that don't normally have memory. For example let's give towers a `memory` property to access the same way you would for creeps.

```
// For this we will use Object.defineProperty as we need a getter and setter.
// There are other ways, but it's much more complicated and rather sloppy. This is the easy way.
Object.defineProperty(StructureTower, 'memory', {
    configurable: true,
    get() {
        if (!Memory.towers) Memory.towers = {};
        return Memory.towers[this.id] = Memory.towers[this.id] || {};
    },
    set(val) {
        if (!Memory.towers) Memory.towers = {};
        Memory.towers[this.id] = val;
    }
});
```