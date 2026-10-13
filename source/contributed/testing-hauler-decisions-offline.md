---
title: Testing a Screeps hauler decision outside the game with Node.js
contributed:
    name: kalidatuna
    link: https://github.com/kalidatuna
    date: 2026-10-13
---

A creep can appear to be stuck even when your movement code is correct. A hauling role might keep walking toward an empty container, call `transfer` on a full spawn, or move toward a target after an error unrelated to distance. All three problems are decisions you can check **without running a persistent game server**.

This guide builds a small, repeatable test for one decision: should a hauler withdraw energy from a container or transfer it to a spawn? It uses Node.js's built-in test runner to verify the decisions and the requests sent to Screeps APIs. It **does not** simulate the Screeps engine, pathfinding, tick resolution, or actual resource movement. That distinction is important whenever a local test passes but the creep still misbehaves in-game.

## Decide what to test

Assume one owned spawn, one accessible container with energy, and a creep with `CARRY` and `MOVE` body parts. The hauler carries **only energy**, and an outside process keeps the container supplied. At each game tick:

1. When the creep has no energy, it should withdraw from the container.
2. When it carries energy, it should transfer to the spawn.
3. If the chosen action reports `ERR_NOT_IN_RANGE`, it should request movement toward that same target.
4. An empty container, full spawn, or missing target should cause no action. Other errors should not trigger movement automatically.

The Screeps API defines [`Creep.withdraw`](/api/#Creep.withdraw), [`Creep.transfer`](/api/#Creep.transfer), [`Creep.moveTo`](/api/#Creep.moveTo), and [`Store.getUsedCapacity`](/api/#Store.getUsedCapacity). Both resource actions return a status code. In particular, `OK` means the action **was scheduled**; it does not prove that the transfer happened in a game tick.

Separate this decision from the outer game loop. Save the following as the Screeps module `role.hauler.js`:

```javascript
function run(creep, container, spawn) {
  const carryingEnergy = creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
  const target = carryingEnergy ? spawn : container;
  if (!target) return ERR_INVALID_TARGET;

  if (carryingEnergy && target.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
    return ERR_FULL;
  }
  if (!carryingEnergy && target.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
    return ERR_NOT_ENOUGH_RESOURCES;
  }

  const result = carryingEnergy
    ? creep.transfer(target, RESOURCE_ENERGY)
    : creep.withdraw(target, RESOURCE_ENERGY);
  if (result === ERR_NOT_IN_RANGE) creep.moveTo(target, { reusePath: 5 });
  return result;
}

module.exports = { run };
```

The code is deliberately modest. It doesn't attempt storage-source selection, collision handling, route optimization, or reservation of energy for multiple creeps. Those are separate game behaviors that deserve separate tests. It also intentionally checks the target's energy-related `Store` methods instead of using deprecated `carry` properties.

## Run it from Screeps

Create `main.js` with a small integration boundary:

```javascript
const hauler = require('role.hauler');

module.exports.loop = () => {
  const spawn = Game.spawns.Spawn1;
  if (!spawn) return;
  const container = Game.getObjectById(Memory.supplyId);
  for (const creep of Object.values(Game.creeps)) {
    if (creep.memory.role === 'hauler') {
      hauler.run(creep, container, spawn);
    }
  }
};
```

Replace `Spawn1` with the real name of your spawn. Once you have built a container in the same room, inspect its ID and assign it to `Memory.supplyId` from the in-game console. Give a creep the memory role `hauler`. The example needs an existing container and a spawn with available energy capacity; it doesn't create structures or creeps for you. `Game.getObjectById` returns `null` when the object is unavailable, which the role explicitly handles. Do not paste a guessed ID or try the example in a room you cannot observe.

## Check decisions using only Node.js

You can exercise that same role module in an ordinary folder without installing a Screeps server or providing any game credentials. Copy `role.hauler.js` into the folder and save this minimal fixture as `hauler.test.js`:

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');

global.RESOURCE_ENERGY = 'energy';
global.ERR_INVALID_TARGET = -7;
global.ERR_NOT_ENOUGH_RESOURCES = -6;
global.ERR_FULL = -8;
global.ERR_NOT_IN_RANGE = -9;

const { run } = require('./role.hauler');

test('an empty creep approaches a distant energy container', () => {
  const calls = [];
  const container = { store: { getUsedCapacity: () => 100 } };
  const spawn = { store: { getFreeCapacity: () => 300 } };
  const creep = {
    store: { getUsedCapacity: () => 0 },
    withdraw: (target, resource) => {
      calls.push(['withdraw', target, resource]);
      return ERR_NOT_IN_RANGE;
    },
    moveTo: (target) => calls.push(['moveTo', target])
  };
  assert.equal(run(creep, container, spawn), ERR_NOT_IN_RANGE);
  assert.deepEqual(calls, [
    ['withdraw', container, RESOURCE_ENERGY],
    ['moveTo', container]
  ]);
});
```

With Node.js 20 or newer, run `node --test hauler.test.js`. One passing test confirms the **JavaScript decision and call order**: the hauler first asks to withdraw energy, sees the out-of-range status, and then requests movement toward the same container. It does not say whether an in-game creep will find a path.

Build a second test by changing the mock `getUsedCapacity` to return positive energy, replacing `withdraw` with `transfer`, and checking that the destination is the spawn. Then cover full and empty stores, missing targets, and non-range errors. Each test should distinguish an **action request** from its final game result. The tests don't need a game account, and they shouldn't accidentally make real resource requests.

## What a passing test does not cover

For a real deployment, inspect the role in your own room after uploading the two modules. Verify that the source container exists, your spawn is owned and reachable, both stores have appropriate energy capacities, and your hauler has the required body parts. Watch several game ticks: the resource amounts change *after* intents are resolved, not inside Node's fake objects.

If the creep repeatedly returns `ERR_NOT_IN_RANGE`, investigate actual room terrain, fatigue, blocking structures, and the result of `moveTo`. If it returns `ERR_FULL`, recheck the free capacity of the actual receiving structure. A different role or an unavailable container may require a more complex state machine rather than an extra line in this example.

The approach scales to other **decisions at the game boundary**. Test one rule, keep its mock as small as possible, and use a real private room/server when you need confidence about pathfinding, resource-intent conflicts, or tick-by-tick world state. That lets a fast offline unit test provide useful feedback without pretending to replace the Screeps simulation.
