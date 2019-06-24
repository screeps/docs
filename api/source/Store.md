# Store

An object that can contain resources in its cargo.

There are two types of stores in the game: general purpose stores and limited stores.

* General purpose stores can contain any resource within its capacity (e.g. creeps, containers, storages, terminals).

* Limited stores can contain only a few types of resources needed for that particular object (e.g. spawns, extensions, labs, nukers).

The `Store` prototype is the same for both types of stores, but they have different behavior depending on the `resource` argument in its methods.

You can get specific resources from the store by addressing them as object properties:

```javascript-content
console.log(creep.store[RESOURCE_ENERGY]);
```   



{% api_method getCapacity '[resource]' %}

```javascript
if(creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()) {
    goHarvest(creep);
}
```

Returns capacity of this store for the specified resource, or total capacity if `resource` is undefined. 

{% api_method_params %}
resource (optional) : string
The type of the resource.
{% endapi_method_params %}


### Return value

Returns capacity number, or `null` in case of a not valid `resource` for this store type.

{% api_method getFreeCapacity '[resource]' %}

```javascript
if(structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
    creep.transfer(structure, RESOURCE_ENERGY);
}
```
A shorthand for `getCapacity(resource) - getUsedCapacity(resource)`.

{% api_method getUsedCapacity '[resource]' %}

```javascript
if(Game.rooms['W1N1'].terminal.store.getUsedCapacity() == 0) {
    // terminal is empty
}
```

Returns the capacity used by the specified resource, or total used capacity for general purpose stores if `resource` is undefined. 

{% api_method_params %}
resource (optional) : string
The type of the resource.
{% endapi_method_params %}


### Return value

Returns used capacity number, or `null` in case of a not valid `resource` for this store type.
