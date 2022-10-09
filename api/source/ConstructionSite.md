# ConstructionSite

A site of a structure which is currently under construction. A construction site can be created using the 'Construct' button at the left of the game field or the [`Room.createConstructionSite`](#Room.createConstructionSite) method.

To build a structure on the construction site, give a worker creep some amount of energy and perform [`Creep.build`](#Creep.build) action.

You can remove enemy construction sites by moving a creep on it.

Following restrictions apply when trying to place new construction sites:

- Nothing can be built on border tiles.
- If an exit is near, only roads and containers can be constructed.
- Only roads can be built on terrain walls.
- Generally, you can only build one structure per tile.\
  *Exception*: Roads and ramparts can be stacked on top of everything.
- You can't build in a room with a hostile controller - a reservation also counts.
- The room controller level (RCL) must be enough to build the structure - see `CONTROLLER_STRUCTURES`.\
  *Note*: If building in a neutral room, the RCL for that room is `0` - allowing only roads and containers to be built.
- There is an upper limit `MAX_CONSTRUCTION_SITES` for the number of construction sites per player at any given moment.

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


