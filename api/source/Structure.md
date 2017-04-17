# Structure

The base prototype object of all structures.

{% page inherited/RoomObject.md %}

{% api_property hits 'number' %}



The current amount of hit points of the structure.



{% api_property hitsMax 'number' %}



The total amount of hit points of the structure.



{% api_property id 'string' %}



A unique object identificator. You can use <a href="#Game.getObjectById"><code>Game.getObjectById</code></a> method to retrieve an object instance by its <code>id</code>.



{% api_property structureType 'string' %}



One of the <code>STRUCTURE_*</code> constants.



{% api_method destroy '' A %}



Destroy this structure immediately.



### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this structure.
ERR_BUSY | Hostile creeps are in the room.
{% endapi_return_codes %}



{% api_method isActive '' 2 %}



Check whether this structure can be used. If room controller level is insufficient, then this method will return false, and the structure will be highlighted with red in the game.



### Return value

A boolean value.

{% api_method notifyWhenAttacked 'enabled' A %}



Toggle auto notification when the structure is under attack. The notification will be sent to your account email. Turned on by default.

{% api_method_params %}
enabled : boolean
Whether to enable notification or disable.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_NOT_OWNER | You are not the owner of this structure.
ERR_INVALID_ARGS | <code>enable</code> argument is not a boolean value.
{% endapi_return_codes %}


