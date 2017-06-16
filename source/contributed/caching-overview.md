---
title: Caching Overview
contributed:
    name: tedivm
    link: https://github.com/tedivm
    date: 2017-06-14
---

Screeps is a performance centric game- the better your performance the more you can accomplish in each tick. Caching is an extremely important element in performance optimization, and Screeps provides it's own unique opportunities and challenges when it comes to cache.

Caching is, at it's core, a simple concept- by saving the results of expensive code future calls are less expensive. Caching also has a secondary benefit that can be exploited, in that it allows functions to returns results even if they shouldn't be able to. As an example caching the results of a pathfinding operation will let creeps reuse that optimal path even if visibility is lost to room along that path, which in turn provides both improved performance and resiliency.

## Datastores

### Memory

The most common place to store cached data is in [Memory](/global-objects.html#Memory-object). This is the only option for true persistance- anything stored in [Memory](/global-objects.html#Memory-object) is going to stay there until removed, so if a value is extremely expensive or must be saved this is the place to put it.

There are two major drawbacks with [Memory](/global-objects.html#Memory-object)-

*   Space in [Memory](/global-objects.html#Memory-object) is limited to 2048kb of space.
*   JSON.parse is run on the [Memory](/global-objects.html#Memory-object) string each tick it is accessed, which is more expensive the more data that is stored.

For these reasons it makes sense to limit what is placed in [Memory](/global-objects.html#Memory-object).


### Global

The [game loop]('http://support.screeps.com/hc/en-us/articles/204825672-New-main-loop-architecture') architecture allows you to define a "loop" function which gets run each tick. Additionally it allows you to define expensive one-time-run code in the outer scope. This is most commonly used to `require` modules-

    // executed on new global
    var mod = require('mod');

    module.exports.loop = function() {
        // executed every tick
        mod.foo();
    }

Another example shows how this can be utilized for storing the results of an expensive function. After the first time the function is called the variable will be populated for future calls:

    let runExpensiveCodeResults = false
    function runExpensiveCode() {
        if(!runExpensiveCodeResults) {
            runExpensiveCodeResults = someExpensiveCode();
        }
        return runExpensiveCodeResults;
    }

These two examples have a drawback in that they are only run or defined when the code is loaded with "require" for the first time. You can have slightly cleaner code by accessing the [`global`](https://nodejs.org/api/globals.html#globals_global) object, which is a special object in Node that is accessible everywhere.

    function runExpensiveCode() {
        if(!global.runExpensiveCodeResults) {
            global.runExpensiveCodeResults = someExpensiveCode();
        }
        return global.runExpensiveCodeResults;
    }


There are some severe limits to this.

*   Each worker has it's own `global` state, and code will bounce between at least four nodes at a time. This means data placed in global one tick will only have a 25% chance of appear next (although it can be added again until it's on all four nodes, bringing the change up to 100%) and that deleted data could easily show up again in the next tick.
*   The `global` object gets reset fairly regular, meaning all of the data will regularly disappear. The `global` object can not be considered persistent storage.
*   Although the `global` object is reset often it is only reset on a consistent schedule. Data placed in it may last longer than expected.

These limitions make the `global` object ideal for certain types of caching, such as when the result of a function is always going to be the same or if it doesn't matter when "stale" data is used. For cases where results may change and data gets invalidated meta data- such as a TTL or version identifier- will have to be stored alongside the results to facilitate that.


## Require Cache

Every time `require` is called the results are cached. This reduces the load on the server and your script as it prevents the various javascript modules from having to be compiled every tick. The require cache itself is tied to the `global` cache and gets cleared at the same time, although there are some circumstances where the `require` cache will get cleared (fully or partially) while the `global` cache does not.

From a performance standpoint the fact that the `require` and `global` caches clear at once means that `global resets` are particularly expensive events.


## Tips

*   Be extremely careful what you cache in Memory, as the Memory parse time can be expensive.
*   Objects are more expensive to parse than strings. Converting items like [RoomPositions](/api/#RoomPosition) to a flat string before caching and then converting back as needed can have a surprisingly large impact.
*   For extremely large objects with repetitive data- such as [CostMatrixes](api/#PathFinder-CostMatrix)- compression can save a lot of space. Players going this route should look into [lzstring](http://pieroxy.net/blog/pages/lz-string/index.html), and should also make sure they utilize the `global` cache to minimize the amount of times the same costmatrix has to be decompressed.
*   Traditionally speaking most caching systems put the ttl in the `set` function, but for Screeps it may make more sense to put it in the `get` function. This way the TTL can be adjusted based on need- for example a TTL on a cached costmatrix can be set to Infinity for rooms without visibility and then shortened again when it is so that the data is always available, even if it is a bit stale.
*    Do not forget to add something to clear stale cache entries out or you may find your Memory slowly expanding over time.
