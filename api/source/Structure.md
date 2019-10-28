# Structure

所有建筑的基础原型对象。

{% page inherited/RoomObject.md %}

{% api_property hits 'number' %}



当前这个建筑的当前生命值。



{% api_property hitsMax 'number' %}



这个建筑的最大生命值。



{% api_property id 'string' %}



一个唯一的对象标识。你可以使用<a href="#Game.getObjectById"><code>Game.getObjectById</code></a>方法获取对象实例。



{% api_property structureType 'string' %}



<code>STRUCTURE_*</code>常量之一。



{% api_method destroy '' A %}



立即摧毁这个建筑。



### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个建筑的拥有者，或者不在你的房间中。
ERR_BUSY | 敌对creep在这个房间中。
{% endapi_return_codes %}



{% api_method isActive '' 2 %}



检查这个建筑是否可用。如果房间控制等级不足，这个方法会返回false，并且这个建筑会在游戏中红色高亮。



### 返回值

布尔值。

{% api_method notifyWhenAttacked 'enabled' A %}



切换这个建筑受到攻击时的自动通知。通知会发送到你的账户邮箱。默认开启。

{% api_method_params %}
enabled : boolean
是否启用通知。
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个建筑的拥有者。
ERR_INVALID_ARGS | <code>enable</code>参数不是一个布尔值。
{% endapi_return_codes %}


