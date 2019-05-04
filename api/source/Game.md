# Game    

包含所有游戏信息的主要全局游戏对象。


{% api_property Game.constructionSites 'object&lt;string, <a href="#ConstructionSite">ConstructionSite</a>&gt;' %}


包含你所有施工工地的 hash，并以 id 作为关键字。


{% api_property Game.cpu 'object' %}


包含有关 CPU 使用率信息的对象，具有以下属性：


{% api_method_params %}
limit : number
你在当前指定 shard 的CPU限制。
===
tickLimit : number
当前游戏 tick 可用的 CPU 时间。
<br>通常它高于 <code>Game.cpu.limit</code>. <a href="/cpu-limit.html">了解更多</a>
===
bucket : number
在你的 <a href="/cpu-limit.html#Bucket">bucket</a> 中累积的未使用的 CPU 数量。
===
shardLimits : object<br>&lt;string,number&gt;
每个 shard 限制的对象，以 shard 名称为关键字。你可以使用 [`setShardLimits`](#Game.setShardLimits)
 方法重设他们。
{% endapi_method_params %}


{% api_property Game.creeps 'object&lt;string, <a href="#Creep">Creep</a>&gt;' %}

```javascript
for(const i in Game.creeps) {
    Game.creeps[i].moveTo(flag);
}
```

包含你所有 creep 的 hash，并以 creep 名作为关键字。


{% api_property Game.flags 'object&lt;string, <a href="#Flag">Flag</a>&gt;' %}

```javascript
creep.moveTo(Game.flags.Flag1);
```

包含你所有 flag 的 hash，以 flag 名作为关键字。


{% api_property Game.gcl 'object' %}


你的<a href="/control.html#Global-Control-Level">全局控制等级（Global Control Level）</a>的对象，具有以下属性：

{% api_method_params %}
level : number
当前的等级。
===
progress : number
到下一个等级当前的进展。
===
progressTotal : number
到下一个等级所需的进展。
{% endapi_method_params %}

{% api_property Game.gpl 'object' %}

你的全局能量等级（Global Power Level）</a>的对象，具有以下属性：

{% api_method_params %}
level : number
当前的等级。
===
progress : number
到下一个等级当前的进展。
===
progressTotal : number
到下一个等级所需的进展。
{% endapi_method_params %}


{% api_property Game.map object %}


表示世界地图的全局对象。 请参照此[文档](#Game-map)。


{% api_property Game.market object %}


表示游戏内市场的全局对象。 请参照此[文档](#Game-market) 


{% api_property Game.powerCreeps 'object&lt;string, <a href="#PowerCreep">PowerCreep</a>&gt;' %}

```javascript
Game.powerCreeps['PC1'].moveTo(flag);
```

包含你所有能量 creep 的 hash，以 creep 名作为关键字。升值可以在这里访问没有生产的能量 creep。 


{% api_property Game.resources 'object' %}


表示你账户中全局资源的对象，例如订阅令牌。每个对象的关键字都是一个资源常量，值是资源量。


{% api_property Game.rooms 'object&lt;string, <a href="#Room">Room</a>&gt;' %}


包含所有对你可用的房间的 hash，以房间名作为关键字。一个房间在你有一个 creep 或者自有建筑在其中时可见。


{% api_property Game.shard 'object' %}

表示当前正在执行脚本的 shard 的对象。

{% api_method_params %}
name : string
shard 的名称。
===
type : string
目前总是等于 `normal`.
===
ptr : boolean
这个 shard 是否为 [PTR](/ptr.html).
{% endapi_method_params %}

{% api_property Game.spawns 'object&lt;string, <a href="#StructureSpawn">StructureSpawn</a>&gt;' %}

```javascript
for(const i in Game.spawns) {
    Game.spawns[i].createCreep(body);
}
```

包含你所有 spawn 的 hash，以 spawn 名作为关键字。


{% api_property Game.structures 'object&lt;string, <a href="#Structure">Structure</a>&gt;' %}


包含你所有 structures 的 hash，以 structures 名作为关键字。


{% api_property Game.time 'number' %}

```javascript
console.log(Game.time);
```

系统游戏 tick 计数。他在每个 tick 自动递增。点此<a href="/game-loop.html">了解更多</a>。


{% api_method Game.cpu.getHeapStatistics '' 1 %}

```javascript
let heap = Game.cpu.getHeapStatistics();
console.log(`Used ${heap.total_heap_size} / ${heap.heap_size_limit}`);
```

*这个方法只在**虚拟机**在你的[账户运行时设置](https://screeps.com/a/#!/account/runtime)中被设为 **Isolated** 时可用* 

使用此方法获取虚拟机的堆统计信息。 返回值几乎与 Node.js 函数 [`v8.getHeapStatistics()`](https://nodejs.org/dist/latest-v8.x/docs/api/v8.html#v8_v8_getheapstatistics)相同。 此函数返回一个附加属性： `externally_allocated_size`，它是当前分配的内存总量，不包含在 v8 堆中，但会计入此隔离的内存限制。 超过一定大小的 `ArrayBuffer` 实例是外部分配的，将在此计算。



### 返回值

以下列格式返回具有堆统计信息的对象：

```javascript-content
{
  "total_heap_size": 29085696,
  "total_heap_size_executable": 3670016,
  "total_physical_size": 26447928,
  "total_available_size": 319649520,
  "used_heap_size": 17493824,
  "heap_size_limit": 343932928,
  "malloced_memory": 8192,
  "peak_malloced_memory": 1060096,
  "does_zap_garbage": 0,
  "externally_allocated_size": 38430000
}
```


{% api_method Game.cpu.getUsed '' 1 %}

```javascript
if(Game.cpu.getUsed() > Game.cpu.tickLimit / 2) {
    console.log("Used half of CPU already!");
}
```

```javascript
for(const name in Game.creeps) {
    const startCpu = Game.cpu.getUsed();

    // creep logic goes here

    const elapsed = Game.cpu.getUsed() - startCpu;
    console.log('Creep '+name+' has used '+elapsed+' CPU time');
}

```

获取当前游戏开始时使用的 CPU 时间总量。在模拟模式下始终返回 0.


### 返回值

以浮点数返回当前使用的 CPU 时间。


{% api_method Game.cpu.halt '' 1 %}

```javascript
Game.cpu.halt();
```

*这个方法只在**虚拟机**在你的[账户运行时设置](https://screeps.com/a/#!/account/runtime)中被设为 **Isolated** 时可用* 

重置你的运行环境并擦除堆内存中的所有数据。

{% api_method Game.cpu.setShardLimits 'limits' 1 %}

```javascript
Game.cpu.setShardLimits({shard0: 20, shard1: 10});
```

分配 CPU 限制到不同的 shard。CPU总量应保持等于 [`Game.cpu.shardLimits`](#Game.cpu)。此方法每 12 小时只能使用一次。

{% api_method_params %}
limits : object&lt;string, number&gt;
表示每个 shard 的 CPU 值，与 `Game.cpu.shardLimits` 格式相同。
{% endapi_method_params %}


### 返回值

以下代码之一：
{% api_return_codes %}
OK | 该操作已成功安排。
ERR_BUSY | 12 小时的冷却时间尚未结束。
ERR_INVALID_ARGS | 该参数不是有效的 shard 限制对象。
{% endapi_return_codes %}


{% api_method Game.getObjectById 'id' 1 %}

```javascript
creep.memory.sourceId = creep.pos.findClosestByRange(FIND_SOURCES).id;
const source = Game.getObjectById(creep.memory.sourceId);
```

获取具有唯一指定 ID 的对象。 它可以是任何类型的游戏对象。 只能访问您可见的房间内的物体。

{% api_method_params %}
id : string
The unique identificator.
{% endapi_method_params %}


### 返回值

返回一个对象实例，若找不到则返回 null。

{% api_method Game.notify 'message, [groupInterval]' A %}

```javascript
if(creep.hits < creep.memory.lastHits) {
    Game.notify('Creep '+creep+' has been attacked at '+creep.pos+'!');
}
creep.memory.lastHits = creep.hits;
```

```javascript
if(Game.spawns['Spawn1'].energy == 0) {
    Game.notify(
        'Spawn1 is out of energy',
        180  // group these notifications for 3 hours
    );
}

```

向你的个人资料中的邮件发送信息。由此，你可以在游戏中的任何场合为自己设置通知。你最多可以安排 20 个通知。在模拟模式中不可用。

{% api_method_params %}
message : string
将在消息中发送的自定义文本。最大长度为 1000 个字符。
===
groupInterval : number
如果被设为 0 (默认), 通知将被立即安排。 否早他将于其他通知编组，并在指定的时间（分钟）寄出。
{% endapi_method_params %}
