# InterShardMemory

`InterShardMemory` object provides an interface for communicating between shards. Your script is executed separatedly 
on each shard, and their [`Memory`](#Memory) objects are isolated from each other. In order to pass messages and 
data between shards, you need to use `InterShardMemory` instead.

Every shard can have its own data string that can be accessed by all other shards. A shard can write only to its own data,
other shards' data is read-only.

This data has nothing to do with `Memory` contents, it's a separate data container.      

{% api_method InterShardMemory.getLocal '' 0 %}

Returns the string contents of the current shard's data. 

{% api_method InterShardMemory.setLocal 'value' 0 %}

```javascript
var data = JSON.parse(InterShardMemory.getLocal() || "{}");
data.message = "hello from another shard!";
InterShardMemory.setLocal(JSON.stringify(data));
```

Replace the current shard's data with the new value.

{% api_method_params %}
value : string
New data value in string format.
{% endapi_method_params %}


{% api_method InterShardMemory.getRemote 'shard' 0 %}

```javascript
var data = JSON.parse(InterShardMemory.getRemote('shard0') || "{}");
console.log(data.message);
```

Returns the string contents of another shard's data.

{% api_method_params %}
shard : string
Shard name.
{% endapi_method_params %}
