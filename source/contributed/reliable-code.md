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

It's worth mentioning that the use of try catch should be isolated in a wrapper function such as safeRun because it interferes with v8 optimization. This interference is exclusive to the contents of the try/catch block and do not extend to functions called from within try/catch. For further information read [optimization killers](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#2-unsupported-syntax), specifically the workaround section.
