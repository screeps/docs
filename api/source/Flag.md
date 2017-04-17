# Flag

A flag. Flags can be used to mark particular spots in a room. Flags are visible to their owners only. You cannot have more than 10,000 flags.

{% page inherited/RoomObject.md %}
 
{% api_property color number %}

Flag primary color. One of the <code>COLOR_*</code> constants.



{% api_property memory any %}



A shorthand to <code>Memory.flags[flag.name]</code>. You can use it for quick access the flag's specific memory data object.



{% api_property name string %}

 

Flag’s name. You can choose the name while creating a new flag, and it cannot be changed later. This name is a hash key to access the flag via the <a href="#Game.flags">Game.flags</a> object. The maximum name length is 60 charactes.



{% api_property secondaryColor number %}



Flag secondary color. One of the <code>COLOR_*</code> constants.



{% api_method remove '' A %}



Remove the flag.



### Return value

Always returns
OK
.

{% api_method setColor 'color, [secondaryColor]' A %}

```javascript
Game.flags.Flag1.setColor(COLOR_GREEN, COLOR_WHITE);
```

Set new color of the flag.

{% api_method_params %}
color : string
Primary color of the flag. One of the <code>COLOR_*</code> constants.
===
secondaryColor (optional) : string
Secondary color of the flag. One of the <code>COLOR_*</code> constants.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_INVALID_ARGS | <code>color</code> is not a valid color constant.
{% endapi_return_codes %}



{% api_method setPosition 'x,y|pos' A %}

```javascript
Game.flags.Flag1.setPosition(10,20);
```

```javascript
Game.flags.Flag1.setPosition( new RoomPosition(10, 20, 'W3S5') );
```

Set new position of the flag.

{% api_method_params %}
x : number
The X position in the room.
===
y : number
The Y position in the room.
===
pos : object
Can be a <a href="#RoomPosition">RoomPosition</a> object or any object containing <a href="#RoomPosition">RoomPosition</a>.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_INVALID_TARGET | The target provided is invalid.
{% endapi_return_codes %}


