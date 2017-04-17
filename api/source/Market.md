# Game.market

A global object representing the in-game market. You can use this object to track resource transactions to/from your terminals, and your buy/sell orders. The object is accessible via the singleton [`Game.market`](#Game.market) property.

Learn more about the market system from [this article](/hc/en-us/articles/207783649-Market-system).

{% api_property Game.market.credits 'number' %}



Your current credits balance.



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
	order: {		// optional
		id : "55c34a6b5be41a0a6e80c68b",
		type : "sell",
		price : 2.95
	}
}]
```

An array of the last 100 incoming transactions to your terminals with the following format:



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
	order: {		// optional
		id : "55c34a6b5be41a0a6e80c68b",
		type : "sell",
		price : 2.95
	}
}]
```

An array of the last 100 outgoing transactions from your terminals with the following format:



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

An object with your active and inactive buy/sell orders on the market.



{% api_method Game.market.calcTransactionCost 'amount, roomName1, roomName2' 0 %}

```javascript
const cost = Game.market.calcTransactionCost(1000, 'W0N0', 'W10N5');
// -> 742 energy units
```

Estimate the energy transaction cost of <a href="#StructureTerminal.send"><code>StructureTerminal.send</code></a> and <a href="#deal"><code>Market.deal</code></a> methods. 
The formula:

```javascript-content
Math.ceil( 
    amount * ( 0.1 + 
        Math.log(0.1*linearDistanceBetweenRooms + 0.9) ) )
```

{% api_method_params %}
amount : number
Amount of resources to be sent.
===
roomName1 : string
The name of the first room.
===
roomName2 : string
The name of the second room.
{% endapi_method_params %}


### Return value

The amount of energy required to perform the transaction.

{% api_method Game.market.cancelOrder 'orderId' A %}

```javascript
for(const id in Game.market.orders) {
    Game.market.cancelOrder(id);
}
```

Cancel a previously created order. The 5% fee is not returned.

{% api_method_params %}
orderId : string
The order ID as provided in <code>Game.market.orders</code>.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_INVALID_ARGS | The order ID is not valid.
{% endapi_return_codes %}



{% api_method Game.market.changeOrderPrice 'orderId, newPrice' A %}

```javascript
Game.market.changeOrderPrice('57bec1bf77f4d17c4c011960', 9.95);
```

Change the price of an existing order. If <code>newPrice</code> is greater than old price, you will be charged <code>(newPrice-oldPrice)*remainingAmount*0.05</code> credits.

{% api_method_params %}
orderId : string
The order ID as provided in <code>Game.market.orders</code>.
===
newPrice : number
The new order price.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of the room's terminal or there is no terminal.
ERR_NOT_ENOUGH_RESOURCES | You don't have enough credits to pay a fee.
ERR_INVALID_ARGS | The arguments provided are invalid.
{% endapi_return_codes %}



{% api_method Game.market.createOrder 'type, resourceType, price, totalAmount, [roomName]' A %}

```javascript
Game.market.createOrder(ORDER_SELL, RESOURCE_GHODIUM, 9.95, 10000, "W1N1");
```

Create a market order in your terminal. You will be charged <code>price*amount*0.05</code> credits when the order is placed. The maximum orders count is 50 per player. You can create an order at any time with any amount, it will be automatically activated and deactivated depending on the resource/credits availability.

{% api_method_params %}
type : string
The order type, either <code>ORDER_SELL</code> or <code>ORDER_BUY</code>.
===
resourceType : string
Either one of the <code>RESOURCE_*</code> constants or <code>SUBSCRIPTION_TOKEN</code>. If your Terminal doesn't have the specified resource, the order will be temporary inactive.
===
price : number
The price for one resource unit in credits. Can be a decimal number.
===
totalAmount : number
The amount of resources to be traded in total.
===
roomName (optional) : string
The room where your order will be created. You must have your own Terminal structure in this room, otherwise the created order will be temporary inactive. This argument is not used when <code>resourceType</code> equals to <code>SUBSCRIPTION_TOKEN</code>.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of the room's terminal or there is no terminal.
ERR_NOT_ENOUGH_RESOURCES | You don't have enough credits to pay a fee.
ERR_FULL | You cannot create more than 50 orders.
ERR_INVALID_ARGS | The arguments provided are invalid.
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

Execute a trade deal from your Terminal in <code>yourRoomName</code> to another player's Terminal using the specified buy/sell order. Your Terminal will be charged energy units of transfer cost regardless of the order resource type. You can use <a href="#calcTransactionCost"><code>Game.market.calcTransactionCost</code></a> method to estimate it. When multiple players try to execute the same deal, the one with the shortest distance takes precedence. You cannot execute more than 10 deals during one tick.

{% api_method_params %}
orderId : string
The order ID as provided in <code>Game.market.getAllOrders</code>.
===
amount : number
The amount of resources to transfer.
===
yourRoomName (optional) : string
The name of your room which has to contain an active Terminal with enough amount of energy. This argument is not used when the order resource type equals to <code>SUBSCRIPTION_TOKEN</code>.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You don't have a terminal in the target room.
ERR_NOT_ENOUGH_RESOURCES | You don't have enough credits or resource units.
ERR_FULL | You cannot execute more than 10 deals during one tick.
ERR_INVALID_ARGS | The arguments provided are invalid.
{% endapi_return_codes %}



{% api_method Game.market.extendOrder 'orderId, addAmount' A %}

```javascript
Game.market.extendOrder('57bec1bf77f4d17c4c011960', 10000);
```

Add more capacity to an existing order. It will affect <code>remainingAmount</code> and <code>totalAmount</code> properties. You will be charged <code>price*addAmount*0.05</code> credits.

{% api_method_params %}
orderId : string
The order ID as provided in <code>Game.market.orders</code>.
===
addAmount : number
How much capacity to add. Cannot be a negative value.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_ENOUGH_RESOURCES | You don't have enough credits to pay a fee.
ERR_INVALID_ARGS | The arguments provided are invalid.
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
// Output:

[{
	id : "55c34a6b5be41a0a6e80c68b",
	created : 13131117,
	type : "sell"
	resourceType : "OH",
	roomName : "W1N1",
	amount : 15821,
	remainingAmount : 30000,
	price : 2.95
}, {
	id : "55c34a6b52411a0a6e80693a",
	created : 13134122,
	type : "buy"
	resourceType : "energy",
	roomName : "W1N1",
	amount : 94000,
	remainingAmount : 94000,
	price : 0.45
}, {
	id : "55c34a6b5be41a0a6e80c123",
	created : 13105123,
	type : "sell"
	resourceType : "token",
	amount : 3,
	remainingAmount : 10,
	price : 50000
}]
```

Get other players' orders currently active on the market.

{% api_method_params %}
filter (optional) : object, function
An object or function that will filter the resulting list using the <a href="https://lodash.com/docs#filter"><code>lodash.filter</code></a> method.
{% endapi_method_params %}


### Return value

An orders array in the following form:

property | description
---|---
`id` | The unique order ID.
`created` | The order creation time in game ticks.
`type` | Either <code>ORDER_SELL</code> or <code>ORDER_BUY</code>.
`resourceType` | Either one of the <code>RESOURCE_*</code> constants or <code>SUBSCRIPTION_TOKEN</code>.
`roomName` | The room where this order is placed.
`amount` | Currently available amount to trade.
`remainingAmount` | How many resources are left to trade via this order. 



{% api_method Game.market.getOrderById 'id' 1 %}

```javascript
const order = Game.market.getOrderById('55c34a6b5be41a0a6e80c123');
```

Retrieve info for specific market order.

{% api_method_params %}
id : string
The order ID.
{% endapi_method_params %}


### Return value

An object with the order info. See
<a href="#getAllOrders"><code>getAllOrders</code></a>
for properties explanation.
