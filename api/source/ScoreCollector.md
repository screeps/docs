# ScoreCollector

Accepts score resource and enrolls it into your account. Use <a href="#Creep.transfer">Creep.transfer</a> to put scores into the collector.
 
Note: The capacity of each collector is limited. The used limit is replenished over time.

{% page inherited/RoomObject.md %}

{% api_property id 'string' %}

A unique object identificator. You can use <a href="#Game.getObjectById"><code>Game.getObjectById</code></a> method to retrieve an object instance by its <code>id</code>.

{% api_property store '<a href="#Store">Store</a>' %}

```javascript
const scoreCollectors = room.find(FIND_SCORE_COLLECTORS, {
    filter: (i) => i.store.getFreeCapacity(RESOURCE_SCORE) >= creep.carryCapacity
});
creep.transfer(scoreCollectors[0], RESOURCE_SCORE);
```
A [`Store`](#Store) object that contains resources of this object.
