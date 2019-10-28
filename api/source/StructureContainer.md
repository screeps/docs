# StructureContainer

<img src="img/container.png" alt="" align="right" />

一个可以用来存储资源的小型容器。这是一个允许走上去的建筑。所有丢弃在同一方格上的资源都会被自动存储到 container 中。

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td><strong>控制器等级</strong></td>
        <td>任何等级 (包括无主房间)</td>
    </tr>
    <tr>
        <td><strong>每个房间允许建造的数量</strong></td>
        <td>5</td>
    </tr>
    <tr>
        <td><strong>容量</strong></td>
        <td>2,000</td>
    </tr>
    <tr>
        <td><strong>建筑花费</strong></td>
        <td>5,000</td>
    </tr>
    <tr>
        <td><strong>生命值</strong></td>
        <td>250,000</td>
    </tr>
    <tr>
        <td><strong>老化</strong></td>
        <td>在被自己控制的房间内每 500 tick 失去 5,000 生命值, 在没有控制的房间内该时间将降低至 100 tick。</td>
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
                                       
[`.store.getCapacity()`](#Store.getCapacity) 的别名。



{% api_property ticksToDecay 'number' %}



还有多少 tick 就要因老化而失去生命值。


