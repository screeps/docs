title: Tips for reliable code by Atavus
---

The most often cause of an AI's demise is a minor exception in some part of the code resulting in the complete shut down of the AI. This circumstance is prevalent throughout the Screeps world from the small to the large.

By keeping in mind a few simple tricks you can drastically improve your code's reliability and by extension its survivability.

1. Segment your tick processing in as many independent processes as possible. Simple examples are:
 * creep logic
 * room logic
 * spawn logic
 * observer logic
 
2. Encapsulate your different processes with a safe execution runner.

Example:
```ecmascript 6
function safeRun(execute, args = []) {
	try {
		return execute(...args);
	} catch (exception) {
		Game.notify(exception.stack);
	}
}
```

Used in practice as follows:
```ecmascript 6
function loop() {
	safeRun(rooms, [Game.rooms]);
	safeRun(creeps, [Game.creeps]);
}

module.exports.loop = loop;
```

It's best to apply this level of encapsulation as deep as possible. Essentially encapsulating every creep and every room. This limits the potential damage caused by an unexpected error.

For easy access through your code you can expose the function to the global scope:
```ecmascript 6
global.safeRun = safeRun;
```

If you find yourself developing a number of similar utility functions, it would be wise to group them into your own namespace on the global object.