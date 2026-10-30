# Game.cpu

A global object containing information about your CPU usage.


{% api_property Game.cpu.limit 'number' %}



Your assigned CPU limit for the current shard.



{% api_property Game.cpu.tickLimit 'number' %}



An amount of available CPU time at the current game tick. Usually it is higher than <code>Game.cpu.limit</code>. <a href="/cpu-limit.html">Learn more</a>



{% api_property Game.cpu.bucket 'number' %}



An amount of unused CPU accumulated in your <a href="/cpu-limit.html#Bucket">bucket</a>.



{% api_property 'Game.cpu.shardLimits' 'object&lt;string,number&gt;' %}



An object with limits for each shard with shard names as keys. You can use [`setShardLimits`](#Game.cpu.setShardLimits) method to re-assign them.



{% api_property Game.cpu.unlocked 'boolean' %}



Whether full CPU is currently unlocked for your account.



{% api_property Game.cpu.unlockedTime 'number' %}



The time <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime#Syntax">in milliseconds since UNIX epoch time</a> until full CPU is unlocked for your account. This property is not defined when full CPU is not unlocked for your account or it's unlocked with a subscription.



{% api_method Game.cpu.getHeapStatistics '' 1 %}

```javascript
let heap = Game.cpu.getHeapStatistics();
console.log(`Used ${heap.total_heap_size} / ${heap.heap_size_limit}`);
```

Use this method to get heap statistics for your virtual machine. The return value is almost identical to the Node.js function [`v8.getHeapStatistics()`](https://nodejs.org/dist/latest-v8.x/docs/api/v8.html#v8_v8_getheapstatistics). This function returns one additional property: `externally_allocated_size` which is the total amount of currently allocated memory which is not included in the v8 heap but counts against this isolate's memory limit. `ArrayBuffer` instances over a certain size are externally allocated and will be counted here.



### Return value

Returns an objects with heap statistics in the following format:

```javascript-content
{
  "total_heap_size": 29085696,
  "total_heap_size_executable": 3670016,
  "total_physical_size": 26447928,
  "total_available_size": 319649520,
  "used_heap_size": 17493824,
  "heap_size_limit": 343932928,
  "malloced_memory": 8192,
  "peak_malloced_memory": 1060096,
  "does_zap_garbage": 0,
  "externally_allocated_size": 38430000
}
```


{% api_method Game.cpu.getUsed '' 1 %}

```javascript
if(Game.cpu.getUsed() > Game.cpu.tickLimit / 2) {
    console.log("Used half of CPU already!");
}
```

```javascript
for(const name in Game.creeps) {
    const startCpu = Game.cpu.getUsed();

    // creep logic goes here

    const elapsed = Game.cpu.getUsed() - startCpu;
    console.log('Creep '+name+' has used '+elapsed+' CPU time');
}

```

Get amount of CPU time used from the beginning of the current game tick. Always returns 0 in the Simulation mode.



### Return value

Returns currently used CPU time as a float number.


{% api_method Game.cpu.halt '' 1 %}

```javascript
Game.cpu.halt();
```

Reset your runtime environment and wipe all data in heap memory.

{% api_method Game.cpu.setShardLimits 'limits' 1 %}

```javascript
Game.cpu.setShardLimits({shard0: 20, shard1: 10});
```

Allocate CPU limits to different shards. Total amount of CPU should remain equal to 
 [`Game.cpu.shardLimits`](#Game.cpu.shardLimits). This method can be used only once per 12 hours.

{% api_method_params %}
limits : object&lt;string, number&gt;
An object with CPU values for each shard in the same format as `Game.cpu.shardLimits`.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_BUSY | 12-hours cooldown period is not over yet.
ERR_INVALID_ARGS | The argument is not a valid shard limits object.
{% endapi_return_codes %}


{% api_method Game.cpu.unlock '' 1 %}

```javascript
if(Game.cpu.unlockedTime && ((Game.cpu.unlockedTime - Date.now()) < 1000*60*60*24)) {
    Game.cpu.unlock();
}
```

Unlock full CPU for your account for additional 24 hours. This method will consume 1 CPU unlock bound to your account (See [`Game.resources`](#Game.resources)).
If full CPU is not currently unlocked for your account, it may take some time (up to 5 minutes) before unlock is applied to your account.

### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_FULL | Your CPU is unlocked with a subscription.
ERR_NOT_ENOUGH_RESOURCES | Your account does not have enough `cpuUnlock` resource.
{% endapi_return_codes %}

{% api_method Game.cpu.generatePixel '' 3 %}

```javascript
if(Game.cpu.bucket == 10000) {
    Game.cpu.generatePixel();
}
```

Generate 1 pixel resource unit for 10000 CPU from your bucket. The cost is reduced to 9000 CPU if your account has Pixelization Deluxe Upgrade.

### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_ENOUGH_RESOURCES | Your bucket does not have enough CPU.
{% endapi_return_codes %}
