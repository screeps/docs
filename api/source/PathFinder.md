# PathFinder
 
 包含了在游戏中进行寻路的强大方法。这个模块使用原生的高性能 C++ 代码实现，并支持跨越多个房间的自定义寻路成本及路径。

{% api_method PathFinder.search 'origin, goal, [opts]' 3 %}

```javascript
  let creep = Game.creeps.John;

  let goals = _.map(creep.room.find(FIND_SOURCES), function(source) {
    // 我们没办法走到 source 上 -- 将 `range` 设置为 1
    // 所以我们将寻路至其旁边
    return { pos: source.pos, range: 1 };
  });

  let ret = PathFinder.search(
    creep.pos, goals,
    {
      // 我们需要把默认的移动成本设置的更高一点
      // 这样我们就可以在 roomCallback 里把道路移动成本设置的更低
      plainCost: 2,
      swampCost: 10,

      roomCallback: function(roomName) {

        let room = Game.rooms[roomName];
        // 在这个示例中，`room` 始终存在
        // 但是由于 PathFinder 支持跨多房间检索
        // 所以你要更加小心！
        if (!room) return;
        let costs = new PathFinder.CostMatrix;

        room.find(FIND_STRUCTURES).forEach(function(struct) {
          if (struct.structureType === STRUCTURE_ROAD) {
            // 相对于平原，寻路时将更倾向于道路
            costs.set(struct.pos.x, struct.pos.y, 1);
          } else if (struct.structureType !== STRUCTURE_CONTAINER &&
                     (struct.structureType !== STRUCTURE_RAMPART ||
                      !struct.my)) {
            // 不能穿过无法行走的建筑
            costs.set(struct.pos.x, struct.pos.y, 0xff);
          }
        });

        // 躲避房间中的 creep
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

在 <code>origin</code> 和 <code>goal</code> 之间查找最佳路径。

{% api_method_params %}
origin : <a href="#RoomPosition">RoomPosition</a>
起始位置。
===
goal : object

一个或一组目标。如果提供了多个目标，则返回所有目标中移动成本最低的路径。目标可以是一个 RoomPosition 或者包含下列定义的对象：

<em><strong>重要：</strong></em> 请注意，如果您的目标是无法行走的（例如，一个 source），请至少将 <code>range</code> 设置成至少为 1。否则您将浪费很多 CPU 资源来查找一个无法到达的目标。
					<ul>
						<li>
							<div class="api-arg-title">pos</div>
							<div class="api-arg-type"><a href="#RoomPosition"><code>RoomPosition</code></a></div>
							<div class="api-arg-desc">目标。</div>
						</li>
						<li>
							<div class="api-arg-title">range</div>
							<div class="api-arg-type">number</div>
							<div class="api-arg-desc"><code>pos</code> 周围被当作目的地的范围。默认为 0。</div>
						</li>
					</ul>
				
===
opts (optional) : object
一个包含其他寻路选项的对象。
<ul>
    <li>
        <div class="api-arg-title">roomCallback</div>
        <div class="api-arg-type">function</div>
        <div class="api-arg-desc">该回调可以用来生成某些房间的 <a href="#PathFinder-CostMatrix"><code>CostMatrix</code></a>，并提供给 pathfinder 来增强寻路效果。该回调拥有一个 <code>roomName</code> 参数。在寻路搜索中，每个房间只会被执行一次回调。如果您要在 1 tick 内为单个房间执行多次寻路操作，可以考虑缓存您的 CostMatrix 来提高代码运行效率。请阅读下方的 CostMatrix 文档来了解更多关于 CostMatrix 的信息。如果该回调返回 <code>false</code>，则对应的房间不会被搜索，并且该房间也不会加入到 <code>maxRooms</code>里。</div>
    </li>
    <li>
        <div class="api-arg-title">plainCost</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">平原上的移动成本，默认为 1。</div>
    </li>
    <li>
        <div class="api-arg-title">swampCost</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">沼泽上的移动成本，默认为 5。</div>
    </li>
    <li>
        <div class="api-arg-title">flee</div>
        <div class="api-arg-type">boolean</div>
        <div class="api-arg-desc">与其寻找<em>前往</em>目标的道路，不如寻找<em>远离</em>目标的道路。返回远离每个目标 <code>range</code> 的移动成本最低的路径。默认为 false。</div>
    </li>
    <li>
        <div class="api-arg-title">maxOps</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">寻路所允许的最大消耗。你可以限制用于搜索路径的 CPU 时间，基于 1 op ~ 0.001 CPU 的比例。默认值为 2000。</div>
    </li>
    <li>
        <div class="api-arg-title">maxRooms</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">寻路所允许的最大房间数。默认值为 16，最大至为 64。</div>
    </li>
    <li>
        <div class="api-arg-title">maxCost</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">寻路所允许的最大移动成本。如果 pathfinder 发现无论如何都找不到移动成本小于等于 `maxCost` 的路径时，它将立即停止搜索。默认值为无穷大(Infinity)。</div>
    </li>
    <li>
        <div class="api-arg-title">heuristicWeight</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">应用于 A\* 算法 <code>F = G + weight \* H</code> 中的启发式权重(weight)。在使用该选项之前您最好已经了解了 A\* 算法的底层实现！默认值为 1。</div>
    </li>
</ul>
				
{% endapi_method_params %}


### 返回值

包含以下属性的对象：

属性 | 介绍
---|---
`path` | RoomPosition 对象数组。
`ops` | 寻路完成时的 operation 总消耗。
`cost` | 从 `plainCost`，`swampCost` 和任何给定的 CostMatrix 实例推导出的移动总成本。
`incomplete` | 如果 pathfinder 找不到完整的路径的话，该值将为 true。注意，`path` 中依旧会有部分路径，其中的不完整路径代表在当前搜索限制下所能找到的最接近的路径。	


{% api_method PathFinder.use 'isEnabled' 0 '{"deprecated": true}' %} 

```javascript
PathFinder.use(true);
Game.creeps.John.moveTo(Game.spawns['Spawn1']);
```

指定是否在游戏中使用新的实验性 pathfinder。该方法应在每个 tick 调用。它将影响以下方法的行为：<a href="#Room.findPath"><code>Room.findPath</code></a>, <a href="#RoomPosition.findPathTo"><code>RoomPosition.findPathTo</code></a>, <a href="#RoomPosition.findClosestByPath"><code>RoomPosition.findClosestByPath</code></a>, <a href="#Creep.moveTo"><code>Creep.moveTo</code></a>.

{% api_method_params %}
isEnabled : boolean
是否要激活新的 pathfinder。默认值为 `true`。
{% endapi_method_params %}


