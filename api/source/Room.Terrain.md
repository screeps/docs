# Room.Terrain

提供快速访问房间地形数据的对象。您可以为游戏世界中的任何房间构造这些对象，即使没有该房间的视野。

从技术上讲，每个 `Room.Terrain` 对象都是一个非常轻量级的适配器，用于提供具有最小访问权限的静态地形缓冲区。


{% api_method constructor 'roomName' 0 %}

```javascript
const terrain = new Room.Terrain("E2S7");
```

```javascript
const terrain = new Room.Terrain(Game.creeps.John.room.name);
```

通过房间名称创建一个新的 `Terrain`。`Terrain` 对象可以从游戏世界中的任何房间构造，即使没有该房间的视野。

{% api_method_params %}
roomName : string
房间名称。
{% endapi_method_params %}


{% api_method get 'x, y' 0 %}

```javascript
switch(terrain.get(10,15)) {
    case TERRAIN_MASK_WALL:
        break;
    case TERRAIN_MASK_SWAMP:
        break;
    case 0:
        break;
}
```

```javascript
const roomName = "E2S7";
const terrain = new Room.Terrain(roomName);
const matrix = new PathFinder.CostMatrix;
const visual = new RoomVisual(roomName);

// 用默认地形成本填充 CostMatrix，以供将来分析：
for(let y = 0; y < 50; y++) {
    for(let x = 0; x < 50; x++) {
        const tile = terrain.get(x, y);
        const weight =
            tile === TERRAIN_MASK_WALL  ? 255 : // 墙壁 => 无法通行
            tile === TERRAIN_MASK_SWAMP ?   5 : // 沼泽 => 移动成本:  5
                                            1 ; // 平原 => 移动成本:  1
        matrix.set(x, y, weight);
        visual.text(weight, x, y);
    }
}
```

```javascript
// 绑定到 WASM module heap
const heapView = new Uint8Array(wasmModule.HEAPU8.buffer, ...); 
const terrain = new Room.Terrain("E2S7");

// 将地形数据复制到二进制 WASM module heap：
for(let y = 0; y < 50; y++) {
    for(let x = 0; x < 50; x++) {
        heapView[y * 50 + x] = terrain.get(x, y);
    }    
}
```

通过 `(x,y)` 坐标获取指定房间位置处的地形。和 <a href="#Game.map.getTerrainAt">`Game.map.getTerrainAt(...)`</a> 方法不同，此方法不执行任何字符串操作，并返回整数 terrain 类型值（详见下文）。

{% api_method_params %}
x : number
该房间中的 X 坐标。
===
y : number
该房间中的 Y 坐标。
{% endapi_method_params %}

### 返回值

以下整数值之一：

| 值 | <a href="#Constants">常量名</a> (*如果存在*) | 介绍 |
|-|-|-|
| 0 | *不存在* | 地形为 `plain` |
| 1 | `TERRAIN_MASK_WALL` | 地形为 `wall`|
| 2 | `TERRAIN_MASK_SWAMP` | 地形为 `swamp`|


{% api_method getRawBuffer '[destinationArray]' 1 %}

```javascript
function myPrintRawTerain(raw) {
    const visual = new RoomVisual();
    for(let y = 0; y < 50; y++) {
        for(let x = 0; x < 50; x++) {
            const code = raw[y * 50 + x];
            const color =
                (code & TERRAIN_MASK_WALL ) ? "gray"  :
                (code & TERRAIN_MASK_SWAMP) ? "green" : "white" ;
            visual.circle(x, y, {fill: color, radius: 0.5});
        }
    }
}

const raw = (new Room.Terrain("E2S7")).getRawBuffer();
myPrintRawTerain(raw);
```

```javascript
// 绑定到 WASM module heap
const heapView = new Uint8Array(wasmModule.HEAPU8.buffer, ...); 
const terrain = new Room.Terrain("E2S7");

// 快速将地形数据复制到 WASM module heap:
const t = Game.cpu.getUsed();
const result = terrain.getRawBuffer(heapView);
if(result !== ERR_INVALID_ARGS) {
    // 复制成功，在此处调用 WASM 函数：
    // wasmModule.myFunc(...); // 修改 "heapView" 的原始内存
    console.log("Distance transform done in", Game.cpu.getUsed() - t);
    myPrintRawTerain(heapView);
}
```

```cpp
// 二进制模块内的某处源代码...
void myFunc(void* ptr) {
    auto u8ptr = static_cast<uint8_t*>(ptr);
    // 在这里进行计算...
}
```

获取基础静态地形缓冲区的副本。 **当前使用的基础类型为 `Uint8Array`**。

{% api_method_params %}
destinationArray (可选) : Uint8Array
地形数据要拷贝到的已定义的数组视图。
{% endapi_method_params %}

***警告:*** *此方法依赖于地形数据的基础类型。此方法是获取整个房间（2500 地块）地形数据的最快方法，但是使用者需要始终牢记，该方法可能随时会被标记为已弃用。或者返回值的类型可能会因为基础类型的改变而改变。*

请查看使用示例。点击 <a href="/modules.html#Binary-modules">_二进制模块_</a> 来了解更多。

### 返回值

基础房间地形数据的副本，存放在大小为 2500 的新 `Uint8Array` [类型数组（typed array）](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)中。

每一个元素都是整数，地形类型可以通过对相应的 `TERRAIN_MASK_*` 常量执行位运算“与”（`&`）来获得。房间地块按行存储。

如果指定了 `destinationArray` 并且成功复制，则函数将会返回已填充 `destinationArray` 的引用，否则返回下列错误码：

{% api_return_codes %}
ERR_INVALID_ARGS | `destinationArray` 类型不兼容。
{% endapi_return_codes %}
