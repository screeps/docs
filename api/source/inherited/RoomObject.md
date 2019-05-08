{% api_property RoomObject:effects array %}
附加的效果，一个对象数组包含如下属性：

{% api_method_params %}
power : number
效果的超能ID。
===
level : number
效果的超能。
===
ticksRemaining : number
多长时间之后会失去这个效果。
{% endapi_method_params %}


{% api_property RoomObject:pos '<a href="#RoomPosition">RoomPosition</a>' %}



表示该对象在房间中的坐标的对象。



{% api_property RoomObject:room '<a href="#Room">Room</a>' %}



Room对象的链接。如果对象是标志或工地并且放置在你不可见的房间中，则可能为undefined。

