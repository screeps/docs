# ConstructionSite

一个正在建设中的工地。可以使用游戏界面右侧的'Construct'按钮创建工地或[`Room.createConstructionSite`](#Room.createConstructionSite)方法。

要在工地建造一个建筑，需要给工人creep一些能量并执行[`Creep.build`](#Creep.build)动作。

如果想移除敌人的工地，只需让一个creep踩在上面即可。

{% page inherited/RoomObject.md %} 

{% api_property id string %}
 


全局唯一的对象标识。你可以通过调用<a href="#Game.getObjectById"><code>Game.getObjectById</code></a>方法取得对象实例。



{% api_property my boolean %}



你是否拥有这个工地。



{% api_property owner object %}



建筑所有者信息，一个包含如下属性的对象：

{% api_method_params %}
username : string
所有者姓名。
{% endapi_method_params %}


{% api_property progress number %}



当前建造进度。



{% api_property progressTotal number %}



完成建造所需的建造总进度。



{% api_property structureType string %}



<code>STRUCTURE_*</code>常量之一。



{% api_method remove '' A %}



删除这个工地。



### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个工地的拥有者，或者这不是你的房间。
{% endapi_return_codes %}


