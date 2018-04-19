# Room.Terrain

An object which provides fast access to room terrain data. These objects can be constructed for any room in the world even if you have no access to it.

Technically every `Room.Terrain` object is a very lightweight adapter to underlying static terrain buffers with corresponding minimal accessors.


{% api_method constructor 'roomName' 0 %}

```javascript
const terrain = new Room.Terrain("E2S7");
```

```javascript
const terrain = new Room.Terrain(Game.creeps.John.room.name);
```

Creates a new `Terrain` of room by its name. `Terrain` objects can be constructed for any room in the world even if you have no access to it.

{% api_method_params %}
roomName : string
The room name.
{% endapi_method_params %}


{% api_method get 'x, y' 0 %}

```javascript
const roomName = "E2S7";
const terrain = new Room.Terrain(roomName);
const matrix = new PathFinder.CostMatrix;
const visual = new RoomVisual(roomName);

// Fill CostMatrix with default terrain costs for future analysis:
for(let y = 0; y < 50; y++) {
    for(let x = 0; x < 50; x++) {
        const tile = terrain.get(x, y);
        const weight =
            tile === TERRAIN_MASK_WALL  ? 255 : // wall  => unwalkable
            tile === TERRAIN_MASK_SWAMP ?   5 : // swamp => weight:  5
                                            1 ; // plain => weight:  1
        matrix.set(x, y, weight);
        visual.text(weight, x, y);
    }
}
```

```javascript
const heapView = new Uint8Array(wasmModule.HEAPU8.buffer, ...); // bound to WASM module heap
const terrain = new Room.Terrain("E2S7");

// Copy terrain data to binary WASM module heap:
for(let y = 0; y < 50; y++)
    for(let x = 0; x < 50; x++)
        heapView[y * 50 + x] = terrain.get(x, y);
```

Get terrain type at the specified room position by `(x,y)` coordinates. Unlike the <a href="#Game.map.getTerrainAt">`Game.map.getTerrainAt(...)`</a> method, this one doesn't perform any string operations and returns integer terrain type values (see below).

{% api_method_params %}
x : number
X position in the room.
===
y : number
Y position in the room.
{% endapi_method_params %}

### Return value

One of the following integer values:

| value | <a href="#Constants">constant</a> (*if exists*) | description |
|-|-|-|
| 0 | *doesn't exist* | terrain is `plain` |
| 1 | `TERRAIN_MASK_WALL` | terrain is `wall`|
| 2 | `TERRAIN_MASK_SWAMP` | terrain is `swamp`|


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
const heapView = new Uint8Array(wasmModule.HEAPU8.buffer, ...); // bound to WASM module heap
const terrain = new Room.Terrain("E2S7");

// Fast direct copy terrain data to binary WASM module heap:
const t = Game.cpu.getUsed();
const result = terrain.getRawBuffer(heapView);
if(result !== ERR_INVALID_ARGS) {
    // Copy succeeded, call WASM functions here:
    // wasmModule.myFunc(...); // modifies raw memory of "heapView"
    console.log("Distance transform done in", Game.cpu.getUsed() - t);
    myPrintRawTerain(heapView);
}
```

```cpp
// Somewhere inside binary module source code...
void myFunc(void* ptr) {
    auto u8ptr = static_cast<uint8_t*>(ptr);
    // computations here...
}
```

Get copy of underlying static terrain buffer. **Current underlying representation is `Uint8Array`**.

{% api_method_params %}
destinationArray (optional) : Uint8Array
A typed array view in which terrain will be copied to.
{% endapi_method_params %}

***WARNING:*** *this method relies on underlying representation of terrain data. This is the fastest way to obtain terrain data of the whole room (2500 tiles), but users should keep in mind that it can be marked as deprecated anytime in the future, or return value type can be changed due to underlying data representation changing.*

See usage examples. Learn more about <a href="/modules.html#Binary-modules">_binary modules_</a>.

### Return value

Copy of underlying room terrain representations as a new `Uint8Array` [typed array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) of size 2500.

Each element is an integer number, terrain type can be obtained by applying bitwise AND (`&`) operator with appropriate `TERRAIN_MASK_*` constant. Room tiles are stored **row by row**.

If `destinationArray` is specified, function returns reference to this filled `destinationArray` if coping succeeded, or error code otherwise:

{% api_return_codes %}
ERR_INVALID_ARGS | `destinationArray` type is incompatible.
{% endapi_return_codes %}
