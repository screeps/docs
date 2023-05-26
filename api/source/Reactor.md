# Reactor

An object that process Thorium into season score.

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td><strong>Capacity</strong></td>
        <td>1,000 Thorium</td>
    </tr>
    <tr>
        <td><strong>Score generation</strong></td>
        <td>`1 + Math.floor(Math.log10([continuousWork]))`</td>
    </tr>
    </tbody>
</table>

{% api_property continuousWork 'number' %}

Ticks of continuous work of this reactor.

{% api_property store '<a href="#Store">Store</a>' %}

```javascript
if(reactor.store.getFreeCapacity(RESOURCE_THORIUM) > 0) {
    creep.transfer(reactor, RESOURCE_THORIUM);
}
```


A [`Store`](#Store) object that contains cargo of this structure.

{% api_property my 'boolean' %}

Whether you control this reactor.

{% api_property owner 'object' %}

An object with the reactor’s owner info containing the following properties:

{% api_method_params %}
username : string
The name of the owner user.
{% endapi_method_params %}

