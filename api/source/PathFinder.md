# PathFinder
 
 Contains powerful methods for pathfinding in the game world. This module is written in fast native C++ code and supports custom navigation costs and paths which span multiple rooms. 

{% api_method PathFinder.search 'origin, goal, [opts]' 3 %}

```javascript
  let creep = Game.creeps.John;

  let goals = _.map(creep.room.find(FIND_SOURCES), function(source) {
    // We can't actually walk on sources-- set `range` to 1 
    // so we path next to it.
    return { pos: source.pos, range: 1 };
  });

  let ret = PathFinder.search(
    creep.pos, goals,
    {
      // We need to set the defaults costs higher so that we
      // can set the road cost lower in `roomCallback`
      plainCost: 2,
      swampCost: 10,

      roomCallback: function(roomName) {

        let room = Game.rooms[roomName];
        // In this example `room` will always exist, but since 
        // PathFinder supports searches which span multiple rooms 
        // you should be careful!
        if (!room) return;
        let costs = new PathFinder.CostMatrix;

        room.find(FIND_STRUCTURES).forEach(function(struct) {
          if (struct.structureType === STRUCTURE_ROAD) {
            // Favor roads over plain tiles
            costs.set(struct.pos.x, struct.pos.y, 1);
          } else if (struct.structureType !== STRUCTURE_CONTAINER &&
                     (struct.structureType !== STRUCTURE_RAMPART ||
                      !struct.my)) {
            // Can't walk through non-walkable buildings
            costs.set(struct.pos.x, struct.pos.y, 0xff);
          }
        });

        // Avoid creeps in the room
        room.find(FIND_CREEPS).forEach(function(creep) {
          costs.set(creep.pos.x, creep.pos.y, 0xff);
        });

        return costs;
      },
    }
  );

  let pos = ret.path[0];
  creep.move(creep.pos.getDirectionTo(pos));
```

Find an optimal path between <code>origin</code> and <code>goal</code>.

{% api_method_params %}
origin : <a href="#RoomPosition">RoomPosition</a>
The start position.
===
goal : object

A goal or an array of goals. If more than one goal is supplied then the cheapest path found out of all the goals will be returned. A goal is either a RoomPosition or an object as defined below.

<em><strong>Important:</strong></em> Please note that if your goal is not walkable (for instance, a source) then you should set <code>range</code> to at least 1 or else you will waste many CPU cycles searching for a target that you can't walk on.
					<ul>
						<li>
							<div class="api-arg-title">pos</div>
							<div class="api-arg-type"><a href="#RoomPosition"><code>RoomPosition</code></a></div>
							<div class="api-arg-desc">The target.</div>
						</li>
						<li>
							<div class="api-arg-title">range</div>
							<div class="api-arg-type">number</div>
							<div class="api-arg-desc">Range to <code>pos</code> before goal is considered reached. The default is 0.</div>
						</li>
					</ul>
				
===
opts (optional) : object
An object containing additional pathfinding flags.
<ul>
    <li>
        <div class="api-arg-title">roomCallback</div>
        <div class="api-arg-type">function</div>
        <div class="api-arg-desc">Request from the pathfinder to generate a <a href="#PathFinder-CostMatrix"><code>CostMatrix</code></a> for a certain room. The callback accepts one argument, <code>roomName</code>. This callback will only be called once per room per search. If you are running multiple pathfinding operations in a single room and in a single tick you may consider caching your CostMatrix to speed up your code. Please read the CostMatrix documentation below for more information on CostMatrix. If you return <code>false</code> from the callback the requested room will not be searched, and it won't count against <code>maxRooms</code></div>
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
    <li>
        <div class="api-arg-title">flee</div>
        <div class="api-arg-type">boolean</div>
        <div class="api-arg-desc">Instead of searching for a path <em>to</em> the goals this will search for a path <em>away</em> from the goals. The cheapest path that is out of <code>range</code> of every goal will be returned. The default is false.</div>
    </li>
    <li>
        <div class="api-arg-title">maxOps</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">The maximum allowed pathfinding operations. You can limit CPU time used for the search based on ratio 1 op ~ 0.001 CPU. The default value is 2000.</div>
    </li>
    <li>
        <div class="api-arg-title">maxRooms</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">The maximum allowed rooms to search. The default is 16, maximum is 64.</div>
    </li>
    <li>
        <div class="api-arg-title">maxCost</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">The maximum allowed cost of the path returned. If at any point the pathfinder detects that it is impossible to find a path with a cost less than or equal to `maxCost` it will immediately halt the search. The default is Infinity.</div>
    </li>
    <li>
        <div class="api-arg-title">heuristicWeight</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">Weight to apply to the heuristic in the A\* formula <code>F = G + weight \* H</code>. Use this option only if you understand the underlying A\* algorithm mechanics! The default value is 1.2.</div>
    </li>
</ul>
				
{% endapi_method_params %}


### Return value

An object containing the following properties:

property | description
---|---
`path` | An array of RoomPosition objects.
`ops` | Total number of operations performed before this path was calculated.
`cost` | The total cost of the path as derived from `plainCost`, `swampCost` and any given CostMatrix instances.
`incomplete` | If the pathfinder fails to find a complete path, this will be true. Note that `path` will still be populated with a partial path which represents the closest path it could find given the search parameters.			


{% api_method PathFinder.use 'isEnabled' 0 '{"deprecated": true}' %} 

```javascript
PathFinder.use(false);
Game.creeps.John.moveTo(Game.spawns['Spawn1']);
```

`PathFinder` is enabled by default. This method can be used to disable `PathFinder` and use an older, slower algorithm (although doing so is not recommended). This method should be invoked every tick when used. It affects the following methods behavior: <a href="#Room.findPath"><code>Room.findPath</code></a>, <a href="#RoomPosition.findPathTo"><code>RoomPosition.findPathTo</code></a>, <a href="#RoomPosition.findClosestByPath"><code>RoomPosition.findClosestByPath</code></a>, <a href="#Creep.moveTo"><code>Creep.moveTo</code></a>.

{% api_method_params %}
isEnabled : boolean
Whether to activate or deactivate the pathfinder. The default is `true`.
{% endapi_method_params %}


