title: Market System
---

The market in Screeps allows to trade various resources between players by means of special structures called [Terminals](/api/#StructureTerminal). They are able to instantly transfer resources to other rooms at any distance.

Trading on this market requires the in-game currency called **Credits**. Your credits are tied to your account and serve to execute your market orders.

{% note info %}
In order to get your first credits, deal with someone who already has a market buy order.
{% endnote %}

## Market orders

The market system is based on **sell and buy orders** tied to your terminals. By creating an order, you designate the terminal, type, and amount of the resource to sell or buy, as well as its price for one unit in credits. Each placed order is visible to all the players in all the game world at the [Market](https://screeps.com/a/#!/market) page or via API method [`Game.market.getAllOrders`](/api/#Game.market.getAllOrders). Creating any order is subject to a 5% fee in credits.

To execute a trade, the second party also has to have a terminal to receive the resource (when buying from a sell order) or to send out (when selling to a buy order). You complete a trade by using the market interface or the method [`Game.market.deal`](/api/#Game.market.deal) and designating the other player's order, your terminal, and the amount of resources wanted. Then the two terminals automatically carry out the transaction, the buyer's account is charged with the corresponding amount of credits, and this amount is passed to the seller.

{% note info %}
The energy expenses to transfer resources from one terminal to another are always on the party who executes the deal rather than the order's owner, even in the case of buying a resource upon a sell order. The same is true for terminal cooldown.
{% endnote %}

An order cannot be executed until the selling terminal has enough resource to sell, or the user has enough credits to buy. Until that happens, the order remains inactive.

## Examples

Here are a few examples to understand the underlying mechanics.

*   Assume that the player Alice creates a buy order for 1000 units of utrium acid at the price 10 Cr a unit. To create this order, Alice designates her terminal in the room W1N1 and instantly pays a 500 Cr fee.
*   Player Bob discovers Alice's order and decides to sell 200 units of utrium acid from his reserves. Bob's terminal is in the room W4N2, i.e. 3 rooms away. Therefore, his expenses on sending 200 units of the resource will be 60 of energy. Bob executes the trade on the given order, and 200 of ultrium acid are automatically transported from W4N2 to W1N1, Bob gets 2,000 Cr, and Bob's terminal in W4N2 loses 60 energy units.
*   Now Bob wants to spend these credits and buy some energy from the player Charlie who offers it through his sell order in the room W1N5 at the price of 0.5 Cr per unit. The 2,000 Cr that Bob earned get him 4,000 energy units. However, the 4-room distance requires covering energy costs of 1,600 energy units. This amount should have been in the Bob's terminal prior to the trade deal execution. Charlie gets 2,000 Cr and doesn't spend any energy on the transfer.

This story results in the following balance shift between the players involved:

*   Alice (created a buy order, 1000 utrium acid): +200 utrium acid, -500-2000 credits.
*   Charlie (sell order, energy): -4000 energy, +2000 credits.
*   Bob (dealer): -200 utrium acid, +4000-60-1600 energy, +2000-2000 credits.

## NPC Terminals

All the “highway crossroads” between sectors (i.e. in the rooms W0N0, W10N0, W10N10, etc.) contain neutral NPC Terminals. You can trade with these terminals the same way as with real players using the market interface or the object [`Game.market`](/api/#Game.market). The orders in NPC terminals have limited resources amounts and get replenished according to a set of rules. Although they don’t boast the most competitive prices, they allow you to convert your resource surplus into credits, and vice versa.

## Subscription Tokens

There are important objects to trade in Screeps: **Subscription Tokens**. Upon its activation, such a token allows its user to get 60 CPU subscription days in Screeps. A subscription token does not exist as an object in the game world, it belongs to an account and is subject to direct trade between players for credits through the same market orders system but without designating trading terminals.

You can buy a subscription token the same way as a regular CPU subscription. It is placed into your account, and you can sell it as a virtual item to another player.

Hence, those players who want to share their resources with others can play Screeps as a free-to-play game! Subscription tokens trading is also possible via the [Steam Community Market](http://steamcommunity.com/market/listings/464350/Subscription%20Token) allowing to trade purchased tokens for real currency using your Steam Wallet.
