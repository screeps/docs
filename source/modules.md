title: Organizing scripts using modules
---

For your convenience, you may divide your scripts into modules with the help of Node.js-like syntax – the `require` function and the `module.exports` object. For example, you can create a module called 'scout' with the following content:

    module.exports.scout = {
        run(creep) {
            creep.moveTo(...);
        }
    }

Then you may include this module from the main module this way:

    var scout = require('scout');

    for(var i in Game.creeps) {
        scout.run(Game.creeps[i]);
    }

Besides your own modules, you can also access some embedded modules. Currently, it is the [lodash](http://lodash.com) module which you can use like this:

    var _ = require('lodash');

    var harvesters = _.filter(Game.creeps, {
        memory: {role: 'harvester'}
    });

## Binary modules

Besides normal script modules, you can create special binary modules. Such a module is loaded
as a raw `Buffer` with binary data when you call `require`. It allows you to use 
techniques like [WebAssembly](http://webassembly.org/) to compile code written in different languages 
and run it in Screeps. 

WebAssembly is a binary compiled code format that allows to run C/C++ or Rust code (as well as other supported languages in the future) directly with native performance. Please refer to the WebAssembly [documentation](https://developer.mozilla.org/en-US/docs/WebAssembly) for more info.

Here is a short example of how to compile C/C++ code using [Emscripten](https://kripken.github.io/emscripten-site/index.html) and upload the binary file to Screeps.

### Build `.wasm` file

{% note info %}
You can skip this step if you use an already compiled `.wasm` file from the web. For example, 
we've already compiled the [`addTwo.wasm`](img/addTwo.wasm) file for you from the example below.
{% endnote %}

Install Emsripten SDK using [these instructions](https://kripken.github.io/emscripten-site/docs/getting_started/downloads.html#sdk-installation-instructions).

Write your native C function and save it as `addTwo.c` file:

```c++
int addTwo(int a, int b) {
    return a + b;
}
```

Compile it to `addTwo.wasm` using this command:
```
emcc -s WASM=1 -s SIDE_MODULE=1 -O3 addTwo.c -o addTwo.wasm
```

### Upload binary module

Add a new module `addTwo` with binary type using this switch:

![](img/binary1.png) 

Upload your `addTwo.wasm` file as binary module contents, so that it looks as follows:

![](img/binary2.png) 

Click the ✔️ button to commit your modules.

### Run your native module in Screeps

If you uploaded your binary module correctly, you should see the following in your in-game IDE:

![](img/binary3.png) 

Now you can use the following code to run your imported binary code in `main` using WebAssembly API:

```javascript
// This will return an ArrayBuffer with `addTwo.wasm` binary contents
const bytecode = require('addTwo');

const wasmModule = new WebAssembly.Module(bytecode);

const imports = {};

// Some predefined environment for Emscripten. See here:
// https://github.com/WebAssembly/tool-conventions/blob/master/DynamicLinking.md
imports.env = {
    memoryBase: 0,
    tableBase: 0,
    memory: new WebAssembly.Memory({ initial: 256 }),
    table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' })    
};

const wasmInstance = new WebAssembly.Instance(wasmModule, imports);

console.log(wasmInstance.exports.addTwo(2,3));
```
