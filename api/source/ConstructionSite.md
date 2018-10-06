# ConstructionSite

A site of a structure which is currently under construction. A construction site can be created using the 'Construct' button at the left of the game field or the [`Room.createConstructionSite`](#Room.createConstructionSite) method.

To build a structure on the construction site, give a worker creep some amount of energy and perform [`Creep.build`](#Creep.build) action.

You can remove enemy construction sites by moving a creep on it.

{% page inherited/RoomObject.md %} 

{% api_property id string %}
 


A unique object identificator. You can use <a href="#Game.getObjectById"><code>Game.getObjectById</code></a> method to retrieve an object instance by its <code>id</code>.



{% api_property my boolean %}



Whether this is your own construction site.



{% api_property owner object %}



An object with the structure’s owner info containing the following properties:

{% api_method_params %}
username : string
The name of the owner user.
{% endapi_method_params %}


{% api_property progress number %}



The current construction progress.



{% api_property progressTotal number %}



The total construction progress needed for the structure to be built.



{% api_property structureType string %}



One of the <code>STRUCTURE_*</code> constants.



{% api_method remove '' A %}



Remove the construction site.



### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this construction site, and it's not in your room.
{% endapi_return_codes %}


