title: TypeScript and Screeps, from Beginner to Advanced, Pt. 3
contributed:
    name: bryan
    link: https://github.com/bryanbecker
    date: 2017-05-15
---

# TypeScript and Screeps, from Beginner to Advanced, Pt. 3

## Part 3: Getters, setters, and meta programming with decorators
> AKA Speak English, dammit!

In the [previous article](http://docs.screeps.com/contributed/typescript-and-screeps-2.html) we learned about custom types and interfaces, and how to use them to our advantage to create Screeps classes that are robust against errors, while being reusable.

This article is going to delve into slightly more advanced concepts, such as modifying your classes prototypes using meta programming. 
(see [Modyifying object prototypes](http://docs.screeps.com/contributed/modifying-prototypes.html) for more information).

The end result is that your Screeps code will be more maintainable, shorter/cleaner, and use less CPU.

### Jumping in

In an attempt to avoid a lengthy technical explaination, this article will take a teach-by-example approach, and jump-right in with an actually useful examples.

Consider another scenario similar to the previous article, in which we have a base abstract class that is extended by a child class.

##### Starting Scenario:
```typescript
////////
// src/workers/worker.ts

export interface WorkerMemory extends CreepMemory {
  roomName?: string;  // assigned room name
}

// Abstract class other workers inherit from
export abstract class Worker<M extends WorkerMemory = WorkerMemory> {
  public memory: M;     // the creep's memory
  public creep: Creep;  // the actual Creep object
  public assignedRoom: Room;  // creep's assigned room
  
  constructor(creepName: string) { /* snip */ }
  
  public assignRoom(roomName: string) { /* snip */ }
}

////////
// src/workers/miner.ts
import { Worker, WorkerMemory } from "./worker";

interface MinerMemory extends WorkerMemory {
  source?: string;  // object ID of Source object
}

export class Miner extends Worker<MinerMemory> {
  public assignedSource: Source;
  
  public assignSource(source: Source) { /* snip */ }
}
```

The first thing you'll notice is we did away with the `declarations.d.ts` file, and threw the interfaces right in with the class definitions.

This is a stylistic choice with a simple tradeoff.  Previously the type declarations were "ambient" (if you recall from part one, that means global).  Now they are inside modules, so they need to be imported to be used.  At the same time, now we don't have to juggle looking in two files to find or update the definition.  The child class and associated memory are declared right next to each other.

We also added a few more properties to `Worker` and `Miner`.  We are going to use these new properties to illustrate decorators.


### Making Goals

Look at the `Worker` base class above.  It only receives it's own name as a constructor argument.  That means it has to figure out and set the rest of its properties on its own.

Getting the `Creep` object from the name is straightforward:
```typescript
this.creep = Game.creeps[creepName];
```
Same for `memory`:
```typescript
this.memory = Memory.creeps[creepName];  // we are assuming memory is already defined
```

We can put all this in the constructor and be done with it.  But what about `assignedRoom` and `assignedSource`?  Those are set using method calls (`assignRoom` and `assignSource`), and may not be available during instantiation.

The usual way to deal with this is to just mark the property as optional.  i.e.:
```typescript
public assignedRoom?: Room;
// or, equivalently:
public assignedRoom: Room | undefined;
```

But let's do it differently.  Let's make the properties dynamic and set themselves when they are accessed.  We can use getters and setters (property accessors) to do this.

### Drawing a plan

To make our goals clear, let draw a plan with a few goals:

* `this.assignedRoom` should always return a `Room` object (never return `undefined`)
  * if `roomName` is saved in Memory, return the matching `Room` object
  * otherwise return the creep's current room (`this.room`)
* `this.assignedSource` should also always return a `Source` object (never `undefined`)
  * if there is an ID stored in memory, return the corresponding `Source`
  * otherwise, find the closest `Source` to the creep, save it to memory, and return that

### Level 1: Using "getX()" functions – the plebe way
> (*Aside: there is nothing wrong with using "getX()" functions this way. We are being a bit tongue-in-cheek elitist here*).

Using the above requirements, our functions would look something like:

```typescript
public getAssignedSource(): Source {
  if (this.memory.source) { return Game.getObjectById<Source>(this.memory.source); }
  const source = this.creep.pos.findClosestByPath<Source>(FIND_SOURCES);
  this.memory.source = source.id;
  return source;
}

public getAssignedRoom(): Room {
  if (this.memory.roomName) { return Game.rooms[this.memory.roomName]; }
  return this.creep.room;
}
```

These get the job done, but they aren't elegant enough for us.
We have to call this ugly function when we want to just access a property.


We can do better, and level-up our code, using getters and setters (AKA accessors).

### Level 2: Upgrading using accessors

> In fact, typescript getters and setters are shortcuts to JavaScript's get and set [property descriptors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor).

> **Terminology**: getters/setters, get/set, accessor, and [property accessors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_Accessors) are just different ways of saying the same thing.

Let's see what the modified version of `getAssignedSource()` would look like:

```typescript
public get assignedSource(): Source {
  if (this.memory.source) { return Game.getObjectById<Source>(this.memory.source); }
  const source = this.creep.pos.findClosestByPath<Source>(FIND_SOURCES);
  this.memory.source = source.id;
  return source;
}
```

Pretty much exactly the same!  Except `get` is actually a keyword, now. The practical difference, now, is that we can actually use it like a property instead of like a function:
```typescript
// returns the result of calling our `get` function above
const source = myMiner.assignedSource;
```

We've come this far, we may as well set the *accessor*, too, and get rid of the `assignSource(source: Source)` function.  It's essentially the same.

```typescript
public set assignedSource(source: Source) {
  this.memory.source = source.id;
}
```

That's it?
Yes.  We don't actually set the property `assignedSource`, because we are using a `get` accessor in it's place.
That means we can delete the `assignedSource` property from our class, and rely just on our `get` and `set` accessor methods.
The full `Miner` class so far looks like:

```typescript
export class Miner extends Worker<MinerMemory> {
  public set assignedSource(source: Source) {
    this.memory.source = source.id;
  }
  public get assignedSource(): Source {
    if (this.memory.source) { return Game.getObjectById<Source>(this.memory.source); }
    const source = this.creep.pos.findClosestByPath<Source>(FIND_SOURCES);
    this.memory.source = source.id;
    return source;
  }
}
```

We removed the `assignedSource` property, and the `assignSource(source: Source)` functions, and replaced them with a getter and setter!

We haven't written the code for `assignedRoom`, but it's easy to infer that it's similar.

In fact, we can generalize what's happening here:

On a "get":

1. We see if the value (Id, name, etc.) exists in `Memory`.
2. If it does, we convert the value in memory to an actual object and return it.
3. If not, we figure out what the value should be (ex. finding the nearest source).
4. We save (cache) the value we just found to `Memory`.
5. We return it.

On a "set":

1. We take the object and convert it to something we can save in `Memory` (ex. a name, or id).
2. We save it in `Memory`.

Now that we've generalized these functions, you know what happens next:  We abstract it!


## TypeScript Decorators – The *Real* Screeps Meta
> Write code, that writes other code, that's compiled to Screeps code

[Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)
are used to modify your classes, methods, properties, and parameters at runtime.  This means more dynamic code, but it also means (as the focus of this article), less code and cleaner code.

There are five types of decorators available in typescript, but they are all fairly similar:
* they are automatically called at runtime,
* take a section of *code* as arguments,
* they optionally modify object properties or return new code.

Here they are, for reference:

1. Parameter decorators
2. Method decorators
3. Accessor decorators
4. Property decorators
5. Class decorators

As you can guess from the names, "parameter decorators" operator on function parameters, "method decorators" operate on methods, etc. etc.

The above cases of `assignedSource` and `assignedRoom` are both properties and will (probably obviously) use property decorators.


### Level 3: Using decorators – the l33t haxx0r way

A TypeScript PropertyDecorator looks like:
```typescript
type PropertyDecorator = (target: object, attribute: string) => any | void;
```
> The return value declaration is a bit misleading, because the actual property decorator should return a `PropertyDescriptor` or nothing (`void`). I can't say why the definition has `any` as a return value, but most likely it's for backwards compatability.

It takes a target object prototype and an attribute name, does something with it, and returns `any` or nothing.

There's nothing you can do in a decorator that you couldn't do with just a regular method or getter/setter.
The **benefit of decorators is to abstract often repeated boilerplate code away**, so you can keep your bread-and-butter classes nice and clean.


Let's first try to rewrite our `assignedSource` accessors as a decorator, and then we can generalize the decorator to work for `assignedRoom`, as well.

First off, we are going to rewrite `Miner` as:

```typescript
import { myDecorator } from "../decorators.ts";

export class Miner extends Worker<MinerMemory> {
  @myDecorator
  public assignedSource: Source;
}
```

Is that it?  Well, yes and no.  We still have to write the actual decorator.

As we learned above, the property decorator is called with the prototype of the class, and the attribute name at runtime.  So in our example, the decorator will be called at runtime with:
```typescript
myDecorator(Miner.prototype, "assignedSource");
```

Our decorator should take these arguments, and then add the getter and setter to the prototype
(see [Modyifying object prototypes](http://docs.screeps.com/contributed/modifying-prototypes.html) for more information on this topic).
Specifically, we are going to modify the [property descriptor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor) of the object.

Actually, property decorators are special, in that we don't have to directly modify the property descriptor.  If we return a value, TypeScript will merge that into the property descriptor for us.

Let's write it:

``` typescript
// src/decorators.ts

export function myDecorator(target: any, attribute: string): any | void {
  // for the first implementation of this decorator, we can just directly
  // return the getter and setter:
  return {
    set: function(source: Source) {
      this.memory.source = source.id;
    },
    set: function() {
      if (this.memory.source) { return Game.getObjectById<Source>(this.memory.source); }
      const source = this.creep.pos.findClosestByPath<Source>(FIND_SOURCES);
      this.memory.source = source.id;
      return source;
    }
  }
}
```

Our `Minor` class looks nicer:

```typescript
import { myDecorator } from "../decorators.ts";

export class Miner extends Worker<MinerMemory> {
  @myDecorator
  public assignedSource: Source;
}
```

But we didn't really gain much, besides hiding code away in another file.
We need to make this reusable so we actually gain an advantage.
Let's try to generalize this decorator, so it also works for `assignedRoom`.

- `assignedRoom` and `assignedSource` both look up a key in `Memory`, and get a `string`.  We can call this look-up key `memoryKey`.  Said another way, we need a function that takes `memoryKey` as an argument, and returns the data (`string`) saved in Memory at that location.  We can write this very easily using `lodash`:
  ```typescript
  // we take a string *or* an array of strings as arguments
  // this just gives us more flexibility, since lodash can work with either
  (memoryKey: string | string[]) => _.get<string>(this.memory, memoryKey);
  ```
- If the above function found the string, we should convert the string to an object and return it. We can say we `deserialize` the object using a function described as:
  ```typescript
  // `deserialize` generic function
  //   return a type generic (we need to define it later)
  //   or `undefined` because the data may not exist
  (data: string) => DeserializedObject | undefined;
  ```
- If we don't find the string in Memory, we need to perform some task to calculate the value (ex. lookup the closest `Source`).  This can also be described as a generic function, which we will call `fallback`
  ```typescript
  // `fallback` generic function
  //   return a type generic (we need to define it later)
  //   (you may want to consider adding `undefined` as a return type,
  //    so that the fallback can fail if it can't find anything)
  () => DeserializedObject;
  ```
- Last, we need a `serializer` function for our settor to use to save the data as a string in Memory:
  ```typescript
  // `serialize` generic function
  // take an object, and return a string representation
  (obj: DeserializedObject) => string;
  ```

> **Note** sometimes when working on seemingly complicated tasks with generics, it can help to first define all the types / functions involved before getting started writing the actual code.

If you recall, our property decorator takes two arguments: the class prototype, and the attribute name.  But we need to somehow also give it the `memoryKey`, `serializer`, `deserializer`, and `fallback`.

We do this with... drum roll...


### Decorator Factories – Our Final Form

A decorator factory is not a TypeScript feature – it's just a design pattern.
It's a function that *returns* a decorator.
This way we can first pass in whatever arguments we need before creating the decorator.

Let's define the declaration for our new `@serialized` decorator:
```typescript
export function serialized<Deserialized>(
  args: {
    memoryKey: string | string[],
    serializer?: (obj: Deserialized) => string,
    deserializer?: (data: string) => Deserialized | undefined,
    fallback?: () => Deserialized,
  },
): PropertyDecorator {
```
  
Whew.  That's a mouthful. Basically we are passing the factory everything we need to create the decorator, and then the factory is returns a `PropertyDecorator` function.

> When you have a large list of arguements, it's useful to pass them as an object instead of individual arguments.  This way, in your calling code, you don't have to remember *"was it the serializer that comes first, or the deserializer?"*

#### Whoops! We lost `this` !

Before we go any further, it should be pointed out that there is an error with our declarations.
Presumably, our serializer, deserializer, and fallback function will want acces to `this`.
However, since we are passing functions around all willy-nilly, we lose control of what `this` actually is.
To fix that, we will add an additional `context` argument to the functions.
So, instead using (for example) `this.creep`, they can use `context.creep`.

Let's try and write the full decorator, now:
  
```typescript
// src/decorators.ts

// serializes and deserialized a property from memory
export function serialized<Deserialized>(
  args: {
    memoryKey: string | string[],
    serializer: (obj: Deserialized, context?: object) => string,
    deserializer: (data: string, context?: object) => Deserialized | undefined,
    fallback?: (context?: object) => Deserialized,
  },
): PropertyDecorator {
  // our Decorator Factory returns a PropertyDecorator
  return (target: any, attribute: string) => {
    // delete the old attribute, just in case
    // if for some reason we can't (ex. it's read-only), return early
    if (!(delete target[attribute])) { return; }

    const {serializer, deserializer, memoryKey, fallback} = args;

    // the PropertyDecorator returns a PropertyDescriptor
    return {
      get: function() {
        // first, get the data (`string`) out of Memory using lodash
        const data = _.get<string>(this.memory, memoryKey);

        if (data) { // if we found the data
          // then pass it to `deserializer`, and return the result;
          return deserializer(data, this);
        } else { // value doesn't exist in memory
          // `fallback` was an optional arg, so first check it exists
          if (!fallback) { return undefined; }
          // use the `fallback` method and save the result
          const result = fallback(this);
          // `serialize` result of `fallback` so we don't have use it next time
          if (result) {
            // use the `serializer` function
            const reserialized = serializer(result, this);
            // save it to memory using lodash
            _.set(this.memory, memoryKey, reserialized);
          }
          return result;
        }
      },
      set: function(obj: Deserialized) {
        // run the object through `serializer`
        const serialized = serializer(obj, this);
        // and save it to memory using lodash
        _.set(this.memory, memoryKey, serialized);
      },
    };
  };
}
```

### Putting this to use

Let's try it out.  Now in our `Miner`class, our code can look like:

```typescript
// src/workers/Miner.ts
import { serialized } from "../decorators.ts";

export class Miner extends Worker<MinerMemory> {
  @serialized<Source>({
    memoryKey: "source",
    serializer: (s: Source) => s.id,
    deserializer: (d: string, context: Miner) => Game.getObjectById<Source>(this.memory.source),
    fallback: (context: Miner) => context.creep.pos.findClosestByPath<Source>(FIND_SOURCES),
  })
  public assignedSource: Source;
}
```

Now our code *just works*™.  Anytime we acces `.assignedSource` of a `Miner` instance, it will automatically return a `Source` object created from a `string` in `Memory`, or lookup (and save) a new `Source` if there wasy nothing in `Memory`.  Cool!

This can also save CPU if you want to save the `Source` object, but don't use it every tick.  With this `@serialized` decorator, the value is only pulled from Memory and converted into an object when you use it!

But a pretty obvious downside is that our code now looks like it got hit in the face with a hammer.

We can fix this using helper decorators:

```typescript
// src/decorators.ts

// helper decorator for a serialized source:
// we just move the code from `Miner` into a helper function
export function serializedSource(memoryKey: string): PropertyDecorator {
  return serialized<Source>({
    memoryKey: memoryKey,
    serializer: (s: Source) => s.id,
    deserializer: (d: string, context: Miner) => Game.getObjectById<Source>(this.memory.source),
    fallback: (context: Miner) => context.creep.pos.findClosestByPath<Source>(FIND_SOURCES),
  });
}


// src/workers/Miner.ts

import { serializedSource } from "../decorators.ts";

// and we can change the Miner class to:
export class Miner extends Worker<MinerMemory> {
  @serializedSource("source")
  public assignedSource: Source;
}
```
> (You can see how `this` can easily get confused here if we don't pass the `context` as a parameter. `Miner` calls a helper function, which returns a decorator factory function, which returns a decorator function, which returns a property descriptor  O_O)

 We won't cover it here, but now you can make a `serialized` helper for any commonly used memory-to-object conversion in your code.
 
 With the starter code above, you can now implement the following in your code quite easily:
 
 - `serializedRoom(memoryKey: string)` - converts between a "room name" and `Room` object
 - `serializedCreep(memoryKey: string)` - converts between a "creep name" and `Creep` object
 - `serializedConstructionSite(memoryKey: string)` - converts between an "object ID" and `Construction Site` object
 
### Next steps

This is the end of this series of articles.
Now that you've completed this series, you may want to look into implementing the following features in your code (by now you should have all the tools needed):

- `@memoized` property or member decorator:  The first time this property is access (or member function called), the value is calculated, cached, and returned.  Any subsequent calls just directly return the cached value, preventing wasting CPU on things you already calculated.
- `@one-time` member decorator: Only allows the member to be called once per tick.  You could use this to prevent, for example, multiple calls to `spawnCreep` in the same tick
- `@logged` property or member decorator:  Calls a logging function each time the member or property is accessed.
