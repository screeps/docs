# Resource 

掉落的资源。 如果没有拿起，它会在一段时间后消失。
掉落的资源以每tick`ceil(amount/1000)`的速度消失。

{% page inherited/RoomObject.md %}

{% api_property amount 'number' %}



资源数量。



{% api_property id 'string' %}



一个唯一的对象标识。你可以使用<a href="#Game.getObjectById"><code>Game.getObjectById</code></a>方法获取对象实例。



{% api_property resourceType 'string' %}



<code>RESOURCE_*</code>常量之一。


