# PathFinder.CostMatrix

Container for custom navigation cost data. By default `PathFinder` will only consider 
terrain data (plain, swamp, wall) — if you need to route around obstacles such as buildings 
or creeps you must put them into a `CostMatrix`. Generally you will create your `CostMatrix`
 from within `roomCallback`. If a non-0 value is found in a room's CostMatrix then that value 
 will be used instead of the default terrain cost. You should avoid using large values in your 
 CostMatrix and terrain cost flags. For example, running `PathFinder.search` with 
 `{ plainCost: 1, swampCost: 5 }` is faster than running it with `{plainCost: 2, swampCost: 10 }` 
 even though your paths will be the same.



{% api_method constructor %}

```javascript
let costs = new PathFinder.CostMatrix;
``` 

Creates a new CostMatrix containing 0's for all positions. 
 
  



{% api_method set 'x, y, cost' 0 %}

```javascript
let costs = new PathFinder.CostMatrix;
let pos = Game.spawns['Spawn1'].pos;
costs.set(pos.x, pos.y, 255); // Can't walk over a building
```

Set the cost of a position in this CostMatrix.

{% api_method_params %}
x : number
X position in the room.
===
y : number
Y position in the room.
===
cost : number
Cost of this position. Must be a whole number. A cost of 0 will use the terrain cost for that tile. A cost greater than or equal to 255 will be treated as unwalkable.
{% endapi_method_params %}




{% api_method get 'x, y' 0 %}



Get the cost of a position in this CostMatrix.

{% api_method_params %}
x : number
X position in the room.
===
y : number
Y position in the room.
{% endapi_method_params %}




{% api_method clone '' 1 %}



Copy this CostMatrix into a new CostMatrix with the same data.



### Return value

A new CostMatrix instance.

{% api_method serialize '' 1 %}

```javascript
let costs = new PathFinder.CostMatrix;
Memory.savedMatrix = costs.serialize();
```

Returns a compact representation of this CostMatrix which can be stored via <code>JSON.stringify</code>.



### Return value

An array of numbers. There's not much you can do with the numbers besides store them for later.

{% api_method PathFinder.CostMatrix.deserialize 'val' 1 %}

```javascript
let costs = PathFinder.CostMatrix.deserialize(Memory.savedMatrix)
```

Static method which deserializes a new CostMatrix using the return value of <code>serialize</code>.

{% api_method_params %}
val : object
Whatever <code>serialize</code> returned
{% endapi_method_params %}


### Return value

Returns new
<code>CostMatrix</code>
instance.
