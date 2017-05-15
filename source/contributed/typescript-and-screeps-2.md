title: TypeScript and Screeps, from Beginner to Advanced, Pt. 2
contributed:
    name: bryan
    link: https://github.com/bryanbecker
    date: 2017-05-15
---

# TypeScript and Screeps, from Beginner to Advanced, Pt. 2

* [Part 1](http://docs.screeps.com/contributed/typescript-and-screeps-1.html)
Introduction to TypeScript and setting up a TypeScript + Screeps environment
* [Part 2](http://docs.screeps.com/contributed/typescript-and-screeps-2.html)
**In depth look using TypeScript's features to extend the built-in Screeps objects and methods**
* [Part 3](http://docs.screeps.com/contributed/typescript-and-screeps-3.html)
Getters, setters, and meta programming with decorators

In Part Two, we are going to take a look at using custom TypeScript interfaces and types to extend the Screeps classes to write shorter, more error-proof code.
Towards the end of the article, we will look at some specific Screeps use-cases that take advantage of these custom types.

## Advanced Typescript & Screeps Typing
> AKA, how to supercharge your code

### Extending the Default Screeps Typings with declaration merging

TypeScript provides support for [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html).  This means that declarations (most commonly, interfaces) defined throughout your code with the same name, will be merged into one large interface.  To use an example from the docs:

```typescript
// first declaration of Cloner interface
interface Cloner {
    clone(animal: Animal): Animal;
}
// second declaration of Cloner interface
interface Cloner {
    clone(animal: Sheep): Sheep;
}
// third declaration of Cloner interface
interface Cloner {
    clone(animal: Dog): Dog;
    clone(animal: Cat): Cat;
}
```
will be effectively merged into one interface, with the result:
```typescript
interface Cloner {
    clone(animal: Dog): Dog;
    clone(animal: Cat): Cat;
    clone(animal: Sheep): Sheep;
    clone(animal: Animal): Animal;
}
```

### Getting the Memory object under control
> AKA "Stop using `any`!"

We can use declaration merging and extending to keep our Memory object typed, without driving ourselves insane maintaining a giant declaration file.

The default declaration for the Memory object (installed via `typings`) is given as:

```typescript
interface Memory {
    [name: string]: any;
    creeps: {
        [name: string]: any;
    };
    flags: {
        [name: string]: any;
    };
    rooms: {
        [name: string]: any;
    };
    spawns: {
        [name: string]: any;
    };
}
```

This is actually improperly typed, as it doesn't allow us to extend `creeps`, `flags`, `rooms`, or `spawns`.  We are going to fix this in a bit.

  
Now, supposed we have two modules: `miner.ts` which exports a class for a creep that shoud be harvesting, and `upgrader.ts` which exports a class for a creep dedicated to upgrading our controller.  Both of these classes inherit from the abstract class `worker.ts`.
- Each class stores the name of it's job in memory (so the creep can resume it's task next tick).
- The `miner` class stores the `id` of the Source it's mining.
- The `upgrader` class stores the `pos` of the controller in memory.

These files are organized in the following directory structure:
```
src/
  workers/
    worker.ts
    miner.ts
    upgrader.ts
```
An example of how this code might look is:

```typescript
// src/workers/worker.ts
export abstract class Worker {
  public creep: Creep;
  public memory: any;
  
  constructor(creep: Creep) {
    this.creep = creep;
    this.memory = Memory.creeps[creep.name];
  }
  
  // the following would actually be better implemented
  // as a getter/setter, or as a function on inherited classes
  // but this is only an example
  public getJob() {
    return this.memory.job;
  }
  
  public setJob(job: string) {
    this.memory.job = job;
  }
}

// src/workers/miner.ts
export class Miner extends Worker {

  constructor(creep: Creep) {
    super(creep);
    this.memory.job = "Miner";
  }

  public setTargetSource(source: Source) {
    this.memory.source = source.id;
  }
  
  public harvest() {
    this.creep.harvest(this.memory.source);
    // Uh Oh! This compiled fine, but will error at runtime!
    // `this.memory.source` is an ID (string), not an actual Source object
    // ... If only TypeScript could have warned us....
    // (not to mention, it could also be `undefined`)
  }
}
```

As our code gets more advanced, we create more classes that inherit from `Worker`, and add more features to the base, we start to lose concept of what exactly is in Memory.

The TS compiler's main advantage is situations like this.  We waste the #1 advantage of using TypeScript when we type objects as `any`.

> **Note** There is [PR](https://github.com/screepers/Screeps-Typescript-Declarations/pull/107) in the [Screeps-Typescript-Declarations](https://github.com/screepers/Screeps-Typescript-Declarations) to fix this.  Until the PR is merged, you can either manually edit the installed typings as in the guide here, or reinstall the typings from the [forked repository](https://github.com/bryanbecker/Screeps-Typescript-Declarations).

A better declaration for Memory would be:

```typescript
// src/typings/globals/screeps/index.d.ts
interface Memory {
    [name: string]: any;
    creeps: {[name: string]: CreepMemory};
    flags: {[name: string]: FlagMemory};
    rooms: {[name: string]: RoomMemory};
    spawns: {[name: string]: SpawnMemory};
}

// individual memory interfaces that we will extend later in our codebase
interface CreepMemory {}
interface FlagMemory {}
interface RoomMemory {}
interface SpawnMemory {}
```

Now we can start actually telling TypeScript about all the information we are storing in our Creeps Memory.

> **Note** tslint will complain about having an empty interface here, as usually that is a symptom of some other problem.  However, in our case it's nice to help keep track of which object we are working with.
You can disable the tslint rule project-wide with `"no-empty-interface": false`, or just in the file by adding at the top of the file:
  ```typescript
  /* tslint:disable:no-empty-interface */
  ```

What we can do is add a file `src/workers/declarations.d.ts` or `src/workers/interfaces.d.ts` (the name doesn't matter, but it should end in `.d.ts` to keep with convention) where we keep track of these things, taking advantage of interfaces:

```typescript
// src/workers/declarations.d.ts

// This declaration will be merged with the above declaration of `{}`
interface CreepMemory {
  job: string;
  source?: string;              // marked as optional
  controllerPos?: RoomPosition; // marked as optional
}
```

Now we can change the above files to look like:

```typescript
// worker.ts
export abstract class Worker {
  public creep: Creep;
  public memory: CreepMemory;  // change from Type `any` to `CreepMemory`
}

// miner.ts
export class Miner extends Worker {
  public harvest() {
    // Now the IDE and compiler will warn us here that `this.memory.source` is of type
    // `string | undefined`, and that `harvest` needs an argument of type `Source`
    this.creep.harvest(this.memory.source);
  }
}
```

### TypeScript Generics and Memory
> Taking things to the next level

OK, so things are better now, but it's getting tedious growing the `CreepMemory` interface, and keeping track of all these optional properties for our code.

Luckily, generics solve this issue, and work very nicely with abstract/inherited classes

Let's change our above declarations again:

```typescript
// src/workers/declarations.d.ts

// This time we are "extending" CreepMemory
interface WorkerMemory extends CreepMemory {
  job: string;  // the current job of the Creep (ex. "miner" or "upgrader")
}

// We keep extending interfaces...
interface MinerMemory extends WorkerMemory {
  source: string;  // object ID of Source object
}

// ...so we can add more information to them to match with our actual code
interface UpgraderMemory extends WorkerMemory {
  controllerPos: RoomPosition; // pos of room controller
}
```

Much clearer isn't it?  It's clearly written out what uses what, and if you need to make a change, you don't need to dig too deep in the code to see what the change will affect.

Now lets make our `Worker` and `Miner` class use the new interface

```typescript
// worker.ts
export abstract class Worker {
  public creep: Creep;
  public memory: WorkerMemory;  // use the new 'WorkerMemory'
}

// miner.ts
export class Miner extends Worker {
  public memory: MinerMemory;  // use the new 'MinerMemory'
}
```

OK, at first this looks like it will work — but actually you will get errors.  When you redeclare `memory` on the child class (`Miner`), the parent no longer has access to it, so any methods in `Worker` that call `this.memory` will throw an error or get `undefined`.

We can fix by telling the parent about the child-class's extended Memory using generics:

```typescript
// worker.ts
// this next line does 3 things:
// 1. we declare a generic type M (short for "memory"),
// 2. we tell the compiler that M is any type extending from WorkerMemory
// 3. we set a default value for M as WorkerMemory
export abstract class Worker<M extends WorkerMemory = WorkerMemory> {
  public creep: Creep;
  // now we tell TypeScript that `memory` property is of type `M`.
  // that is, `memory` is any type extending from `WorkerMemory`,
  // and defaulting to `WorkerMemory` if not specified
  public memory: M;
}

// miner.ts
// if you think of `M` above as a variable (it is), here we have to assign
// a value to `M`; so we tell TypeScript, "for the `Miner` child class, `M` is
// type `MinerMemory`" (since we set a default above, if we leave this out
// TypeScript will just treat `M` as type `WorkerMemory`)
export class Miner extends Worker<MinerMemory> {
  // we no longer need to redefine memory here, so we  can remove this line
  // public memory: MinerMemory;  // no longer needed
}
```

Using generics like this well help Types just "flow" through the system as you code, and the compiler will be able to infer everything it needs.

### Generic Custom Screeps Objects & Type Guards

We covered how to use extending interfaces and generics to keep your Memory objects organized.  Now lets look at how to use them to keep the objects in the Screeps World organized.  We wan't to gather as much "type" information about objects as we can, so we can leverage the advantages of the TypeScript typechecker when writing code.

As you know, the objects in Memory are reset each tick.  If you try and store an object in Memory, next tick it is invalid.  So we have to store the object ID, and next tick:
```typescript
// `myObject` will be type of {}
const myObject = Game.getObjectById(objectID);
```
However, when we get the object back, we lost it's type.  It could be anything.  In the case of `Miner` above, *we know* it's a Source — but the compiler doesn't.

We can tell it, though.  The `getObjectById` method is actually typed as a generic, so we can use:
```typescript
// `myObject` will be type of Source
const myObject = Game.getObjectById<Source>(objectID);
```

This works good enough for that specific example.  But we want MOAR.

Let's use the example of a new `Worker` class, the `Intern`.  `Intern` class designed to be cheap (no investing in specialized body parts) and isn't specific for any single task.
We will use it as a generic helper to just pick up the slack where needed.  The `Intern` can `harvest`, `upgrade`, `build`, `charge` (transfer energy to a Spawn or Extension) and `scavenge` (look for dropped Energy on the grount and pick it up).

We can code it by just copy-pasting all the relevant portions from the other classes, and adjusting them, but we're better than that.  Let's try to take advantage of TypeScript's features to write a super-lean generic set of tasks for our `Intern`.

We are going to start with a less advanced implementation, and add on to it:

First, our `Intern` is going to have to remember what it was doing between ticks, so it can resume it's task the next tick.  That means we have to use the Memory object.  We should save in memory what it was doing, and the target of the action (For example, we should store that it was "harvesting" and the ID of the `Source` it was attempting to harvest).

```typescript
// src/workers/declarations.d.ts

// These are all optional, because we can only do one thing at a time
interface InternMemory extends WorkerMemory {
  source?: string;           // object ID of Source object
  spawn?: string;            // ID of Spawn object
  construction?: string;     // ID of ConstructionSite
  resource?: string;         // ID of dropped resource
  controller?: RoomPosition;
  
  currentAction: string;  // the action the Intern performing (e.g. "upgrading")
}
```

That gets the job done.  If `currentAction === "building"`, then we can know to check `this.memory.construction` to get the ID of the target `ConstructionSite`, and we don't have to worry about losing the type of the object -- we *know* it's a `ConstructionSite` ID, because we saved in the property `construction`, and we can tell TypeScript about it the same way as before:
```typescript
const constructionSite = Game.getObjectById<ConstructionSite>(this.memory.construction);
```

But by now, your programming instincts are probably starting to make you feel a bit uncomfortable.
Something about doing it this way doesn't seem right.

Plus, what if we want to extend or derive from `Intern`? Having all these optional properties is going to be a maintenance nightmare.

Let's propose another, more generic solution:


```typescript
// src/workers/declarations.d.ts

// only store one item in memory:
interface InternMemory extends WorkerMemory {
  target?: string;   // target object ID
}
```

*If you think about it, Screeps actually has a dirty little secret:*

Most of the `Creep` actions (`build`, `harvest`, `transfer`, `upgrade`, `pickup`) are really the same.  They take an object, and then then the creep does the action to the object if it's in range.

For example, `transfer` works on `Spawn`, `Extension`, other `Creeps`, and `Containers`.  
`build` works on `ConstructionSites`.  
`upgrade` works on `Controller`.  
`repair` works on all types derived from `Structure`.  
etc. etc.

Maybe we can make a generic version of these, as well?
```typescript
// intern.ts
export class Intern extends Worker<InternMemory> {
  public setTarget(objID: string) {
    this.memory.target = objID;
  }
  public doWork() {
    const target = Game.getObjectById(this.memory.target);
    // depending on type of `target`, do corresponding action
  }
}
```

Nice! But... wait.  We lost the type information.  What type is `target`? All we have is a generic ID (`string`).

#### Custom interfaces make everybody happy

Let's make some generic types to reflect what we figured out before.  First off, what objects have IDs?  Well, anything derived from `RoomObject`.  But, frustratingly, `id` is not a property of `RoomObject`.  We can work around that, though:

```typescript
// src/declarations.d.ts

// since we know all RoomObjects have `id`
interface HasId extends RoomObject {
  id: string;
}
```

Now we can make the above `setTarget` function slightly nicer:

```typescript
// intern.ts
export class Intern extends Worker<InternMemory> {
  // anything with an ID is a potential target
  public setTarget(newTarget: HasId) {
    this.memory.target = newTarget.id;
  }
  // ...
````

Let's keep going with this, but this time we will use custom `type`s.  A `type` declaration is just an alias.  It gives you a shortcut to writing out long type definations.

```typescript
// src/declarations.d.ts

interface HasId extends RoomObject {
  id: string;
}

// a type for all objects that run on energy
type Chargeable = Spawn | Extension;

// type for objects that store stuff
type Storable = Container | Storage;

// a type for all objects that are buildable
type Buildable = ConstructionSite;

// Creep.upgrade
type Upgradable = Controller;

// Creep.repair
type Repairable = Structure;

// Creep.harvest
type Harvestable = Source;

```

> OK, most of those aren't super useful (aliasing `Controller` to `Upgradable` doesn't even really save typing), but they work to serve a point for this example.  It's also a stylistic choice.  They *do* have the advantage of being extendable later (you only need to change the code in one place if the Screeps team later adds another object that's upgradable or buildable).

But... we still haven't actually solved the original issue.  How do we know what type `target` represents in our `Intern` class?

#### Type Guards to the rescue!

TypeScript has a cool feature called Type Guards, that work similar to `instanceof` and `typeof`, but also propogate through the IDE / compiler.

In the above code:
```typescript
// intern.ts
export class Intern extends Worker<InternMemory> {
  public doWork() {
    const target = Game.getObjectById(this.memory.target);
    // depending on type of `target`, do corresponding action
  }
}
```
We still need to figure out the type of `target`.  To do this, we need to write some type guards; and to do that, we need to first figure out what makes each of our custom types unique from object that **are not** that type.

| type | Unique property |
|--|--|
| Chargeable | all of these have an `energyCapacity` property
| Storable | `storeCapacity` property
| Buildable | `progress` && `progressTotal` property
| Upgradable | `level` property
| Repairable | `hits` && `hitsMax` property
| Harvestable | `ticksToRegeneration`

Let's edit this a little bit.  If you think about it, a `Spawn` at max energy isn't *actually* Chargeable, and a `Structure` at full health isn't *really* `Repairable`.

Also: Whoops!  `Source` objects also have `energyCapacity` but they aren't Chargeable. We need to fix that.

| type | Unique property (AKA Type Guard) |
|--|--|
| Chargeable | `energyCapacity` but not `ticksToRegeneration` property && less than 90% full
| Storable | `storeCapacity` property
| Buildable | `progress` && `progressTotal` property
| Upgradable | `level` property
| Repairable | `hits` && `hitsMax` property, && `((hitsMax - hits) / hitsMax) < 0.9`
| Harvestable | `ticksToRegeneration`

Let's write these bad boys:

```typescript
// utils/typeGuards.ts <-- Another new file.  Stay organized!

export function isHarvestable(obj: HasId): obj is Harvestable {
  return (obj as Harvestable).ticksToRegeneration !== undefined;
}

export function isBuildable(obj: HasId): obj is Buildable {
  return (obj as Buildable).progress !== undefined;
}

export function isUpgradable(obj: HasId): obj is Upgradable {
  return (obj as Upgradable).level !== undefined;
}

export function isStorable(obj: HasId): obj is Storable {
  return (obj as Storable).storeCapacity !== undefined;
}

export function isRepairable(obj: HasId): obj is Repairable {
  // two checks here:
  // the first to test if structure
  if ((obj as Repairable).hitsMax === undefined) { return false; }
  // and a second to test if damaged
  const hitsMax = (obj as Repairable).hitsMax;
  const hits = (obj as Repairable).hits;
  // true if under 90% health
  return ((hitsMax - hits) / hitsMax) < 0.9;
}

export function isChargeable(obj: HasId): obj is Chargeable {
  if ((obj as Chargeable).energyCapacity) {
    // make sure obj isn't a Source 
    if ((obj as Source).ticksToRegeneration !== undefined) { return false; }
    const eMax = (obj as Chargeable).energyCapacity;
    const e = (obj as Chargeable).energy;
    // if obj is full, it's not "chargeable"
    return ((eMax - e) / eMax) < 0.9;
  }
  return false;
}
```

Notice the pattern?  They take an `object`, return a `boolean`, and the return type is declared as `obj as {NameofType}`.  If the function returns `true`, it indicates to both TypeScript (and the compiled JavaScript), that the object can be treated as whatever type is indicated in the return declaration.

Let's go ahead and finish our `Intern`'s `doWork()` function:

```typescript
// intern.ts
// don't forget to import our functions!
import * as Guards from "../utils/typeGuards";

export class Intern extends Worker<InternMemory> {
  public doWork() {
    const target = Game.getObjectById(this.memory.target);
    // depending on type of `target`, do corresponding action
    if (Guards.isChargeable(target)) { this.creep.transfer(target); }
    if (Guards.isStorable(target)) { this.creep.withdraw(target); }
    if (Guards.isBuildable(target)) { this.creep.build(target); }
    if (Guards.isRepairable(target)) { this.creep.repair(target); }
    if (Guards.isHarvestable(target)) { this.creep.harvest(target); }
  }
}
```

Wow!  Now we can do with one generic function, what used to take 5 seperate functions.
On top of that, the code is extremely readable.

Of course, in a more realistic scenario, you would need to expand `doWork()` a bit to check things like if the creep is in range or not.

Here's some starter code to get you going making a more complete generic worker.

```typescript
// intern.ts
// don't forget to import our functions!
import * as Guards from "../utils/typeGuards";

export class Intern extends Worker<InternMemory> {
  public doWork() {
    const target = Game.getObjectById(this.memory.target);
    // depending on type of `target`, do corresponding action
    if (Guards.isChargeable(target)) {
      return this.moveCreep(target) && this.creep.transfer(target);
    }
    if (Guards.isStorable(target)) {
      return this.moveCreep(target) && this.creep.withdraw(target);
    }
    if (Guards.isBuildable(target)) {
      return this.moveCreep(target, 3) && this.creep.build(target);
    }
    if (Guards.isRepairable(target)) {
      return this.moveCreep(target, 3) && this.creep.repair(target);
    }
    if (Guards.isHarvestable(target)) {
      return this.moveCreep(target) && this.creep.harvest(target);
    }
  }
  
  // returns true if creep is within range of target; otherwise
  // attempts to move the creep, and returns false
  // `HasPosition` is another generic type that we haven't written,
  // However you should now be able to write the definition yourself
  public moveCreep(target: HasPosition, range: number = 1): boolean {
    /*  Psuedo Code:
     *  If distance to target <= range, return true;
     *  if (this.creep.fatigue === 0) { this.creep.moveTo(target); }
     *  return false;
     */
  }
}
```

##### [Continue on to Part 3](http://docs.screeps.com/contributed/typescript-and-screeps-3.html)
