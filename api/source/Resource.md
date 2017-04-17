# Resource 

A dropped piece of resource. It will decay after a while if not picked up. 
Dropped resource pile decays for `ceil(amount/1000)` units per tick. 

{% page inherited/RoomObject.md %}

{% api_property amount 'number' %}



The amount of resource units containing.



{% api_property id 'string' %}



A unique object identificator. You can use <a href="#Game.getObjectById"><code>Game.getObjectById</code></a> method to retrieve an object instance by its <code>id</code>.



{% api_property resourceType 'string' %}



One of the <code>RESOURCE_*</code> constants.


