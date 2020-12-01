# ScoreContainer

Contains score resource which can be withdrawn by creeps with a `CARRY` part.

{% page inherited/RoomObject.md %}

{% api_property id 'string' %}

A unique object identificator. You can use <a href="#Game.getObjectById"><code>Game.getObjectById</code></a> method to retrieve an object instance by its <code>id</code>.

{% api_property store '<a href="#Store">Store</a>' %}

```javascript
const scoreContainers = room.find(FIND_SCORE_CONTAINERS, {
    filter: (i) => i.store[RESOURCE_SCORE] > 500
});
```

A [`Store`](#Store) object that contains resources of this object.

{% api_property ticksToDecay 'number' %}

The amount of game ticks before this container decays.
