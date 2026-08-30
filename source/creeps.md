title: Creeps
---

You build (spawn) units called **creeps** the same way as in other strategy games, but with one exception: you construct the "body" of a new creep out of 7 available **body part types**, the resulting body being a sequence up to 50 parts. It allows thousands of creep types and their roles: ordinary workers, huge construction machines able to build or repair a structure within a few cycles, weaselly couriers, heavy capacious trucks, fast and cheap scouts, well-equipped fighters with regeneration ability, etc. It may even be creeps resembling towers or fortresses for mining, defending, or seizing, with very little speed (couple of tiles per minute), but monstrous characteristics. Everything is up to you, your tactics and imagination.

![](img/bodyparts.png)

However, remember that any creep has a life cycle of 1500 game ticks (approx. 30-60 minutes depending on the tick duration). Then it "ages" and dies. So you not only need to control existing creeps but set up manufacturing and automatic control of superseding generations of your creeps as well.

A standard spawn (structure) can only spawn regular creeps with the total cost of up to **300 energy units**. Spawning more expensive creeps requires **spawn extensions** in the room. Each extension can contain up to **50 extra energy units** that may be spent on creation of a creep. The exact location of extensions within a room does not matter, but they should be in the same room with the spawn (one extension can be used by several spawns). All the necessary energy should be in the spawn and extensions in the beginning of the creep creation.

The amount of extensions available for construction depends on the Room Controller in the room. Read more in [Global control](/control.html).

## Creeps Skills

Possible part types of a creep body:

*   <code style="background: #333; color: #ffe56d;">WORK</code> – ability to harvest energy, construct and repair structures, upgrade controllers. [100 Energy]
*   <code style="background: #333; color: #a9b7c6;">MOVE</code> – ability to move. [50 Energy]
*   <code style="background: #333; color: #777;">CARRY</code> – ability to transfer energy. [50 Energy]
*   <code style="background: #333; color: #f93842;">ATTACK</code> – ability of short-range attack. [80 Energy]
*   <code style="background: #333; color: #5d80b2;">RANGED_ATTACK</code> – ability of ranged attack. [150 Energy]
*   <code style="background: #333; color: #65fd62;">HEAL</code> – ability to heal others. [250 Energy]
*   <code style="background: #333; color: #b99cfb;">CLAIM</code> - ability to claim territory control. [600 Energy]
*   <code style="background: #333; color: #fff;">TOUGH</code> – "empty" part with the sole purpose of defense. [10 Energy]

The effectiveness of an ability depends on the amount of parts of a corresponding type. For example, a worker creep with 3 parts of the `WORK` type will work 3 times as effectively as a creep with only 1 `WORK` part. The same applies to all the other types and actions.

The total amount of hits a creep has depends of the amount of its body parts – 100 hits per each part. The order in which the parts were specified during the spawning of a creep also has a bearing. Under attack, the first parts to take hits are those specified first. Full damage to a part leads to complete disabling of it – the creep can no longer perform this function.

## WORK

**Effects / `WORK` body part**
- Harvests 2 energy units from a source per tick.
- Harvests 1 resource unit from a mineral or a deposit per tick.
- Builds a structure for 5 energy units per tick.
- Repairs a structure for 100 hits per tick consuming 1 energy unit per tick.
- Dismantles a structure for 50 hits per tick returning 0.25 energy unit per tick.
- Upgrades a controller for 1 energy unit per tick.

**Usage**<br>
Creeps with the `WORK` body part are the powerhouse of the colony, being the ones who harvest resources, builds, repairs and dismantles structures.

<details>
  <summary><i>Functions requiring module</i></summary>
  <a href="https://docs.screeps.com/api/#Creep.build">creep.build()</a><br>
  <a href="https://docs.screeps.com/api/#Creep.dismantle">creep.dismantle()</a><br>
  <a href="https://docs.screeps.com/api/#Creep.harvest">creep.harvest()</a><br>
  <a href="https://docs.screeps.com/api/#Creep.repair">creep.repair()</a><br>
  <a href="https://docs.screeps.com/api/#Creep.upgradeController">creep.upgradeController()</a><br>
</details>


## MOVE

**Effects / `MOVE` body part**
- Moves one other body part / tick
- Decreases fatigue by 2 points per tick.

**Usage**<br>
Each body part has its own physical weight. The more parts a creep bears, the more difficult it is for it to move. Each body part (except `MOVE`) generates fatigue points when the creep moves: 1 point per body part on roads, 2 on plain land, 10 on swamp. Each `MOVE` body part decreases fatigue points by 2 per tick. The creep cannot move when its fatigue is greater than zero.


**NOTE**
To maintain the maximum movement speed of 1 square per tick, a creep needs to have as many `MOVE` parts as all the other parts of its body combined.


In other words, one `MOVE` part can move one other part one square per tick. If a creep has less `MOVE` parts, its movement will be proportionally slowed which is seen by the increasing fatigue.

It's worth noting that empty `CARRY` parts don't generate fatigue.

**Samples:**

*   Creep `[CARRY, WORK, MOVE]` will move 1 square per tick if it does not bear energy, and 1 square per 2 ticks if loaded.
*   Creep `[TOUGH, ATTACK, ATTACK, MOVE, MOVE, MOVE]` will move at maximum speed of 1 square per tick.
*   Creep `[TOUGH, ATTACK, ATTACK, MOVE, MOVE]` will move 1 square per 2 ticks because of rounding up.

<details>
  <summary><i>Functions requiring module</i></summary>
  <a href="https://docs.screeps.com/api/#Creep.move">creep.move()</a><br>
  <a href="https://docs.screeps.com/api/#Creep.moveByPath">creep.moveByPath()</a><br>
  <a href="https://docs.screeps.com/api/#Creep.moveTo">creep.moveTo()</a><br>
  <a href="https://docs.screeps.com/api/#Creep.pull">creep.pull()</a><br>
</details>

## CARRY

**Effects / `CARRY` body part**
- Can contain up to 50 resource units

**Usage**<br>
The `CARRY` body part allows creeps to store resources and move them between structures. A necessity for getting energy from the source to where it is needed.

<details>
  <summary><i>Functions requiring module</i></summary>
  <a href="https://docs.screeps.com/api/#Creep.build">creep.build()</a><br>
  <a href="https://docs.screeps.com/api/#Creep.pickup">creep.pickup()</a><br>
  <a href="https://docs.screeps.com/api/#Creep.repair">creep.repair()</a><br>
  <a href="https://docs.screeps.com/api/#Creep.upgradeController">creep.upgradeController()</a><br>
</details>

## ATTACK

**Effects / `ATTACK` body part**
-  Attacks another creep/structure with 30 hits per tick in a short-ranged attack.

**Usage**<br>
The `ATTACK` body part allows creeps to attack enemy creeps. Usefull during close range battles.

<details>
  <summary><i>Functions requiring module</i></summary>
  <a href="https://docs.screeps.com/api/#Creep.attack">creep.attack()</a><br>
</details>

## RANGED_ATTACK

**Effects / `RANGED_ATTACK` body part**
-  Attacks another single creep/structure with 10 hits per tick in a long-range attack up to 3 squares long.
-  Attacks all hostile creeps/structures within 3 squares range with 1-4-10 hits (depending on the range).

**Usage**<br>
The `RANGED_ATTACK` body part allows creeps to attack enemy creeps from a distance. Allowing the creeps to deal damage while keeping a safe distance to the enemy.

<details>
  <summary><i>Functions requiring module</i></summary>
  <a href="https://docs.screeps.com/api/#Creep.rangedAttack">creep.rangedAttack()</a><br>
  <a href="https://docs.screeps.com/api/#Creep.rangedMassAttack">creep.rangedMassAttack()</a><br>
</details>

## HEAL

**Effects / `HEAL` body part**
-  Heals self or another creep restoring 12 hits per tick in short range or 4 hits per tick at a distance.

**Usage**<br>
The `HEAL` body part allows a creep to heal either itself or another creep.

<details>
  <summary><i>Functions requiring module</i></summary>
  <a href="https://docs.screeps.com/api/#Creep.heal">creep.heal()</a><br>
  <a href="https://docs.screeps.com/api/#Creep.rangedHeal">creep.rangedHeal()</a><br>
</details>

## CLAIM

**Effects / `CLAIM` body part**
-  Claims a neutral room controller
-  Reserves a neutral room controller for 1 tick per body part.
-  Attacks a hostile room controller downgrading its timer by 300 ticks per body parts.
-  Attacks a neutral room controller reservation timer by 1 tick per body parts.
-  A creep with this body part will have a reduced life time of 600 ticks and cannot be renewed.

**Usage**<br>
The `CLAIM` body part is necessary when attacking another players room. Since the part allows creeps to remove the other players claim in the controller, and then claiming it once neutral.

<details>
  <summary><i>Functions requiring module</i></summary>
  <a href="https://docs.screeps.com/api/#Creep.attackController">creep.attackController()</a><br>
  <a href="https://docs.screeps.com/api/#Creep.claimController">creep.claimController()</a><br>
  <a href="https://docs.screeps.com/api/#Creep.reserveController">creep.reserveController()</a><br>
</details>

## TOUGH

**Effects / `TOUGH` body part**
-  No effect, just additional hit points to the creep's body. Can be boosted to resist damage.

**Usage**<br>
While the `TOUGH` body part does not have any functionality, it does allow the creation of creeps with a high amount of hits for a small price.

  <summary><i>No functions requiring module</i></summary>



