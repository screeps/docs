# RoomObject

房间中所有具有坐标的对象。几乎所有的游戏对象原型都是从`RoomObject`派生出来的。

{% api_property effects array %}
附加的效果，一个对象数组包含如下属性：

{% api_method_params %}
power : number
被应用的效果id。可以是自然效果或者超能效果。
===
level : number
被应用的效果等级。如果不是超能效果的话则不存在。
===
ticksRemaining : number
多长时间之后会失去这个效果。
{% endapi_method_params %}

{% api_property pos '<a href="#RoomPosition">RoomPosition</a>' %}
 


表示该对象在房间中的坐标的对象。



{% api_property room '<a href="#Room">Room</a>' %}



Room对象的链接。如果对象是标志或工地并且放置在你不可见的房间中，则可能为 undefined。


