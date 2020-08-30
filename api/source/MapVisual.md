# Game.map.visual

Map visuals provide a way to show various visual debug info on the game map. You can use the `Game.map.visual` object to draw simple shapes that are visible only to you. 

Map visuals are not stored in the database, their only purpose is to display something in your browser. All drawings will persist for one tick and will disappear if not updated. All `Game.map.visual` calls have no added CPU cost (their cost is natural and mostly related to simple `JSON.serialize` calls). However, there is a usage limit: you cannot post more than 1000 KB of serialized data. 

All draw coordinates are measured in global game coordinates ([`RoomPosition`](#RoomPosition)).


{% api_method line 'pos1, pos2, [style]' 0 %}

```javascript
Game.map.visual.line(creep.pos, target.pos,
    {color: 'red', lineStyle: 'dashed'});
```

Draw a line.

{% api_method_params %}
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
        <div class="api-arg-desc">Line color in the following format: <code>#ffffff</code> (hex triplet). Default is #ffffff.</div>
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

The <code>MapVisual</code> object itself, so that you can chain calls.


{% api_method circle 'pos, [style]' 0 %}

```javascript
Game.map.visual.circle(new RoomPosition(25,25,'E2S7'));
```

```javascript
creep.room.visual.circle(nuker.pos,
    {fill: 'transparent', radius: NUKE_RANGE*50, stroke: 'red'});
```

Draw a circle.

{% api_method_params %}
pos : <a href="#RoomPosition">RoomPosition</a>
The position object of the center.
===
style (optional) : object
An object with the following properties:
<ul>
    <li>
        <div class="api-arg-title">radius</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">Circle radius, default is 10.</div>
    </li>
    <li>
        <div class="api-arg-title">fill</div>
        <div class="api-arg-type">string</div>
        <div class="api-arg-desc">Fill color in the following format: <code>#ffffff</code> (hex triplet). Default is #ffffff.</div>
    </li>
    <li>
        <div class="api-arg-title">opacity</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">Opacity value, default is 0.5.</div>
    </li>
    <li>
        <div class="api-arg-title">stroke</div>
        <div class="api-arg-type">string</div>
        <div class="api-arg-desc">Stroke color in the following format: <code>#ffffff</code> (hex triplet). Default is undefined (no stroke).</div>
    </li>
    <li>
        <div class="api-arg-title">strokeWidth</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">Stroke line width, default is 0.5.</div>
    </li>
    <li>
        <div class="api-arg-title">lineStyle</div>
        <div class="api-arg-type">string</div>
        <div class="api-arg-desc">Either <code>undefined</code> (solid line), <code>dashed</code>, or <code>dotted</code>. Default is undefined.</div>
    </li>
</ul>
				
{% endapi_method_params %}


### Return value

The <code>MapVisual</code> object itself, so that you can chain calls.


{% api_method rect 'topLeftPos, width, height, [style]' 0 %}

```javascript
// 9x9 area from (2,2) to (10,10)
Game.map.visual.rect(new RoomPosition(2,2,'E2S7'), 9, 9); 
```

```javascript
// the max efficiency area of the tower
Game.map.visual.rect(new RoomPosition(tower.pos.x - 5, tower.pos.y - 5, tower.pos.roomName), 
    11, 11,
    {fill: 'transparent', stroke: '#f00'});
```

Draw a rectangle.

{% api_method_params %}
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
        <div class="api-arg-desc">Fill color in the following format: <code>#ffffff</code> (hex triplet). Default is #ffffff.</div>
    </li>
    <li>
        <div class="api-arg-title">opacity</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">Opacity value, default is 0.5.</div>
    </li>
    <li>
        <div class="api-arg-title">stroke</div>
        <div class="api-arg-type">string</div>
        <div class="api-arg-desc">Stroke color in the following format: <code>#ffffff</code> (hex triplet). Default is undefined (no stroke).</div>
    </li>
    <li>
        <div class="api-arg-title">strokeWidth</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">Stroke line width, default is 0.5.</div>
    </li>
    <li>
        <div class="api-arg-title">lineStyle</div>
        <div class="api-arg-type">string</div>
        <div class="api-arg-desc">Either <code>undefined</code> (solid line), <code>dashed</code>, or <code>dotted</code>. Default is undefined.</div>
    </li>
</ul>
				
{% endapi_method_params %}


### Return value

The <code>MapVisual</code> object itself, so that you can chain calls.


{% api_method poly 'points, [style]' 0 %}

```javascript
const points = [];
points.push(creep1);
points.push(Game.rooms.E2S7.storage.pos);
points.push(new RoomPosition(20,21,'W1N1'));
Game.map.visual.poly(points, {fill: 'aqua'}); 
```

```javascript
// visualize the path
const path = PathFinder.search(from, to).path;
Game.map.visual.poly(path, {stroke: '#fff', strokeWidth: .15,
	opacity: .2, lineStyle: 'dashed'}); 
```

Draw a polyline.

{% api_method_params %}
points : array
An array of points. Every item should be a <a href="#RoomPosition"><code>RoomPosition</code></a> object.
===
style (optional) : object
An object with the following properties:
					<ul>
						<li>
							<div class="api-arg-title">fill</div>
							<div class="api-arg-type">string</div>
							<div class="api-arg-desc">Fill color in the following format: <code>#ffffff</code> (hex triplet). Default is <code>undefined</code> (no fill).</div>
						</li>
						<li>
							<div class="api-arg-title">opacity</div>
							<div class="api-arg-type">number</div>
							<div class="api-arg-desc">Opacity value, default is 0.5.</div>
						</li>
						<li>
							<div class="api-arg-title">stroke</div>
							<div class="api-arg-type">string</div>
							<div class="api-arg-desc">Stroke color in the following format: <code>#ffffff</code> (hex triplet). Default is #ffffff.</div>
						</li>
						<li>
							<div class="api-arg-title">strokeWidth</div>
							<div class="api-arg-type">number</div>
							<div class="api-arg-desc">Stroke line width, default is 0.5.</div>
						</li>
						<li>
							<div class="api-arg-title">lineStyle</div>
							<div class="api-arg-type">string</div>
							<div class="api-arg-desc">Either <code>undefined</code> (solid line), <code>dashed</code>, or <code>dotted</code>. Default is undefined.</div>
						</li>
					</ul>
				
{% endapi_method_params %}


### Return value

The <code>MapVisual</code> object itself, so that you can chain calls.


{% api_method text 'text, pos, [style]' 0 %}

```javascript
Game.map.visual.text("Target💥", new RoomPosition(11,14,'E2S7'), {color: '0x00FF00', fontSize: 10}); 
```

Draw a text label. You can use any valid Unicode characters, including <a href="http://unicode.org/emoji/charts/emoji-style.txt" target="_blank">emoji</a>.

{% api_method_params %}
text : string
The text message.
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
							<div class="api-arg-desc">Font color in the following format: <code>#ffffff</code> (hex triplet). Default is #ffffff.</div>
						</li>
						<li>
							<div class="api-arg-title">fontFamily</div>
							<div class="api-arg-type">string</div>
							<div class="api-arg-desc">The font family, default is <code>sans-serif</code></div>
						</li>
						<li>
							<div class="api-arg-title">fontSize</div>
							<div class="api-arg-type">number</div>
							<div class="api-arg-desc">The font size in game coordinates, default is 10</div>
						</li>
						<li>
							<div class="api-arg-title">fontStyle</div>
							<div class="api-arg-type">string</div>
							<div class="api-arg-desc">The font style ('normal', 'italic' or 'oblique')</div>
						</li>
						<li>
							<div class="api-arg-title">fontVariant</div>
							<div class="api-arg-type">string</div>
							<div class="api-arg-desc">The font variant ('normal' or 'small-caps')</div>
						</li>
						<li>
							<div class="api-arg-title">stroke</div>
							<div class="api-arg-type">string</div>
							<div class="api-arg-desc">Stroke color in the following format: <code>#ffffff</code> (hex triplet). Default is undefined (no stroke).</div>
						</li>
						<li>
							<div class="api-arg-title">strokeWidth</div>
							<div class="api-arg-type">number</div>
							<div class="api-arg-desc">Stroke width, default is 0.15.</div>
						</li>
						<li>
							<div class="api-arg-title">backgroundColor</div>
							<div class="api-arg-type">string</div>
							<div class="api-arg-desc">Background color in the following format: <code>#ffffff</code> (hex triplet). Default is undefined (no background). When background is enabled, text vertical align is set to middle (default is baseline).</div>
						</li>
						<li>
							<div class="api-arg-title">backgroundPadding</div>
							<div class="api-arg-type">number</div>
							<div class="api-arg-desc">Background rectangle padding, default is 2.</div>
						</li>
						<li>
							<div class="api-arg-title">align</div>
							<div class="api-arg-type">string</div>
							<div class="api-arg-desc">Text align, either <code>center</code>, <code>left</code>, or <code>right</code>. Default is <code>center</code>.</div>
						</li>
						<li>
							<div class="api-arg-title">opacity</div>
							<div class="api-arg-type">number</div>
							<div class="api-arg-desc">Opacity value, default is 0.5.</div>
						</li>
					</ul>
				
{% endapi_method_params %}


### Return value

The <code>MapVisual</code> object itself, so that you can chain calls.


{% api_method clear '' 0 %}

```javascript
Game.map.visual.clear();
```

Remove all visuals from the map.



### Return value

The <code>MapVisual</code> object itself, so that you can chain calls.


{% api_method getSize '' 0 %}

```javascript
if(Game.map.visual.getSize() >= 1024000) {
    // cannot add more visuals in this tick
}
```

Get the stored size of all visuals added on the map in the current tick. It must not exceed 1024,000 (1000 KB).



### Return value

The size of the visuals in bytes.
