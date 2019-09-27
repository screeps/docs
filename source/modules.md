title: 使用模块码归纳d代码
---

我们引入了 Node.js 句法的 `require` 和 `module. exports ` 已方便玩家归纳代码。比如,你可以通过下例代码创造一个“侦察兵”模块：
For your convenience, you may divide your scripts into modules with the help of Node.js-like syntax – the `require` function and the `module.exports` object. For example, you can create a module called 'scout' with the following content:

    module.exports = {
        run(creep) {
            creep.moveTo(...);
        }
    }

然后你可以在主模组中导入“侦察兵”模块： Then you may include this module from the main module this way:

    var scout = require('scout');

    for(var i in Game.creeps) {
        scout.run(Game.creeps[i]);
    }

除了自己的模块，玩家还可以使用其他人的模块。目前我们内置了 [lodash](http://lodash.com) 模组供玩家使用。

Besides your own modules, you can also access some embedded modules. Currently, it is the [lodash](http://lodash.com) module which you can use like this:

    var _ = require('lodash'); // 译注：由版本更新，此行现可省略

    var harvesters = _.filter(Game.creeps, {
        memory: {role: 'harvester'}
    });

## 二进制模块

除了普通模块，玩家可以创造二进制模块。其会在玩家调用 `require` 时以原始二进制的形式加载，允许玩家运行用其他语言（比如 [WebAssembly](http://webassembly.org/) ）编写的代码。

Besides normal script modules, you can create special binary modules. Such a module is loaded as a raw `Buffer` with binary data when you call `require`. It allows you to use
techniques like [WebAssembly](http://webassembly.org/) to compile code written in different languages
and run it in Screeps.

WebAssembly 是个二进制编译的代码格式。其可直接以本机性能运行 C/C++ 或 Rust 代码（及即将支持的语言）。参阅 WebAssembly [文档](https://developer.mozilla.org/en-US/docs/WebAssembly)以获取更多信息。
WebAssembly is a binary compiled code format that allows to run C/C++ or Rust code (as well as other supported languages in the future) directly with native performance. Please refer to the WebAssembly [documentation](https://developer.mozilla.org/en-US/docs/WebAssembly) for more info.

下举一例用 [Emscripten](https://kripken.github.io/emscripten-site/index.html) 编译 C/C++ 代码并将其推以二进制模块推送至 Screeps。
Here is a short example of how to compile C/C++ code using [Emscripten](https://kripken.github.io/emscripten-site/index.html) and upload the binary file to Screeps.

### 创建 `.wasm` 文件

{% note info %}
省略此步如果您用的是已编译好了的 `.wasm` 文件。比如：你从下例下载了 [`addTwo.wasm`](img/addTwo.wasm) 文件。You can skip this step if you use an already compiled `.wasm` file from the web. For example,
we've already compiled the [`addTwo.wasm`](img/addTwo.wasm) file for you from the example below.
{% endnote %}

安装 [Emsripten SDK]((https://kripken.github.io/emscripten-site/docs/getting_started/downloads.html#sdk-installation-instructions))。

编写原生 C 函数并保存为 `addTwo.c` Write your native C function and save it as `addTwo.c` file:

```c++
int addTwo(int a, int b) {
    return a + b;
}
```

用此指令编译 `addTwo.wasm`：
```
emcc -s WASM=1 -s SIDE_MODULE=1 -O3 addTwo.c -o addTwo.wasm
```

### 上传二进制模块

用此按钮添加新的二进制模组  `addTwo`：
Add a new module `addTwo` with binary type using this switch:

![](img/binary1.png)

以二进制模组上传 `addTwo.wasm`：
Upload your `addTwo.wasm` file as binary module contents, so that it looks as follows:

![](img/binary2.png)

点击 ✔️ 提交代码。
Click the ✔️ button to commit your modules.

### 在 Screeps 使用二进制模块

如果您正确上传了你的二进制模块，您应该能在内置 IDE 看见下图：
If you uploaded your binary module correctly, you should see the following in your in-game IDE:

![](img/binary3.png)

您现在可通过 WebAssembly API 将二进制代码导入您的 `main`
Now you can use the following code to run your imported binary code in `main` using WebAssembly API:

```javascript
// 这将返回带有 `addTwo.wasm` 二进制内容的 ArrayBuffer
const bytecode = require('addTwo');

const wasmModule = new WebAssembly.Module(bytecode);

const imports = {};

//有关 Emscripten 允许环境，请参见:
// https://github.com/WebAssembly/tool-conventions/blob/master/DynamicLinking.md
imports.env = {
    memoryBase: 0,
    tableBase: 0,
    memory: new WebAssembly.Memory({ initial: 256 }),
    table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' })
};

const wasmInstance = new WebAssembly.Instance(wasmModule, imports);

console.log(wasmInstance.exports._addTwo(2,3));
```
