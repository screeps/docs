# RawMemory

RawMemory object allows to implement your own memory stringifier instead of built-in serializer 
based on `JSON.stringify`. It also allows to request up to 10 MB of additional memory 
using asynchronous memory segments feature. 
[Learn more](/hc/en-us/articles/203016642-Working-with-Memory)

{% api_property RawMemory.segments 'object' %}

```javascript
RawMemory.setActiveSegments([0,3]);
// on the next tick
console.log(RawMemory.segments[0]);
console.log(RawMemory.segments[3]);
RawMemory.segments[3] = '{"foo": "bar", "counter": 15}';
```

An object with asynchronous memory segments available on this tick. Each object key is the segment ID with data in string values. Use <code>RawMemory.setActiveSegments</code> to fetch segments on the next tick. Segments data is saved automatically in the end of the tick.



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


Request memory segments using the list of their IDs. Memory segments will become available on the next tick in <code>RawMemory.segments</code> object.

{% api_method_params %}
ids : array
An array of segment IDs. Each ID should be a number from 0 to 99. Maximum 10 segments can be active at the same time. Subsequent calls of <code>setActiveSegments</code> override previous ones.
{% endapi_method_params %}



