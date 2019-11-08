# StructureSpawn

<img src="img/spawn.png" alt="" align="right" /> 

母巢是你的殖民地中心。这种结构可以创建、更新和回收creeps。
你的所有母巢都能通过 [`Game.spawns`](#Game.spawns) 这个hash list访问。
母巢每 tick 会自动生产少量能量，所以即使你的所有 creeps 都死亡也能轻松的恢复。

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td colspan="2"><strong>控制等级（Controller level）</strong></td>
    </tr>
    <tr>
        <td>1-6</td>
        <td>1 spawn</td>
    </tr>
    <tr>
        <td>7</td>
        <td>2 spawns</td>
    </tr>
    <tr>
        <td>8</td>
        <td>3 spawns</td>
    </tr>
    <tr>
        <td><strong>Cost</strong></td>
        <td>15,000</td>
    </tr>
    <tr>
        <td><strong>Hits</strong></td>
        <td>5,000</td>
    </tr>
    <tr>
        <td><strong>Capacity</strong></td>
        <td>300</td>
    </tr>
    <tr>
        <td><strong>Spawn time</strong></td>
        <td>3 ticks 每 body 组件</td>
    </tr>
    <tr>
        <td><strong>Energy auto-regeneration</strong></td>
        <td>当房间内的能量（所有的母巢和扩展中）低于300 时，每 tick 产生的能量单位为1。</td>
    </tr>
    </tbody>
</table>

{% page inherited/OwnedStructure.md %}


{% api_property energy 'number' '{"deprecated": true}' %}
                                                                
[`.store[RESOURCE_ENERGY]`](#StructureExtension.store) 的别名.



{% api_property energyCapacity 'number' '{"deprecated": true}' %}
                                                                                                                
[`.store.getCapacity(RESOURCE_ENERGY)`](#Store.getCapacity) 的别名.



{% api_property memory 'any' %}

```javascript
spawn.memory.queue = [];
```

<code>Memory.spawns[spawn.name]</code> 的一个简写。您可以使用它来快速访问母巢的特定内存数据对象。 <a href="/global-objects.html#Memory-object">了解更多关于 memory</a>



{% api_property name 'string' %}



Spawn 的名字。您在创建新母巢项时选择名称，以后无法更改。此名称是一个散列键，用于通过 <a href="#Game.spawns">Game.spawns</a> 对象访问。



{% api_property spawning '<a href="#StructureSpawn-Spawning">StructureSpawn.Spawning</a>' %}



如果母巢正在孵化一个新的 creep, 这个对象将包含一个 [`StructureSpawn.Spawning`](#StructureSpawn-Spawning) 对象，否则为 null。


{% api_property store 'object' %}

```javascript
if(structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
    creep.transfer(structure, RESOURCE_ENERGY);
}
```


一个 [`Store`](#Store) 对象，它包含这个建筑的所有货物。

{% api_method canCreateCreep 'body, [name]' 1 '{"deprecated": "请使用 [`StructureSpawn.spawnCreep`](#StructureSpawn.spawnCreep) 的 `dryRun` 标志代替。"}' %}

```javascript
if(spawn.canCreateCreep(body, name) == OK) {
    spawn.createCreep(body, name);
}
```

检查是否可以创建 creep。

{% api_method_params %}
body : array&lt;string&gt;
描述新 creep’s body 的数组。应该包含1至50个元素（以下常量之一）:
					
* `WORK`
* `MOVE`
* `CARRY`
* `ATTACK`
* `RANGED_ATTACK`
* `HEAL`
* `TOUGH`
* `CLAIM`
									
===
name (可选) : string
新 creep 的名字。它应该是唯一的 creep 名称, 所以 <code>Game.creeps</code> 对象不应该包含另一个同名的 creep (hash key)。如果没有定义，将生成一个随机名称。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 可以创建具有给定 body 和名称的 creep。
ERR_NOT_OWNER | 你不是这个母巢的主人。
ERR_NAME_EXISTS | 已经有一个叫这个名字的 creep 了。
ERR_BUSY | 这个母巢已经在孵化另一个 creep 了。
ERR_NOT_ENOUGH_ENERGY | 这个母巢和他的扩展包含的能量不足以孵化具有给定 body 的 creep。
ERR_INVALID_ARGS | Body 没有被恰当地描述。
ERR_RCL_NOT_ENOUGH | 您的房间控制器级别不足以使用此 spawn。
{% endapi_return_codes %}



{% api_method createCreep 'body, [name], [memory]' A '{"deprecated": "请使用 [`StructureSpawn.spawnCreep`](#StructureSpawn.spawnCreep) 代替。"}' %}

```javascript
Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], 'Worker1');
```

```javascript
Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], null, 
    {role: 'harvester'});
```

```javascript
const result = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE]);

if(_.isString(result)) {
    console.log('The name is: '+result);
}
else {
    console.log('Spawn error: '+result);
}
```
启动 creep 孵化过程。所需的能量量可以从房间里的所有母巢和扩展中提取出来。

{% api_method_params %}
body : array&lt;string&gt;
描述新 creep’s body 的数组。应该包含1至50个元素（以下常量之一）

* `WORK`
* `MOVE`
* `CARRY`
* `ATTACK`
* `RANGED_ATTACK`
* `HEAL`
* `TOUGH`
* `CLAIM`
				
===
name (可选) : string
新 creep 的名字。它应该是唯一的 creep 名称, 所以 <code>Game.creeps</code> 对象不应该包含另一个同名的 creep (hash key)。如果没有定义，将生成一个随机名称。

===
memory (可选) : any
一个新 creep 的 memory 。如果提供，它将立即存储到<code>Memory.creeps[name]</code>。
{% endapi_method_params %}


### 返回值

产生一个新的 creep 会遇到这些错误代码之一:
{% api_return_codes %}
ERR_NOT_OWNER | 你不是这个母巢的主人。
ERR_NAME_EXISTS | 已经有一个叫这个名字的 creep 了。
ERR_BUSY | 这个母巢已经在孵化另一个 creep 了。
ERR_NOT_ENOUGH_ENERGY | 这个母巢和他的扩展包含的能量不足以孵化具有给定 body 的 creep。
ERR_INVALID_ARGS | Body 没有被恰当地描述。
ERR_RCL_NOT_ENOUGH | 您的房间控制器级别不足以使用此 spawn。
{% endapi_return_codes %}



{% api_method spawnCreep 'body, name, [opts]' A %}

```javascript
Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Worker1');
```

```javascript
Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Worker1', {
    memory: {role: 'harvester'}
});
```

```javascript
Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Worker1', { 
    energyStructures: [
        Game.spawns['Spawn1'], 
        Game.getObjectById('anExtensionId')
    ]
});
```

```javascript
var testIfCanSpawn = Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 
    'Worker1', { dryRun: true });
```

启动 creep 孵化过程。所需的能量量可以从房间里的所有母巢和扩展中提取出来。

{% api_method_params %}
body : array&lt;string&gt;
描述新 creep’s body 的数组。应该包含1至50个元素（以下常量之一）

* `WORK`
* `MOVE`
* `CARRY`
* `ATTACK`
* `RANGED_ATTACK`
* `HEAL`
* `TOUGH`
* `CLAIM`
				
===
name : string
新 creep 的名字。它应该是唯一的 creep 名称, 所以 <code>Game.creeps</code> 对象不应该包含另一个同名的 creep (hash key)。如果没有定义，将生成一个随机名称。

===
opts (可选) : object
为孵化进程提供附加选项的对象。
<ul>
    <li>
        <div class="api-arg-title">memory</div>
        <div class="api-arg-type">any</div>
        <div class="api-arg-desc">一个新 creep 的 memory 。如果提供，它将立即存储到<code>Memory.creeps[name]</code>。</div>
    </li>
    <li>
        <div class="api-arg-title">energyStructures</div>
        <div class="api-arg-type">array</div>
        <div class="api-arg-desc">孵化时使用能量的 spawns/extensions 数组，建筑将按顺序使用其中的能量。</div>
    </li>
    <li>
        <div class="api-arg-title">dryRun</div>
        <div class="api-arg-type">boolean</div>
        <div class="api-arg-desc">如果“dryRun”为 true，则操作将仅检查是否可以孵化 creep。</div>
    </li>
    <li>
            <div class="api-arg-title">directions</div>
            <div class="api-arg-type">array<number></div>
            <div class="api-arg-desc">设置 creep 产生时移动的方向，是一个带有以下常量的数组:
                                          <ul>
                                              <li><code>TOP</code></li>
                                              <li><code>TOP_RIGHT</code></li>
                                              <li><code>RIGHT</code></li>
                                              <li><code>BOTTOM_RIGHT</code></li>
                                              <li><code>BOTTOM</code></li>
                                              <li><code>BOTTOM_LEFT</code></li>
                                              <li><code>LEFT</code></li>
                                              <li><code>TOP_LEFT</code></li>
                                          </ul></div>
        </li>
</ul>
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个母巢的主人。
ERR_NAME_EXISTS | 已经有一个叫这个名字的 creep 了。
ERR_BUSY | 这个母巢已经在孵化另一个 creep 了。
ERR_NOT_ENOUGH_ENERGY | 这个母巢和他的扩展包含的能量不足以孵化具有给定 body 的 creep。
ERR_INVALID_ARGS | Body 没有被恰当地描述。
ERR_RCL_NOT_ENOUGH | 您的房间控制器级别不足以使用此 spawn。
{% endapi_return_codes %}



{% api_method recycleCreep 'target' A %}



 杀死 creep ，并视其剩余寿命而掉落最多100％的资源用于其繁殖和增强。目标应该在相邻的方块上。每个身体部位的能量回收限制在125个单位。

{% api_method_params %}
target : <a href="#Creep">Creep</a>
目标 creep 对象。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 您不是此母巢或目标 creep 的所有者。
ERR_INVALID_TARGET | 指定的目标不是一个 creep 对象。
ERR_NOT_IN_RANGE | 目标 creep 太远了。
ERR_RCL_NOT_ENOUGH | 您的房间控制器级别不足以使用此 spawn。
{% endapi_return_codes %}



{% api_method renewCreep 'target' A %}


增加目标 creep 的剩余生存时间。 目标应在相邻的方格处。spawn 不应忙于孵化过程。每次执行都会增加 creep 的计时器，根据此公式按 ticks 数计算：

```javascript-content
floor(600/body_size)
```

每次执行所需的能量由以下公式确定:

```javascript-content
ceil(creep_cost/2.5/body_size)
```

更新 creep 会移除所有的增益。

{% api_method_params %}
target : <a href="#Creep">Creep</a>
目标 creep 对象。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是该 spawn 或者该 creep 的所有者。
ERR_BUSY | 这个母巢已经在孵化另一个 creep 了。
ERR_NOT_ENOUGH_ENERGY | 这个母巢和他的扩展包含的能量不足以孵化具有给定 body 的 creep。
ERR_INVALID_TARGET | 指定的目标不是一个 creep 对象。
ERR_FULL | 目标计时器的时间已经满了。
ERR_NOT_IN_RANGE | 目标 creep 太远了。
ERR_RCL_NOT_ENOUGH | 您的房间控制器级别不足以使用此 spawn。
{% endapi_return_codes %}





# StructureSpawn.Spawning

当前正在孵化的 creep 的详细信息可以通过[`StructureSpawn.spawning`](#StructureSpawn.spawning)属性进行处理。

{% api_property directions 'array<number>' %}

一个带有孵化指令的数组，参见 [`StructureSpawn.Spawning.setDirections`](#StructureSpawn.Spawning.setDirections).

{% api_property name 'string' %}

新 creep 的名字

{% api_property needTime 'number' %}

完成孵化总共需要的时间。

{% api_property remainingTime 'number ' %}

剩下的时间。

{% api_property spawn '<a href="#StructureSpawn">StructureSpawn</a>' %}

一个到 creep 的链接。


{% api_method cancel '' A %}

```javascript
Game.spawns['Spawn1'].spawning.cancel();
```

立即取消孵化。花在产卵上的资源不返还。

### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个母巢的主人。
{% endapi_return_codes %}

{% api_method setDirections 'directions' A %}

```javascript
Game.spawns['Spawn1'].spawning.setDirections([RIGHT, TOP_RIGHT]);
```

设置所需的方向，以使它们在生成时应移动到的位置。

{% api_method_params %}
directions : array&lt;number>
设置 creep 产生时移动的方向，是一个带有以下常量的数组:
    <ul>
        <li><code>TOP</code></li>
        <li><code>TOP_RIGHT</code></li>
        <li><code>RIGHT</code></li>
        <li><code>BOTTOM_RIGHT</code></li>
        <li><code>BOTTOM</code></li>
        <li><code>BOTTOM_LEFT</code></li>
        <li><code>LEFT</code></li>
        <li><code>TOP_LEFT</code></li>
    </ul>
{% endapi_method_params %}

### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个母巢的主人。
ERR_INVALID_ARGS | Body 没有被恰当地描述。
{% endapi_return_codes %}
