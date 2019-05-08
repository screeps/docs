# OwnedStructure

存在拥有者的建筑的基础原型。
这类建筑可以被用`FIND_MY_STRUCTURES`或`FIND_HOSTILE_STRUCTURES`找到。

{% page inherited/Structure.md %}  

{% api_property my 'boolean' %}



是否是你拥有的建筑。



{% api_property owner 'object' %}



建筑所有者信息，一个包含如下属性的对象：

{% api_method_params %}
username : string
所有者姓名。
{% endapi_method_params %}

