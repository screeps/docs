# StructureStorage

<img src="img/storage.png" alt="" align="right" />

A structure that can store huge amount of resource units. Only one structure per room is allowed 
that can be addressed by [`Room.storage`](#Room.storage) property.</p>

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td colspan="2"><strong>Controller level</strong></td>
    </tr>
    <tr>
        <td>1-3</td>
        <td>—</td>
    </tr>
    <tr>
        <td>4-8</td>
        <td>1 storage</td>
    </tr>
    <tr>
        <td><strong>Cost</strong></td>
        <td>30,000</td>
    </tr>
    <tr>
        <td><strong>Hits</strong></td>
        <td>10,000</td>
    </tr>
    <tr>
        <td><strong>Capacity</strong></td>
        <td>1,000,000</td>
    </tr>
    </tbody>
</table>

{% page inherited/OwnedStructure.md %}


{% api_property store 'object' %}

```javascript
if(creep.room.storage.store[RESOURCE_ENERGY] == 0) {
    // replenish the storage!
}
```

```javascript
if( !(RESOURCE_UTRIUM in creep.room.storage.store) ) {
    // need more utrium!
}
```

```javascript
const total = _.sum(Game.rooms['W1N1'].storage.store);
```

仓库内容物对象。每一个键都是<code>RESOURCE_*</code>常量，值是资源数量。如果没有<code>RESOURCE_ENERGY</code>，它的值始终为0，而其他资源的值为undefined。你可以使用<a href="https://github.com/lodash/lodash/blob/3.10.1/doc/README.md#_sumcollection-iteratee-thisarg"><code>lodash.sum</code></a>来获得内容物总量。



{% api_property storeCapacity 'number' %}



可以容纳的资源总量。



{% api_method transfer 'target, resourceType, [amount]' A '{"deprecated": "Please use [`Creep.withdraw`](#Creep.withdraw) instead."}' %}

```javascript
storage.transfer(creep, RESOURCE_ENERGY);
```

Transfer resource from this storage to a creep. 目标必须在相邻的方格里。 You can transfer resources to your creeps from hostile structures as well.

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
ERR_NOT_OWNER | 你不是目标creep的拥有者，或者这个建筑上有建有敌对堡垒。
ERR_NOT_ENOUGH_RESOURCES | 这个建筑内的资源少于给定的数量。
ERR_INVALID_TARGET | 目标无法接受资源。
ERR_FULL | 目标无法接受更多能量。
ERR_NOT_IN_RANGE | 目标太远了。
ERR_INVALID_ARGS | 资源数量不正确。
{% endapi_return_codes %}


