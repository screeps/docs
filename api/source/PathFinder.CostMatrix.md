# PathFinder.CostMatrix

存放自定义导航寻路成本的对象。默认情况下，`PathFinder` 在寻路时只考虑地形 (平原、沼泽、墙壁) —— 如果您需要绕过建筑或者 creep，就需要把他们放进一个 `CostMatrix` 里。通常情况下，您将在 `roomCallback` 内部创建 `CostMatrix`。如果在房间的 CostMatrix 里找到了一个非零值，那么它将替代默认的地形移动成本。您应该避免在 CostMatrix 和地形移动成本标志里使用较大值。例如，使用 `{ plainCost: 1, swampCost: 5 }` 的 `PathFinder.search` 将比使用 `{plainCost: 2, swampCost: 10 }` 的运行的更快，并且他们将会寻路出相同的路径。



{% api_method constructor %}

```javascript
let costs = new PathFinder.CostMatrix;
``` 

创建一个新的 CostMatrix，其中所有位置的移动成本都为 0。
 
  



{% api_method set 'x, y, cost' 0 %}

```javascript
let costs = new PathFinder.CostMatrix;
let pos = Game.spawns['Spawn1'].pos;
costs.set(pos.x, pos.y, 255); // 不能从该建筑上移动
```

在 CostMatrix 中设置指定位置的移动成本。

{% api_method_params %}
x : number
位置在房间中的 x 坐标。
===
y : number
位置在房间中的 y 坐标。
===
cost : number
该位置的移动成本，必须是整数。值为 0 时将使用该地块默认的地形移动成本。大于或等于 255 的移动成本将视为无法通过。
{% endapi_method_params %}




{% api_method get 'x, y' 0 %}



获取该 CostMatrix 中指定位置的移动成本。

{% api_method_params %}
x : number
位置在房间中的 x 坐标。
===
y : number
位置在房间中的 y 坐标。
{% endapi_method_params %}




{% api_method clone '' 1 %}



使用当前 CostMatrix 中的相同数据创建一个新的 CostMatrix。



### 返回值

一个新的 CostMatrix 实例。

{% api_method serialize '' 1 %}

```javascript
let costs = new PathFinder.CostMatrix;
Memory.savedMatrix = costs.serialize();
```

返回该 CostMatrix 的紧凑形式，使其可以使用 <code>JSON.stringify</code> 进行存储。



### 返回值

一个 number 数组。它除了可以被保存起来以备后续使用之外没有什么作用。

{% api_method PathFinder.CostMatrix.deserialize 'val' 1 %}

```javascript
let costs = PathFinder.CostMatrix.deserialize(Memory.savedMatrix)
```

静态方法，可以将 <code>serialize</code> 方法返回的值反序列化为一个新的 CostMatrix。

{% api_method_params %}
val : object
任何 <code>serialize</code> 的返回值。
{% endapi_method_params %}


### 返回值

返回新的
<code>CostMatrix</code>
实例。
