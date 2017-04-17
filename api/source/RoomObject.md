# RoomObject

Any object with a position in a room. Almost all game objects prototypes are derived from `RoomObject`.

{% api_property pos '<a href="#RoomPosition">RoomPosition</a>' %}
 


An object representing the position of this object in the room.



{% api_property room '<a href="#Room">Room</a>' %}



The link to the Room object. May be undefined in case if an object is a flag or a construction site and is placed in a room that is not visible to you.


