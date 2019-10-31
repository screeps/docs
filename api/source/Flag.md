# Flag

一个旗帜，旗帜可以用来标记房间中的一个特定的地点。旗帜只对其所有者可见。你最多只能拥有 10,000 个旗帜。

{% page inherited/RoomObject.md %}
 
{% api_property color number %}

旗帜的主要颜色。<code>COLOR_*</code> 常量之一。



{% api_property memory any %}



指向 <code>Memory.flags[flag.name]</code> 的链接。你可以使用它来快速访问到该旗帜的内存数据对象。



{% api_property name string %}

 

旗帜的名称。你可以在创建新的旗帜时为其指定名字，名字一旦确定无法修改。此名称是 <a href="#Game.flags">Game.flags</a> 对象中指向该旗帜对象的哈希键。你可以使用它来快速访问到该旗帜。名称最长不能超过 60 字符。



{% api_property secondaryColor number %}



旗帜的次要颜色。<code>COLOR_*</code> 常量之一。



{% api_method remove '' A %}



移除该旗帜。



### 返回值

永远返回
OK
。

{% api_method setColor 'color, [secondaryColor]' A %}

```javascript
Game.flags.Flag1.setColor(COLOR_GREEN, COLOR_WHITE);
```

给旗帜设置一个新颜色

{% api_method_params %}
color : string
旗帜的主要颜色。<code>COLOR_*</code> 常量之一。
===
secondaryColor (optional) : string
旗帜的次要颜色。<code>COLOR_*</code> 常量之一。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_INVALID_ARGS | <code>color</code> 或者 <code>secondaryColor</code> 不是一个有效的 <code>COLOR_*</code> 常量。
{% endapi_return_codes %}



{% api_method setPosition 'x,y|pos' A %}

```javascript
Game.flags.Flag1.setPosition(10,20);
```

```javascript
Game.flags.Flag1.setPosition( new RoomPosition(10, 20, 'W3S5') );
```

给旗帜设置一个新的位置。

{% api_method_params %}
x : number
相同房间内的 x 坐标。
===
y : number
相同房间内的 y 坐标。
===
pos : object
可以是 <a href="#RoomPosition">RoomPosition</a> 对象或者任何包含 <a href="#RoomPosition">RoomPosition</a> 属性的对象。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_INVALID_TARGET | 提供了无效的目标。
{% endapi_return_codes %}


