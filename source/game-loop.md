title: Understanding game loop, time and ticks
---

Screeps is a real-time game. The game time is essentially a number of game "ticks" (or turns, cycles) that have passed since the start of the game servers. The number of the current tick is stored in the `Game.time` property. It is a global counter that increases during the entire game lifespan.

Generally, ticks run in an infinite loop of your `main` module. It is important to understand that this loop is turn- and multiplayer-based: the next tick (next `Game.time` value) begins only after the full execution of all `main` modules of all players.

We will now analyze the tick execution mechanism with conditional dividing it into beginning, middle, and end stages.

![](img/game-loop.png)

In the **beginning of the tick, **there is a certain game situation: different game objects with some property values. Take note that any changes in these properties, appearing of new objects, and dismantling of old ones will happen only at the start of the next tick.

In the **middle part of the tick,** the `main` module is executed (along with the modules required from it). The `main` operates the unchangeable game condition in the beginning of the tick. For example, by executing `creep.move()` and then (in the same tick) `creep.attack()` the attack still runs from the old coordinates, since properties `creep.pos.x` / `creep.pos.y` will change only in the next tick.

In the **end of the tick, **the commands specified in the `main` accumulate in order to change the game situation by the beginning of the next tick instantaneously and independently from each other. If any conflicts arise – for example, multiple creeps want to move to the same coordinates, or you have scheduled contradictory orders – these conflicts are solved according to [predefined priorities](/simultaneous-actions.html). Another example: a mutual attack does not result in a conflict, and creeps can die at the same time.

## Additional information

*   Physically, resource intensity of the `main` execution is limited by the available CPU (see [`Game.cpuLimit`](/api/#Game.cpuLimit)) .
*   The amount of CPU actually used in the current tick is shown by [`Game.getUsedCpu`](/api/#Game.getUsedCpu).
*   The correlation between the game tick counter ([`Game.time`](/api/#Game.time)) and real time depends on overall capacity of servers affected.
*   All runtime global scope with all the variables between ticks is erased. See more in [this article](/global-objects.md).
*   A console command is governed by the same rules: execution is made within one tick as though it is added to the end of `main`.


## See also

*   [How does CPU limit work](/cpu-limit.html)
*   [Server-side architecture overview](/architecture.html)