# SymbolContainer

Contains a symbol resource which can be withdrawn by creeps with a `CARRY` part.

{% page inherited/RoomObject.md %}

{% api_property id 'string' %}

A unique object identificator. You can use <a href="#Game.getObjectById"><code>Game.getObjectById</code></a> method to retrieve an object instance by its <code>id</code>.

{% api_property resourceType 'string' %}

The resource type, one of the <code>RESOURCE_*</code> constants from <code>SYMBOLS</code>.


{% api_property store '<a href="#Store">Store</a>' %}

```javascript
const symbolContainers = room.find(FIND_SYMBOL_CONTAINERS, {
    filter: (i) => i.store.getUsedCapacity() > 500
});
```

A [`Store`](#Store) object that contains resources of this object.

{% api_property ticksToDecay 'number' %}

The amount of game ticks before this container decays.
