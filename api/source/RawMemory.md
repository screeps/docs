# RawMemory

RawMemory object allows to implement your own memory stringifier instead of built-in serializer 
based on `JSON.stringify`. It also allows to request up to 10 MB of additional memory 
using asynchronous memory segments feature.

You can also access memory segments of other players using methods below.

{% api_property RawMemory.segments 'object' %}

```javascript
RawMemory.setActiveSegments([0,3]);
// on the next tick
console.log(RawMemory.segments[0]);
console.log(RawMemory.segments[3]);
RawMemory.segments[3] = '{"foo": "bar", "counter": 15}';
```

An object with asynchronous memory segments available on this tick. Each object key is the segment ID with data in string values. Use [`setActiveSegments`](#RawMemory.setActiveSegments)</code> to fetch segments on the next tick. Segments data is saved automatically in the end of the tick. The maximum size per segment is 100 KB.


{% api_property RawMemory.foreignSegment 'object' %}

```javascript
RawMemory.setActiveForeignSegment('player');
// on the next tick
console.log(RawMemory.foreignSegment); 
// --> {"username": "player", "id": 40, "data": "Hello!"} 

```

An object with a memory segment of another player available on this tick. Use [`setActiveForeignSegment`](#RawMemory.setActiveForeignSegment) to fetch segments on the next tick. 
The object consists of the following properties:

{% api_method_params %}
username : string
Another player's name.
===
id : number
The ID of the requested memory segment.
===
data : string
The segment contents.
{% endapi_method_params %}




{% api_method RawMemory.get '' 0 %}

```javascript
const myMemory = JSON.parse(RawMemory.get());
```

Get a raw string representation of the <code>Memory</code> object.



### Return value

Returns a string value.

{% api_method RawMemory.set 'value' 0 %}

```javascript
RawMemory.set(JSON.stringify(myMemory));
```

Set new <code>Memory</code> value.

{% api_method_params %}
value : string
New memory value as a string.
{% endapi_method_params %}




{% api_method RawMemory.setActiveSegments 'ids' 0 %}

```javascript
RawMemory.setActiveSegments([0,3]);
```


Request memory segments using the list of their IDs. Memory segments will become available on the next tick in [`segments`](#RawMemory.segments)</code> object.

{% api_method_params %}
ids : array
An array of segment IDs. Each ID should be a number from 0 to 99. Maximum 10 segments can be active at the same time. Subsequent calls of <code>setActiveSegments</code> override previous ones.
{% endapi_method_params %}



{% api_method RawMemory.setActiveForeignSegment 'username, [id]' 0 %}

```javascript
RawMemory.setActiveForeignSegment('player');
```
```javascript
RawMemory.setActiveForeignSegment('player', 10);
```
```javascript
RawMemory.setActiveForeignSegment(null);
```

Request a memory segment of another user. The segment should be marked by its owner as public using [`setPublicSegments`](#RawMemory.setPublicSegments). 
The segment data will become available on the next tick in [`foreignSegment`](#RawMemory.foreignSegment) object. 
You can only have access to one foreign segment at the same time.   

{% api_method_params %}
username : string | null
The name of another user. Pass `null` to clear the foreign segment.
===
id (optional) : number
The ID of the requested segment from 0 to 99. If undefined, the user's default public segment is requested as set by [`setDefaultPublicSegment`](#RawMemory.setDefaultPublicSegment).
{% endapi_method_params %}



{% api_method RawMemory.setDefaultPublicSegment 'id' 0 %}

```javascript
RawMemory.setPublicSegments([5,20,21]);
RawMemory.setDefaultPublicSegment(5);
```
```javascript
RawMemory.setDefaultPublicSegment(null);
```

Set the specified segment as your default public segment. It will be returned if no `id` parameter is passed to [`setActiveForeignSegment`](#RawMemory.setActiveForeignSegment) by another user.   

{% api_method_params %}
id : number | null
The ID of the memory segment from 0 to 99. Pass `null` to remove your default public segment.
{% endapi_method_params %}



{% api_method RawMemory.setPublicSegments 'ids' 0 %}

```javascript
RawMemory.setPublicSegments([5,3]);
```
```javascript
RawMemory.setPublicSegments([]);
```

Set specified segments as public. Other users will be able to request access to them using [`setActiveForeignSegment`](#RawMemory.setActiveForeignSegment).     

{% api_method_params %}
ids : array
An array of segment IDs. Each ID should be a number from 0 to 99. Subsequent calls of <code>setPublicSegments</code> override previous ones.
{% endapi_method_params %}
