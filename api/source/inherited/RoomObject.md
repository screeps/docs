{% api_property RoomObject:effects array %}
Applied effects, an array of objects with the following properties:

{% api_method_params %}
effect : number
Effect ID of the applied effect. Can be either natural effect ID or Power ID.
===
level (optional) : number 
Power level of the applied effect. Absent if the effect is not a Power effect.
===
ticksRemaining : number
How many ticks will the effect last.
{% endapi_method_params %}


{% api_property RoomObject:pos '<a href="#RoomPosition">RoomPosition</a>' %}



An object representing the position of this object in the room.



{% api_property RoomObject:room '<a href="#Room">Room</a>' %}



The link to the Room object. May be undefined in case if an object is a flag or a construction site and is placed in a room that is not visible to you.

