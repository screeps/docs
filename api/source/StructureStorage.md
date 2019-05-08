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

Transfer resource from this storage to a creep. The target has to be at adjacent square. You can transfer resources to your creeps from hostile structures as well.

{% api_method_params %}
target : <a href="#Creep">Creep</a>
The target object.
===
resourceType : string
One of the <code>RESOURCE_*</code> constants.
===
amount (optional) : number
The amount of resources to be transferred. If omitted, all the available amount is used.
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | You are not the owner of the target creep, or there is a hostile rampart on top of the structure.
ERR_NOT_ENOUGH_RESOURCES | The structure does not have the given amount of energy.
ERR_INVALID_TARGET | The target is not a valid object which can contain energy.
ERR_FULL | The target cannot receive any more energy.
ERR_NOT_IN_RANGE | The target is too far away.
ERR_INVALID_ARGS | The energy amount is incorrect.
{% endapi_return_codes %}


