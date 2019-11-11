# StructureFactory

<img src="img/factory.png" alt="" align="right" />

使用基础矿物和其他商品(commodities)来生产贸易商品。点击 [本文](/resources.html#Commodities) 来了解有关商品的更多信息。

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td colspan="2"><strong>控制器等级</strong></td>
    </tr>
    <tr>
        <td>1-6</td>
        <td>—</td>
    </tr>
    <tr>
        <td>7-8</td>
        <td>1 factory</td>
    </tr>
    <tr>
        <td><strong>生产花费</strong></td>
        <td>100,000</td>
    </tr>
    <tr>
        <td><strong>生命值</strong></td>
        <td>1000</td>
    </tr>
    <tr>
        <td><strong>容量</strong></td>
        <td>50,000</td>
    </tr>
    <tr>
        <td><strong>生产冷却</strong></td>
        <td>取决于生产的资源</td>
    </tr>
    </tbody>
</table>

{% page inherited/OwnedStructure.md %} 

{% api_property cooldown 'number' %}



还有多少 tick 才能进行下一次生产。

{% api_property level number %}

```javascript
if(!factory.level) {
    Game.powerCreeps['MyOperator1'].usePower(PWR_OPERATE_FACTORY, factory);
}
```

工厂的等级，可以通过 `PWR_OPERATE_FACTORY` 超能来给一个新建的工厂设置等级。
一旦被设置，等级将无法再次更改。

{% api_property store '<a href="#Store">Store</a>' %}

一个包含了该建筑中所存储的货物的 [`Store`](#Store) 对象。



{% api_property storeCapacity 'number' '{"deprecated": true}' %}
                                                                                                               
[`.store.getCapacity()`](#Store.getCapacity) 的别名。

{% api_method produce 'resourceType' A %}

```javascript
factory.produce(RESOURCE_UTRIUM_BAR);
```

生产指定商品。工厂存储中应该包含所有的生产用料。

{% api_method_params %}
resourceType : string
<code>RESOURCE_*</code> 常量之一。
{% endapi_method_params %}


### 返回值

下列返回码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是该控制器的所有者。
ERR_RCL_NOT_ENOUGH | 房间控制器等级不足以使用该建筑。
ERR_NOT_ENOUGH_RESOURCES | 生产所需的资源数量不足。
ERR_INVALID_ARGS | 提供的参数不正确。
ERR_INVALID_TARGET | 此工厂无法生产该等级的商品。
ERR_TIRED | 工厂仍在冷却。
ERR_BUSY | 无法通过 `PWR_OPERATE_FACTORY` 超能来操作此工厂。
ERR_FULL | 此工厂的存储已无法容纳要生产的商品。
{% endapi_return_codes %}
