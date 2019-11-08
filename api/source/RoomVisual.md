# RoomVisual

<img align="right" src="img/visual.png">

房间视觉效果提供了在游戏房间中显示可视化调试信息的途径。你可以使用 `RoomVisual` 对象绘制一个仅对您可见的简单图形。每一个已存在的 `Room` 对象都包含有 [`visual`](#Room.visual) 属性，不过您也可以使用 [constructor](#RoomVisual.constructor) 给任何房间创建一个新的 `RoomVisual` 对象（即使没有视野）。

房间视觉效果并不会储存在数据库里，它们的目的仅仅是在您的浏览窗口里显示一些东西。所有绘制的图形只会保留 1 tick，如果后续没有更新的话就会消失。所有的 `RoomVisual` API 调用都不会产生 CPU 消耗（只会产生一些代码执行的自然成本，并且大多与简单的 `JSON.serialize` 调用有关）。然而，这里有一些使用限制：您最多只能为每个房间发布 500 KB 的序列化数据（详见 [`getSize`](#RoomVisual.getSize) 方法）。

所有的绘制坐标均等同于游戏坐标，并且以地块的中心为原点，即：(10, 10) 将指向位于 `x:10; y:10` 处 creep 的中心。允许使用小数坐标。



{% api_method constructor '[roomName]' 0 %}

```javascript
Game.rooms['W10N10'].visual.circle(10,20).line(0,0,10,20);
// 等同于：
new RoomVisual('W10N10').circle(10,20).line(0,0,10,20);
```

```javascript
// 所有房间都会显示该文本：
new RoomVisual().text('Some text', 1, 1, {align: 'left'}); 
```

您可以直接为任何房间创建 <code>RoomVisual</code> 对象，即使您的脚本没有该房间的视野。

{% api_method_params %}
roomName (可选) : string
房间的名称。如果未定义，则该效果将发布到所有房间。
{% endapi_method_params %}



{% api_property roomName 'string' %}



房间的名称。





{% api_method line 'x1, y1, x2, y2, [style]|pos1, pos2, [style]' 0 %}

```javascript
new RoomVisual('W1N1').line(10,15, 20,20);
```

```javascript
creep.room.visual.line(creep.pos, target.pos,
    {color: 'red', lineStyle: 'dashed'});
```

绘制一条线。

{% api_method_params %}
x1 : number
起始点的 X 坐标。
===
y1 : number
起始点的 Y 坐标。
===
x2 : number
结束点的 X 坐标。
===
y2 : number
结束点的 Y 坐标。
===
pos1 : <a href="#RoomPosition">RoomPosition</a>
起始点位置对象。
===
pos2 : <a href="#RoomPosition">RoomPosition</a>
结束点位置对象。
===
style (可选) : object
包含下列属性的对象：
<ul>
    <li>
        <div class="api-arg-title">width</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">线条的宽度，默认值为 0.1。</div>
    </li>
    <li>
        <div class="api-arg-title">color</div>
        <div class="api-arg-type">string</div>
        <div class="api-arg-desc">线条颜色，允许使用任何 web 格式颜色，默认值为 <code>#ffffff</code> (白色)。</div>
    </li>
    <li>
        <div class="api-arg-title">opacity</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">透明度，默认值为 0.5。</div>
    </li>
    <li>
        <div class="api-arg-title">lineStyle</div>
        <div class="api-arg-type">string</div>
        <div class="api-arg-desc"><code>undefined</code> (实线)，<code>dashed</code> (虚线) 或者 <code>dotted</code> (点线) 之一。默认值为 undefined。</div>
    </li>
</ul>
				
{% endapi_method_params %}


### 返回值

该
<code>RoomVisual</code>
对象本身，您可以使用链式调用。

{% api_method circle 'x, y, [style]|pos, [style]' 0 %}

```javascript
new RoomVisual('W1N1').circle(10,15);
```

```javascript
creep.room.visual.circle(creep.pos,
    {fill: 'transparent', radius: 0.55, stroke: 'red'});
```

绘制一个圆。

{% api_method_params %}
x : number
圆心的 X 坐标。
===
y : number
圆心的 Y 坐标。
===
pos : <a href="#RoomPosition">RoomPosition</a>
圆心的位置对象。
===
style (可选) : object
包含下列属性的对象：
<ul>
    <li>
        <div class="api-arg-title">radius</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">圆的半径，默认值为 0.15。</div>
    </li>
    <li>
        <div class="api-arg-title">fill</div>
        <div class="api-arg-type">string</div>
        <div class="api-arg-desc">填充颜色，允许使用任何 web 格式颜色，默认值为 <code>#ffffff</code> (白色)。</div>
    </li>
    <li>
        <div class="api-arg-title">opacity</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">透明度，默认值为 0.5。</div>
    </li>
    <li>
        <div class="api-arg-title">stroke</div>
        <div class="api-arg-type">string</div>
        <div class="api-arg-desc">轮廓颜色，允许使用任何 web 格式颜色，默认未定义（没有轮廓）。</div>
    </li>
    <li>
        <div class="api-arg-title">strokeWidth</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">轮廓宽度，默认值为 0.1。</div>
    </li>
    <li>
        <div class="api-arg-title">lineStyle</div>
        <div class="api-arg-type">string</div>
        <div class="api-arg-desc"><code>undefined</code> (实线)，<code>dashed</code> (虚线) 或者 <code>dotted</code> (点线) 之一。默认值为 undefined。</div>
    </li>
</ul>
				
{% endapi_method_params %}


### 返回值

该
<code>RoomVisual</code>
对象本身，您可以使用链式调用。

{% api_method rect 'x, y, width, height, [style]|topLeftPos, width, height, [style]' 0 %}

```javascript
// 从 (2,2) 到 (10,10) 的 9x9 区域
new RoomVisual('W1N1').rect(1.5, 1.5, 9, 9); 
```

```javascript
// creep 上的矩形边框
creep.room.visual.rect(creep.pos.x - 0.6, creep.pos.y - 0.6, 
    1.2, 1.2,
    {fill: 'transparent', stroke: '#f00'});
```

绘制一个矩形。

{% api_method_params %}
x : number
左上角的 X 坐标。
===
y : number
左上角的 Y 坐标。
===
topLeftPos : <a href="#RoomPosition">RoomPosition</a>
左上角的位置对象。
===
width : number
矩形的宽度。
===
height : number
矩形的高度。
===
style (可选) : object
包含下列属性的对象：
<ul>
    <li>
        <div class="api-arg-title">fill</div>
        <div class="api-arg-type">string</div>
        <div class="api-arg-desc">填充颜色，允许使用任何 web 格式颜色，默认值为 <code>#ffffff</code> (白色)。</div>
    </li>
    <li>
        <div class="api-arg-title">opacity</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">透明度，默认值为 0.5。</div>
    </li>
    <li>
        <div class="api-arg-title">stroke</div>
        <div class="api-arg-type">string</div>
        <div class="api-arg-desc">轮廓颜色，允许使用任何 web 格式颜色，默认未定义（没有轮廓）。</div>
    </li>
    <li>
        <div class="api-arg-title">strokeWidth</div>
        <div class="api-arg-type">number</div>
        <div class="api-arg-desc">轮廓宽度，默认值为 0.1。</div>
    </li>
    <li>
        <div class="api-arg-title">lineStyle</div>
        <div class="api-arg-type">string</div>
        <div class="api-arg-desc"><code>undefined</code> (实线)，<code>dashed</code> (虚线) 或者 <code>dotted</code> (点线) 之一。默认值为 undefined。</div>
    </li>
</ul>
				
{% endapi_method_params %}


### 返回值

该
<code>RoomVisual</code>
对象本身，您可以使用链式调用。

{% api_method poly 'points, [style]' 0 %}

```javascript
const points = [];
points.push(creep1.pos);
points.push([10,15]);
points.push(new RoomPosition(20,21,'W1N1'));
new RoomVisual('W1N1').poly(points, {fill: 'aqua'}); 
```

```javascript
// 将路径可视化
const path = Game.rooms['W1N1'].findPath(from, to);
new RoomVisual('W1N1').poly(path, {stroke: '#fff', strokeWidth: .15,
	opacity: .2, lineStyle: 'dashed'}); 
```

绘制一条折线。

{% api_method_params %}
points : array
折点数组。每个元素都应是两个数字的数组（即 <code>[10,15]</code>），或者是一个 <a href="#RoomPosition"><code>RoomPosition</code></a> 对象。
===
style (可选) : object
包含下列属性的对象：
					<ul>
						<li>
							<div class="api-arg-title">fill</div>
							<div class="api-arg-type">string</div>
							<div class="api-arg-desc">填充颜色，允许使用任何 web 格式颜色，默认值为 <code>undefined</code>（不填充）。</div>
						</li>
						<li>
							<div class="api-arg-title">opacity</div>
							<div class="api-arg-type">number</div>
							<div class="api-arg-desc">透明度，默认值为 0.5。</div>
						</li>
						<li>
							<div class="api-arg-title">stroke</div>
							<div class="api-arg-type">string</div>
							<div class="api-arg-desc">线条颜色，允许使用任何 web 格式颜色，默认值为 <code>#ffffff</code> (白色)。</div>
						</li>
						<li>
							<div class="api-arg-title">strokeWidth</div>
							<div class="api-arg-type">number</div>
							<div class="api-arg-desc">线条宽度，默认值为 0.1。</div>
						</li>
						<li>
							<div class="api-arg-title">lineStyle</div>
							<div class="api-arg-type">string</div>
							<div class="api-arg-desc"><code>undefined</code> (实线)，<code>dashed</code> (虚线) 或者 <code>dotted</code> (点线) 之一。默认值为 undefined。</div>
						</li>
					</ul>
				
{% endapi_method_params %}


### 返回值

该
<code>RoomVisual</code>
对象本身，您可以使用链式调用。

{% api_method text 'text, x, y, [style]|text, pos, [style]' 0 %}

```javascript
new RoomVisual('W1N1').text("Target💥", 10, 15, {color: 'green', font: 0.8}); 
```

绘制一个文本标签。你可以使用任何有效的 Unicode 字符，包括 <a href="http://unicode.org/emoji/charts/emoji-style.txt" target="_blank">emoji</a>。

{% api_method_params %}
text : string
文本信息
===
x : number
文本基线（baseline）起始点的 X 坐标。
===
y : number
文本基线起始点的 Y 坐标。
===
pos : <a href="#RoomPosition">RoomPosition</a>
文本基线起始点的位置对象。
===
style (可选) : object
包含下列属性的对象：
					<ul>
						<li>
							<div class="api-arg-title">color</div>
							<div class="api-arg-type">string</div>
							<div class="api-arg-desc">字体颜色，允许使用任何 web 格式颜色，默认值为 <code>#ffffff</code> (白色)。</div>
						</li>
						<li>
							<div class="api-arg-title">font</div>
							<div class="api-arg-type">number, string</div>
							<div class="api-arg-desc">数字或者字符串，应使用下列形式：
								<ul>
									<li><code>0.7</code> - 基于游戏坐标的相对大小</li>
									<li><code>20px</code> - 基于像素的绝对大小</li>
									<li><code>0.7 serif</code></li>
									<li><code>bold italic 1.5 Times New Roman</code></li>
								</ul>
							</div>
						</li>
						<li>
							<div class="api-arg-title">stroke</div>
							<div class="api-arg-type">string</div>
							<div class="api-arg-desc">轮廓颜色，允许使用任何 web 格式颜色，默认未定义（没有轮廓）。</div>
						</li>
						<li>
							<div class="api-arg-title">strokeWidth</div>
							<div class="api-arg-type">number</div>
							<div class="api-arg-desc">轮廓宽度，默认值为 0.15。</div>
						</li>
						<li>
							<div class="api-arg-title">backgroundColor</div>
							<div class="api-arg-type">string</div>
							<div class="api-arg-desc">背景颜色，允许使用任何 web 格式颜色，默认未定义（没有背景）。当启用背景时，文本的竖直对齐模式将设置为 middle（默认为 baseline）。</div>
						</li>
						<li>
							<div class="api-arg-title">backgroundPadding</div>
							<div class="api-arg-type">number</div>
							<div class="api-arg-desc">背景矩形的 padding，默认值为 0.3。</div>
						</li>
						<li>
							<div class="api-arg-title">align</div>
							<div class="api-arg-type">string</div>
							<div class="api-arg-desc">文本对齐模式，<code>center</code>，<code>left</code> 或者 <code>right</code> 之一。默认值为 <code>center</code>。</div>
						</li>
						<li>
							<div class="api-arg-title">opacity</div>
							<div class="api-arg-type">number</div>
							<div class="api-arg-desc">透明度，默认值为 1.0。</div>
						</li>
					</ul>
				
{% endapi_method_params %}


### 返回值

该
<code>RoomVisual</code>
对象本身，您可以使用链式调用。

{% api_method clear '' 0 %}

```javascript
new RoomVisual('W1N1').clear();
```

移除该房间的所有视觉效果。



### 返回值

该
<code>RoomVisual</code>
对象本身，您可以使用链式调用。

{% api_method getSize '' 0 %}

```javascript
if(creep.room.visual.getSize() >= 512000) {
    // 本 tick 将无法添加更多的视觉效果
}
```

当前 tick 添加到该房间的视觉效果的存储大小。它不能超过 512,000（500 KB）。



### 返回值

视觉效果的大小（单位：字节）。
