{% api_property effects array %}
附加的效果，一个包含如下属性的对象数组：

{% api_method_params %}
effect : number
该附加效果的 ID。可以是自然效果 ID 或者 Power ID。
===
level (可选) : number 
该附加效果的 Power 等级。如果效果不是 Power 效果则不存在该属性。
===
ticksRemaining : number
多长时间之后会失去这个效果。
{% endapi_method_params %}


{% api_property RoomObject:pos '<a href="#RoomPosition">RoomPosition</a>' %}



表示该对象在房间中的坐标的对象。



{% api_property RoomObject:room '<a href="#Room">Room</a>' %}



Room对象的链接。如果对象是标志或工地并且放置在你不可见的房间中，则可能为undefined。

