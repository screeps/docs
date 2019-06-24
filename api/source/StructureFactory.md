# StructureFactory

<img src="img/factory.png" alt="" align="right" />

Produces trade commodities from base minerals and other commodities. Learn more about commodities from [this article](/commodities.html). 

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td colspan="2"><strong>Controller level</strong></td>
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
        <td><strong>Cost</strong></td>
        <td>100,000</td>
    </tr>
    <tr>
        <td><strong>Hits</strong></td>
        <td>1000</td>
    </tr>
    <tr>
        <td><strong>Capacity</strong></td>
        <td>50,000</td>
    </tr>
    <tr>
        <td><strong>Production cooldown</strong></td>
        <td>Depends on the resource</td>
    </tr>
    </tbody>
</table>

{% page inherited/OwnedStructure.md %} 

{% api_property cooldown 'number' %}



The amount of game ticks the factory has to wait until the next production is possible.

{% api_property level number %}

```javascript
if(!factory.level) {
    Game.powerCreeps['MyOperator1'].usePower(PWR_OPERATE_FACTORY, factory);
}
```

The factory's level. Can be set by applying the `PWR_OPERATE_FACTORY` power to a newly built factory. 
Once set, the level cannot be changed. 

{% api_property store 'object' %}

A [`Store`](#Store) object that contains cargo of this structure.



{% api_property storeCapacity 'number' '{"deprecated": true}' %}
                                                                                                               
An alias for [`.store.getCapacity()`](#Store.getCapacity).

{% api_method produce 'resourceType' A %}

```javascript
factory.produce(RESOURCE_UTRIUM_BAR);
```

Produces the specified commodity.

{% api_method_params %}
resourceType : string
One of the <code>RESOURCE_*</code> constants.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this structure.
ERR_RCL_NOT_ENOUGH | Your Room Controller level is insufficient to use the factory.
ERR_NOT_ENOUGH_RESOURCES | The structure does not have the required amount of resources.
ERR_INVALID_ARGS | The arguments provided are incorrect.
ERR_INVALID_TARGET | The factory cannot produce the commodity of this level.
ERR_TIRED | The factory is still cooling down. 
ERR_BUSY | The factory is not operated by the `PWR_OPERATE_FACTORY` power. 
ERR_FULL | The factory cannot contain the produce.
{% endapi_return_codes %}
