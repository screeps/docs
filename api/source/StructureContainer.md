# StructureContainer

<img src="img/container.png" alt="" align="right" />

A small container that can be used to store resources. This is a walkable structure. All dropped resources automatically goes to the container at the same tile.

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td><strong>Controller level</strong></td>
        <td>Any (including neutral rooms)</td>
    </tr>
    <tr>
        <td><strong>Available per room</strong></td>
        <td>5</td>
    </tr>
    <tr>
        <td><strong>Capacity</strong></td>
        <td>2,000</td>
    </tr>
    <tr>
        <td><strong>Cost</strong></td>
        <td>5,000</td>
    </tr>
    <tr>
        <td><strong>Hits</strong></td>
        <td>250,000</td>
    </tr>
    <tr>
        <td><strong>Decay</strong></td>
        <td>Loses 5,000 hits every 500 ticks in an owned room, and every 100 ticks in an unowned room.</td>
    </tr>
    </tbody>
</table>

{% page inherited/Structure.md %}

{% api_property store 'object' %}

```javascript
const containersWithEnergy = room.find(FIND_STRUCTURES, {
    filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                   i.store[RESOURCE_ENERGY] > 0
});
```

```javascript
const total = _.sum(container.store);
``` 

容器内容物对象。每一个键都是<code>RESOURCE_*</code>常量，值是资源数量。如果没有<code>RESOURCE_ENERGY</code>，它的值始终为0，而其他资源的值为undefined。你可以使用<a href="https://github.com/lodash/lodash/blob/3.10.1/doc/README.md#_sumcollection-iteratee-thisarg"><code>lodash.sum</code></a>来获得内容物总量。



{% api_property storeCapacity 'number' %}

一个包含了该建筑中所存储的货物的 [`Store`](#Store) 对象。

{% api_property storeCapacity 'number' '{"deprecated": true}' %}
                                       
An alias for [`.store.getCapacity()`](#Store.getCapacity).



{% api_property ticksToDecay 'number' %}



The amount of game ticks when this container will lose some hit points.



{% api_method transfer 'target, resourceType, [amount]' A '{"deprecated": "Please use [`Creep.withdraw`](#Creep.withdraw) instead."}' %}

```javascript
const containers = creep.pos.findInRange(FIND_STRUCTURES, 1,
      {filter: {structureType: STRUCTURE_CONTAINER}});
containers[0].transfer(creep, RESOURCE_ENERGY);
```

Transfer resource from this structure to a creep. 目标必须在相邻的方格里。

{% api_method_params %}
target : <a href="#Creep">Creep</a>
The target object.
===
resourceType : string
<code>RESOURCE_*</code>常量之一。
===
amount (optional) : number
被传递资源的数量。如果没有这个参数，传递全部可用数量的资源。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_ENOUGH_RESOURCES | 这个建筑内的资源少于给定的数量。
ERR_INVALID_TARGET | 目标无法接受资源。
ERR_FULL | 目标无法接受更多能量。
ERR_NOT_IN_RANGE | 目标太远了。
ERR_INVALID_ARGS | 资源数量不正确。
{% endapi_return_codes %}


