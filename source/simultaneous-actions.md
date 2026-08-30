title: Simultaneous execution of creep actions
---

The exact methods available to a creep are determined by its parts. You may opt to create an all-in-one creep out of all existing parts, but you won't be able to execute all methods simultaneously. Here are the dependencies:

![](img/action-priorities.png)

If you try to execute all the dependent methods within one tick, **only the most right one will be executed**. Each attempt means a correct execution returning the `OK` result. For example:

        // tick 1
        creep.build(constructionSite); // ERR_NOT_ENOUGH_ENERGY
        creep.harvest(source); // OK – executed, creep gained energy
        // tick 2
        creep.build(constructionSite); // OK – executed
        creep.harvest(source); // OK, but execution failed since it was blocked by build

However, you may execute multiple methods by combining methods from different pipelines (including those which are not involved in any dependency above). For example:

        creep.moveTo(target);
        creep.rangedMassAttack();
        creep.heal(target);
        creep.transfer(target, RESOURCE_ENERGY, amountTransfer);
        creep.drop(amountDrop, RESOURCE_ENERGY);
        creep.pickup(energy);
        creep.claimController(controller);

All these methods may be successfully executed within one tick.

Combining methods with energy usage may have two possible results:

*   with enough energy for executing all scheduled operations, all of them will be executed, 
*   othwerwise, the conflict will arise and only the most right one will be executed.

## Methods call priority

The sequence of calling commands for different methods in the code is irrelevant, only the aforementioned priorities matter. But if the same method is specified, the last call has the priority. For example:

        creep.moveTo(target); // will be ignored
        creep.move(RIGHT); // will be ignored
        creep.move(LEFT); // will be executed

The creep will move to the left in this tick.

## Additionally

1.  Though healing healthy creeps and repairing undamaged building may be senseless, it returns `OK` and blocks more left methods in its pipeline.
2.  While `transfer` may work along with `drop`, you cannot execute `transfer` more than once per tick (to transfer energy to multiple objects). The same is true for all similar methods.
3.  Simultaneously executed methods using `CARRY` body part don't affect each other. Each of them has the amount of energy available in the beginning of the tick. See more about this in [Understanding game loop, time and ticks](/game-loop.html).
