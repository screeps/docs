# Game.market

描述游戏内市场的全局变量。您可以使用该对象追踪从您的终端接收/发送的资源交易，以及您的购买/出售订单。

点击 [本文](/market.html) 来了解更多关于市场系统的信息。

{% api_property Game.market.credits 'number' %}



您当前的 credit 余额。



{% api_property Game.market.incomingTransactions 'array' %}

```javascript
[{
    transactionId : "56dec546a180ce641dd65960",
    time : 10390687,
    sender : {username: "Sender"},
    recipient : {username: "Me"},
    resourceType : "U",
    amount : 100,
    from : "W0N0",
    to : "W10N10",
    description : "trade contract #1",
	order: {		// 可选的
		id : "55c34a6b5be41a0a6e80c68b",
		type : "sell",
		price : 2.95
	}
}]
```

一个数组，内容为您终端接收的最近 100 笔交易，格式详见右侧：



{% api_property Game.market.outgoingTransactions 'array' %}

```javascript
[{
    transactionId : "56dec546a180ce641dd65960",
    time : 10390687,
    sender : {username: "Me"},
    recipient : {username: "Recipient"},
    resourceType : "U",
    amount : 100,
    from : "W0N0",
    to : "W10N10",
    description : "trade contract #1",
	order: {		// 可选的
		id : "55c34a6b5be41a0a6e80c68b",
		type : "sell",
		price : 2.95
	}
}]
```

一个数组，内容为您终端发送的最近 100 笔交易，格式详见右侧：



{% api_property Game.market.orders 'object' %}

```javascript
{
	"55c34a6b5be41a0a6e80c68b": {
		id : "55c34a6b5be41a0a6e80c68b",
		created : 13131117,
		active: true,
		type : "sell"
		resourceType : "OH",
		roomName : "W1N1",
		amount : 15821,
		remainingAmount : 30000,
		totalAmount : 50000,
		price : 2.95
	},
	"55c34a6b52411a0a6e80693a": {
		id : "55c34a6b52411a0a6e80693a",
		created : 13134122,
		active: true,
		type : "buy"
		resourceType : "energy",
		roomName : "W1N1",
		amount : 94000,
		remainingAmount : 94000,
		totalAmount : 94000
		price : 0.45
	},
	"55c34a6b5be41a0a6e80c123": {
		id : "55c34a6b5be41a0a6e80c123",
		created : 13105123,
		active: false,
		type : "sell"
		resourceType : "token",
		amount : 0,
		remainingAmount : 10,
		totalAmount : 10,
		price : 50000
	}
}
```

一个对象，包含了您在市场中活跃 (activated) 和非活跃 (deactivated) 的购买/出售订单。
查看
<a href="#Game.market.getAllOrders"><code>getAllOrders</code></a>
来了解其详细说明。


{% api_method Game.market.calcTransactionCost 'amount, roomName1, roomName2' 0 %}

```javascript
const cost = Game.market.calcTransactionCost(1000, 'W0N0', 'W10N5');
// -> 284 单位能量
```

估算 <a href="#StructureTerminal.send"><code>StructureTerminal.send</code></a> 和 <a href="#Game.market.deal"><code>Game.market.deal</code></a> 方法的能量交易成本。
算法：

```javascript-content
Math.ceil( amount * ( 1 - Math.exp(-distanceBetweenRooms/30) ) )
```

{% api_method_params %}
amount : number
要发送的资源数量。
===
roomName1 : string
第一个房间的名称。
===
roomName2 : string
第二个房间的名称。
{% endapi_method_params %}


### 返回值

进行交易所需的能量。

{% api_method Game.market.cancelOrder 'orderId' A %}

```javascript
for(const id in Game.market.orders) {
    Game.market.cancelOrder(id);
}
```

取消先前创建的订单。5% 的费用将不予退还。

{% api_method_params %}
orderId : string
<code>Game.market.orders</code> 中提供的订单 ID。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_INVALID_ARGS | 无效的订单 ID。
{% endapi_return_codes %}



{% api_method Game.market.changeOrderPrice 'orderId, newPrice' A %}

```javascript
Game.market.changeOrderPrice('57bec1bf77f4d17c4c011960', 9.95);
```

修改一个已存在订单的单价。如果 <code>newPrice</code> 大于之前的单价，将向您收取 <code>(newPrice-oldPrice)\*remainingAmount\*0.05</code> credit 的费用。

{% api_method_params %}
orderId : string
<code>Game.market.orders</code> 提供的订单 ID。
===
newPrice : number
新的订单单价。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 您不是该房间终端的所有者或者该房间没有终端。
ERR_NOT_ENOUGH_RESOURCES | 您没有足够的 credit 来缴纳费用。
ERR_INVALID_ARGS | 提供了无效的参数。
{% endapi_return_codes %}


{% api_method Game.market.createOrder 'params' A %}

```javascript
Game.market.createOrder({
    type: ORDER_SELL,
    resourceType: RESOURCE_GHODIUM,
    price: 9.95,
    totalAmount: 10000,
    roomName: "W1N1"   
});
```

从您的终端创建一个市场订单。下单时将向您收取 <code>price\*amount\*0.05</code> credit 的费用。每个玩家最多可以拥有 300 个订单。您可以在任意时刻使用任意数量创建一个订单。之后会自动根据其可用资源量和 credit 来将其状态设置为活跃和非活跃。

{% api_method_params %}
params : object
包含下列参数的对象：
<ul>
    <li>
        <div class="api-arg-title">type</div>
        <div class="api-arg-type">string</div>
        <div class="api-arg-desc">订单类型，<code>ORDER_SELL</code> 或者 <code>ORDER\_BUY</code>。</div>
    </li>
    <li>
        <div class="api-arg-title">resourceType</div>
        <div class="api-arg-type">string</div>
        <div class="api-arg-desc"><code>RESOURCE_*</code> 常量之一或者 <code>SUBSCRIPTION_TOKEN</code>。如果您的终端暂时没有指定类型的资源，则该订单将暂时是无效的。</div>
    </li>
    <li>
        <div class="api-arg-title">price</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">资源的单价（单位: credit）。可以包含小数。</div>
    </li>
    <li>
        <div class="api-arg-title">totalAmount</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">要交易的资源总量。</div>
    </li>
    <li>
        <div class="api-arg-title">roomName (可选)</div>
        <div class="api-arg-type">string</div>
        <div class="api-arg-desc">创建订单时要指定的房间。您必须在该房间中拥有属于您的终端（Terminal）。否则该订单将是暂时无效的。当 <code>resourceType</code> 参数的值为 <code>SUBSCRIPTION_TOKEN</code> 时可以忽略该项。</div>
    </li>        
</ul>
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 您不是该房间终端的所有者或者该房间没有终端。
ERR_NOT_ENOUGH_RESOURCES | 您没有足够的 credit 来缴纳费用。
ERR_FULL | 您不能创建超过 300 个订单。
ERR_INVALID_ARGS | 提供了无效的参数。
{% endapi_return_codes %}



{% api_method Game.market.deal 'orderId, amount, [yourRoomName]' A %}

```javascript
Game.market.deal('57cd2b12cda69a004ae223a3', 1000, "W1N1");
```

```javascript
const amountToBuy = 2000, maxTransferEnergyCost = 500;
const orders = Game.market.getAllOrders({type: ORDER_SELL, resourceType: RESOURCE_GHODIUM});

for(let i=0; i<orders.length; i++) {
    const transferEnergyCost = Game.market.calcTransactionCost(
        amountToBuy, 'W1N1', orders[i].roomName);

    if(transferEnergyCost < maxTransferEnergyCost) {
        Game.market.deal(orders[i].id, amountToBuy, "W1N1");
        break;
    }
}
```

使用 <code>yourRoomName</code> 房间中的终端处理一个贸易订单，根据订单类型(购入/卖出)来和其他玩家的终端进行交易。无论订单类型如何，您的终端都将承担本次资源交易所产生的能量消耗。您可以使用 <a href="#calcTransactionCost"><code>Game.market.calcTransactionCost</code></a> 方法估算运输成本。当多个玩家尝试处理同一个订单时，距离更近的玩家优先。您每 tick 不能处理超过 10 笔交易。

{% api_method_params %}
orderId : string
来自 <code>Game.market.getAllOrders</code> 的订单 ID。
===
amount : number
要转移的资源数量。
===
yourRoomName (可选) : string
您的某个房间名称，该房间应该存在有包含足够能量的可用终端。当订单的资源类型为 <code>SUBSCRIPTION_TOKEN</code> 时无需填写该参数。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 目标房间中不存在属于您的终端。
ERR_NOT_ENOUGH_RESOURCES | 您没有足够的 credit 或者资源。
ERR_FULL | 您每 tick 不能处理超过 10 笔交易。
ERR_INVALID_ARGS | 提供了无效的参数。
ERR_TIRED | 目标终端仍在冷却。
{% endapi_return_codes %}



{% api_method Game.market.extendOrder 'orderId, addAmount' A %}

```javascript
Game.market.extendOrder('57bec1bf77f4d17c4c011960', 10000);
```

为一个已存在的订单添加容量。它将影响 <code>remainingAmount</code> 和 <code>totalAmount</code> 属性。您将要为此支付 <code>price\*addAmount\*0.05</code> credit 的手续费。

{% api_method_params %}
orderId : string
<code>Game.market.orders</code> 中提供的订单 ID。
===
addAmount : number
要增加多少容量。不能为负数。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_ENOUGH_RESOURCES | 您没有足够的 credit 来缴纳费用。
ERR_INVALID_ARGS | 提供了无效的参数。
{% endapi_return_codes %}



{% api_method Game.market.getAllOrders '[filter]' 3 %}


```javascript
Game.market.getAllOrders();
```

```javascript
Game.market.getAllOrders({type: ORDER_SELL, resourceType: RESOURCE_GHODIUM});
```

```javascript
const targetRoom = "W1N1";
Game.market.getAllOrders(order => order.resourceType == RESOURCE_GHODIUM &&
	order.type == ORDER_SELL &&
    Game.market.calcTransactionCost(1000, targetRoom, order.roomName) < 500);
```

```javascript
// 输出：

[{
	id : "55c34a6b5be41a0a6e80c68b",
	created : 13131117,
	type : "sell",
	resourceType : "OH",
	roomName : "W1N1",
	amount : 15821,
	remainingAmount : 30000,
	price : 2.95
}, {
    createdTimestamp: 1543253147522,
    type: "sell",
    amount: 1000,
    remainingAmount: 1000,
    resourceType: "O",
    price: 1,
    roomName: "E2S7",
    created: 12010056,
    id: "5bfc2c9bd719fb605037c06d"
}, {
	id : "55c34a6b5be41a0a6e80c123",
	createdTimestamp: 1543253155580,
	type : "sell",
	resourceType : "token",
	amount : 3,
	remainingAmount : 10,
	price : 50000
}]
```

获取当前市场上其他玩家活跃的订单。

{% api_method_params %}
filter (optional) : object, function
一个对象或者函数，将使用 <a href="https://lodash.com/docs#filter"><code>lodash.filter</code></a> 方法对结果列表进行筛选。
{% endapi_method_params %}


### 返回值

一个订单数组，订单格式如下：

属性 | 介绍
---|---
`id` | 唯一的订单 ID。
`created` | 订单创建时的游戏 tick。inter-shard 市场中的订单不存在该属性。
`createdTimestamp` | 订单创建时的 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime#Syntax">UNIX 毫秒时间戳</a>。老版本的订单不存在该属性。
`type` | <code>ORDER_SELL</code> 或 <code>ORDER_BUY</code>。
`resourceType` | <code>RESOURCE_*</code> 常量之一或者 <code>SUBSCRIPTION_TOKEN</code>。
`roomName` | 下订单的房间。
`amount` | 当前可用的交易量。
`remainingAmount` | 该订单还可以交易多少资源。(How many resources are left to trade via this order.)
`price` | 当前的交易单价。


{% api_method Game.market.getHistory '[resourceType]' 1 %}

获取最近 14 天以来市场中指定资源的每日价格记录。

{% api_method_params %}
resourceType (optional) : string
`RESOURCE_*` 常量之一。如果为 undefined，则返回所有资源的历史数据。
{% endapi_method_params %}


### Return value

返回具有以下格式的对象数组：
```json-content
[{
    "resourceType": "L",
    "date": "2019-06-24",
    "transactions": 4,
    "volume": 400,
    "avgPrice": 3.63,
    "stddevPrice": 0.27
}]    
``` 


{% api_method Game.market.getOrderById 'id' 1 %}

```javascript
const order = Game.market.getOrderById('55c34a6b5be41a0a6e80c123');
```

检索指定的市场订单。

{% api_method_params %}
id : string
订单 ID。
{% endapi_method_params %}


### 返回值

订单信息对象。查看
<a href="#Game.market.getAllOrders"><code>getAllOrders</code></a>
来了解其属性说明。
