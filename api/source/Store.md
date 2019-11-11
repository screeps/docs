# Store

一个代表了其存储中资源的对象。

游戏中有两种类型的 store：通用型 store 和限定型 store。

* 通用型 store 可以储存任意类型的资源 (例如: creep, 容器(containers), 存储(storages), 终端(terminals))。

* 限定型 store 只能储存该对象所需的几种特定资源 (例如: spawn, 拓展(extension), 实验室(lab), 核弹(nuker))。

两种 `Store` 的原型都是相同的，但是其返回值取决于调用方法时传入的 `resource` 参数。

你可以把资源的类型当做对象属性来获取对应的资源:

```javascript-content
console.log(creep.store[RESOURCE_ENERGY]);
```   



{% api_method getCapacity '[resource]' 0 %}

```javascript
if(creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()) {
    goHarvest(creep);
}
```

返回指定资源的存储容量, 当 `reource` 参数为 undefined 则返回总容量。

{% api_method_params %}
resource (可选) : string
资源的类型
{% endapi_method_params %}


### 返回值

返回存储的数量, 当 `resource` 参数不是一个有效的存储类型时返回 `null`。

{% api_method getFreeCapacity '[resource]' 0 %}

```javascript
if(structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
    creep.transfer(structure, RESOURCE_ENERGY);
}
```
`getCapacity(resource) - getUsedCapacity(resource)` 的简写。

{% api_method getUsedCapacity '[resource]' 0 %}

```javascript
if(Game.rooms['W1N1'].terminal.store.getUsedCapacity() == 0) {
    // terminal is empty
}
```
返回指定资源已使用的容量, 若为通用型存储时, `reource` 参数不存在则返回总使用容量。

{% api_method_params %}
resource (可选) : string
资源的类型
{% endapi_method_params %}


### 返回值

返回已使用的容量, 当 `resource` 参数不是一个有效的存储类型时返回 `null`。
