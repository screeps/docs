# StructureTerminal

<img src="img/terminal.png" alt="" align="right" />

终端可以发送任意资源到另一个房间的终端。目标终端可以属于任何一个玩家。
每个事务都需要额外消耗能量（无论传输资源类型如何），
可以使用[`Game.market.calcTransactionCost`](#Game.market.calcTransactionCost)计算所需能量。
例如，从W0N0发送1000单位矿物到W10N5需要消耗742单位能量。
你可以使用[`Game.market`](#Game.market)对象跟踪你的收入和支出事务。
一个房间只会有一个终端，所以可以通过[`Room.terminal`](#Room.terminal)属性访问。

终端可以用于[交易系统](/market.html).

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td colspan="2"><strong>控制中心等级</strong></td>
    </tr>
    <tr>
        <td>1-5</td>
        <td>—</td>
    </tr>
    <tr>
        <td>6-8</td>
        <td>1 terminal</td>
    </tr>
    <tr>
        <td><strong>建筑成本</strong></td>
        <td>100,000</td>
    </tr>
    <tr>
        <td><strong>生命值</strong></td>
        <td>3,000</td>
    </tr>
    <tr>
        <td><strong>容量</strong></td>
        <td>300,000</td>
    </tr>
    <tr>
        <td><strong>冷却时间</strong></td>
        <td>10 ticks</td>
    </tr>
    </tbody>
</table> 

{% page inherited/OwnedStructure.md %}

{% api_property cooldown 'number' %}

这个终端不能调用[`StructureTerminal.send`](#StructureTerminal.send)或[`Game.market.deal`](#Game.market.deal)的剩余tick。


{% api_property store 'object' %}

```javascript
if( !(RESOURCE_UTRIUM in Game.rooms['W1N1'].terminal.store) ) {
    // 需要更多utrium!
}
```

```javascript
const total = _.sum(Game.rooms['W1N1'].terminal.store);
```

终端内容物对象。每一个键都是<code>RESOURCE_*</code>常量，值是资源数量。如果没有<code>RESOURCE_ENERGY</code>，它的值始终为0，而其他资源的值为undefined。你可以使用<a href="https://github.com/lodash/lodash/blob/3.10.1/doc/README.md#_sumcollection-iteratee-thisarg"><code>lodash.sum</code></a>来获得内容物总量。



{% api_property storeCapacity 'number' %}



可以容纳的资源总量。



{% api_method send 'resourceType, amount, destination, [description]' A %}

```javascript
Game.rooms['W1N1'].terminal.send(RESOURCE_UTRIUM, 100, 'W2N3',
	'trade contract #1');
```

发送资源给指定房间的终端

{% api_method_params %}
resourceType : string
<code>RESOURCE_*</code>常量之一。
===
amount : number
发送资源数量。最小100。
===
destination : string
目标房间名称。这个房间不需要对你可见。
===
description (optional) : string
这个事务的备注。它只对收件人可见。最大长度100字符。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个建筑的拥有者。
ERR_NOT_ENOUGH_RESOURCES | 这个建筑没有对应数量的资源。
ERR_INVALID_ARGS | 无效参数。
ERR_TIRED | 这个终端依然在冷却中。
{% endapi_return_codes %}



{% api_method transfer 'target, resourceType, [amount]' A '{"deprecated": "请使用[`Creep.withdraw`](#Creep.withdraw)替代。"}' %}

```javascript
Game.rooms['W1N1'].terminal.transfer(creep, RESOURCE_ENERGY);
```

从终端传递资源给creep。目标必须在相邻的方格里。你也可以从敌对建筑物传递资源给你的creep。

{% api_method_params %}
target : <a href="#Creep">Creep</a>
目标creep对象。
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
ERR_INVALID_TARGET | 目标无法接受能量。
ERR_FULL | 目标无法接受更多能量。
ERR_NOT_IN_RANGE | 目标太远了。
ERR_INVALID_ARGS | 资源数量不正确。
ERR_RCL_NOT_ENOUGH | 你的房间控制等级不足。
ERR_TIRED | 这个终端依然在冷却中。
{% endapi_return_codes %}


