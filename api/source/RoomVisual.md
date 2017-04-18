# RoomVisual

<img align="right" src="img/visual.png">

Room visuals provide a way to show various visual debug info in game rooms. 
You can use the `RoomVisual` object to draw simple shapes that are visible only to you. 
Every existing `Room` object already contains the 
[`visual`](#Room.visual) property, 
but you also can create new `RoomVisual` objects for any room (even without visibility) 
using the [constructor](#RoomVisual.constructor).

Room visuals are not stored in the database, their only purpose is to display something in 
your browser. All drawings will persist for one tick and will disappear if not updated. All 
`RoomVisual` API calls have no added CPU cost (their cost is natural and mostly related to simple
 `JSON.serialize` calls). However, there is a usage limit: you cannot post more than 500 KB 
 of serialized data per one room (see [`getSize`](#RoomVisual.getSize) method).

All draw coordinates are measured in game coordinates and centered to tile centers, i.e. (10,10) 
will point to the center of the creep at `x:10; y:10` position. Fractional coordinates are allowed.



{% api_method constructor '[roomName]' 0 %}

```javascript
Game.rooms['W10N10'].visual.circle(10,20).line(0,0,10,20);
// the same as:
new RoomVisual('W10N10').circle(10,20).line(0,0,10,20);
```

```javascript
// this text will be displayed in all rooms
new RoomVisual().text('Some text', 1, 1, {align: 'left'}); 
```

You can directly create new <code>RoomVisual</code> object in any room, even if it's invisible to your script.

{% api_method_params %}
roomName (optional) : string
The room name. If undefined, visuals will be posted to all rooms simultaneously.
{% endapi_method_params %}



{% api_property roomName 'string' %}



The name of the room.





{% api_method line 'x1, y1, x2, y2, [style]|pos1, pos2, [style]' 0 %}

```javascript
new RoomVisual('W1N1').line(10,15, 20,20);
```

```javascript
creep.room.visual.line(creep.pos, target.pos,
    {color: 'red', style: 'dashed'});
```

Draw a line.

{% api_method_params %}
x1 : number
The start X coordinate.
===
y1 : number
The start Y coordinate.
===
x2 : number
The finish X coordinate.
===
y2 : number
The finish Y coordinate.
===
pos1 : <a href="#RoomPosition">RoomPosition</a>
The start position object.
===
pos2 : <a href="#RoomPosition">RoomPosition</a>
The finish position object.
===
style (optional) : object
An object with the following properties:
<ul>
    <li>
        <div class="api-arg-title">width</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">Line width, default is 0.1.</div>
    </li>
    <li>
        <div class="api-arg-title">color</div>
        <div class="api-arg-type">string</div>
        <div class="api-arg-desc">Line color in any web format, default is <code>#ffffff</code> (white).</div>
    </li>
    <li>
        <div class="api-arg-title">opacity</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">Opacity value, default is 0.5.</div>
    </li>
    <li>
        <div class="api-arg-title">lineStyle</div>
        <div class="api-arg-type">string</div>
        <div class="api-arg-desc">Either <code>undefined</code> (solid line), <code>dashed</code>, or <code>dotted</code>. Default is undefined.</div>
    </li>
</ul>
				
{% endapi_method_params %}


### Return value

The
<code>RoomVisual</code>
object itself, so that you can chain calls.

{% api_method circle 'x, y, [style]|pos, [style]' 0 %}

```javascript
new RoomVisual('W1N1').circle(10,15);
```

```javascript
creep.room.visual.circle(creep.pos,
    {fill: 'transparent', radius: 0.55, stroke: 'red'});
```

Draw a circle.

{% api_method_params %}
x : number
The X coordinate of the center.
===
y : number
The Y coordinate of the center.
===
pos : <a href="#RoomPosition">RoomPosition</a>
The position object of the center.
===
style (optional) : object
An object with the following properties:
<ul>
    <li>
        <div class="api-arg-title">radius</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">Circle radius, default is 0.15.</div>
    </li>
    <li>
        <div class="api-arg-title">fill</div>
        <div class="api-arg-type">string</div>
        <div class="api-arg-desc">Fill color in any web format, default is <code>#ffffff</code> (white).</div>
    </li>
    <li>
        <div class="api-arg-title">opacity</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">Opacity value, default is 0.5.</div>
    </li>
    <li>
        <div class="api-arg-title">stroke</div>
        <div class="api-arg-type">string</div>
        <div class="api-arg-desc">Stroke color in any web format, default is undefined (no stroke).</div>
    </li>
    <li>
        <div class="api-arg-title">strokeWidth</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">Stroke line width, default is 0.1.</div>
    </li>
    <li>
        <div class="api-arg-title">lineStyle</div>
        <div class="api-arg-type">string</div>
        <div class="api-arg-desc">Either <code>undefined</code> (solid line), <code>dashed</code>, or <code>dotted</code>. Default is undefined.</div>
    </li>
</ul>
				
{% endapi_method_params %}


### Return value

The
<code>RoomVisual</code>
object itself, so that you can chain calls.

{% api_method rect 'x, y, width, hheight, [style]|topLeftPos, width, height, [style]' 0 %}

```javascript
// 9x9 area from (2,2) to (10,10)
new RoomVisual('W1N1').rect(1.5, 1.5, 9, 9); 
```

```javascript
// a rectangle border on creep
creep.room.visual.rect(creep.pos.x - 0.6, creep.pos.y - 0.6, 
    1.2, 1.2,
    {fill: 'transparent', stroke: '#f00'});
```

Draw a rectangle.

{% api_method_params %}
x : number
The X coordinate of the top-left corner.
===
y : number
The Y coordinate of the top-left corner.
===
topLeftPos : <a href="#RoomPosition">RoomPosition</a>
The position object of the top-left corner.
===
width : number
The width of the rectangle.
===
height : number
The height of the rectangle.
===
style (optional) : object
An object with the following properties:
<ul>
    <li>
        <div class="api-arg-title">fill</div>
        <div class="api-arg-type">string</div>
        <div class="api-arg-desc">Fill color in any web format, default is <code>#ffffff</code> (white).</div>
    </li>
    <li>
        <div class="api-arg-title">opacity</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">Opacity value, default is 0.5.</div>
    </li>
    <li>
        <div class="api-arg-title">stroke</div>
        <div class="api-arg-type">string</div>
        <div class="api-arg-desc">Stroke color in any web format, default is undefined (no stroke).</div>
    </li>
    <li>
        <div class="api-arg-title">strokeWidth</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">Stroke line width, default is 0.1.</div>
    </li>
    <li>
        <div class="api-arg-title">lineStyle</div>
        <div class="api-arg-type">string</div>
        <div class="api-arg-desc">Either <code>undefined</code> (solid line), <code>dashed</code>, or <code>dotted</code>. Default is undefined.</div>
    </li>
</ul>
				
{% endapi_method_params %}


### Return value

The
<code>RoomVisual</code>
object itself, so that you can chain calls.

{% api_method poly 'points, [style]' 0 %}

```javascript
const points = [];
points.push(creep1.pos);
points.push([10,15]);
points.push(new RoomPosition(20,21,'W1N1'));
new RoomVisual('W1N1').poly(points, {fill: 'aqua'}); 
```

```javascript
// visualize the path
const path = Game.rooms['W1N1'].findPath(from, to);
new RoomVisual('W1N1').poly(path, {stroke: '#fff', strokeWidth: .15,
	opacity: .2, lineStyle: 'dashed'}); 
```

Draw a polyline.

{% api_method_params %}
points : array
An array of points. Every item should be either an array with 2 numbers (i.e. <code>[10,15]</code>), or a <a href="#RoomPosition"><code>RoomPosition</code></a> object.
===
style (optional) : object
An object with the following properties:
					<ul>
						<li>
							<div class="api-arg-title">fill</div>
							<div class="api-arg-type">string</div>
							<div class="api-arg-desc">Fill color in any web format, default is <code>undefined</code> (no fill).</div>
						</li>
						<li>
							<div class="api-arg-title">opacity</div>
							<div class="api-arg-type">number</div>
							<div class="api-arg-desc">Opacity value, default is 0.5.</div>
						</li>
						<li>
							<div class="api-arg-title">stroke</div>
							<div class="api-arg-type">string</div>
							<div class="api-arg-desc">Stroke color in any web format, default is <code>#ffffff</code> (white).</div>
						</li>
						<li>
							<div class="api-arg-title">strokeWidth</div>
							<div class="api-arg-type">number</div>
							<div class="api-arg-desc">Stroke line width, default is 0.1.</div>
						</li>
						<li>
							<div class="api-arg-title">lineStyle</div>
							<div class="api-arg-type">string</div>
							<div class="api-arg-desc">Either <code>undefined</code> (solid line), <code>dashed</code>, or <code>dotted</code>. Default is undefined.</div>
						</li>
					</ul>
				
{% endapi_method_params %}


### Return value

The
<code>RoomVisual</code>
object itself, so that you can chain calls.

{% api_method text 'text, x, y, [style]|text, pos, [style]' 0 %}

```javascript
new RoomVisual('W1N1').text("Target💥", 10, 15, {color: 'green', font: 0.8}); 
```

Draw a text label. You can use any valid Unicode characters, including <a href="http://unicode.org/emoji/charts/emoji-style.txt" target="_blank">emoji</a>.

{% api_method_params %}
text : string
The text message.
===
x : number
The X coordinate of the label baseline point.
===
y : number
The Y coordinate of the label baseline point.
===
pos : <a href="#RoomPosition">RoomPosition</a>
The position object of the label baseline.
===
style (optional) : object
An object with the following properties:
					<ul>
						<li>
							<div class="api-arg-title">color</div>
							<div class="api-arg-type">string</div>
							<div class="api-arg-desc">Font color in any web format, default is <code>#ffffff</code> (white).</div>
						</li>
						<li>
							<div class="api-arg-title">font</div>
							<div class="api-arg-type">number, string</div>
							<div class="api-arg-desc">Either a number or a string in one of the following forms:
								<ul>
									<li><code>0.7</code> - relative size in game coordinates</li>
									<li><code>20px</code> - absolute size in pixels</li>
									<li><code>0.7 serif</code></li>
									<li><code>bold italic 1.5 Times New Roman</code></li>
								</ul>
							</div>
						</li>
						<li>
							<div class="api-arg-title">stroke</div>
							<div class="api-arg-type">string</div>
							<div class="api-arg-desc">Stroke color in any web format, default is undefined (no stroke).</div>
						</li>
						<li>
							<div class="api-arg-title">strokeWidth</div>
							<div class="api-arg-type">number</div>
							<div class="api-arg-desc">Stroke width, default is 0.15.</div>
						</li>
						<li>
							<div class="api-arg-title">background</div>
							<div class="api-arg-type">string</div>
							<div class="api-arg-desc">Background color in any web format, default is undefined (no background). When background is enabled, text vertical align is set to middle (default is baseline).</div>
						</li>
						<li>
							<div class="api-arg-title">backgroundPadding</div>
							<div class="api-arg-type">number</div>
							<div class="api-arg-desc">Background rectangle padding, default is 0.3.</div>
						</li>
						<li>
							<div class="api-arg-title">align</div>
							<div class="api-arg-type">string</div>
							<div class="api-arg-desc">Text align, either <code>center</code>, <code>left</code>, or <code>right</code>. Default is <code>center</code>.</div>
						</li>
						<li>
							<div class="api-arg-title">opacity</div>
							<div class="api-arg-type">number</div>
							<div class="api-arg-desc">Opacity value, default is 1.0.</div>
						</li>
					</ul>
				
{% endapi_method_params %}


### Return value

The
<code>RoomVisual</code>
object itself, so that you can chain calls.

{% api_method clear '' 0 %}

```javascript
new RoomVisual('W1N1').clear();
```

Remove all visuals from the room.



### Return value

The
<code>RoomVisual</code>
object itself, so that you can chain calls.

{% api_method getSize '' 0 %}

```javascript
if(creep.room.visual.getSize() >= 512000) {
    // cannot add more visuals in this tick
}
```

Get the stored size of all visuals added in the room in the current tick. It must not exceed 512,000 (500 KB).



### Return value

The size of the visuals in bytes.
