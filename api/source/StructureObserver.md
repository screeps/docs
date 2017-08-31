# StructureObserver

<img src="img/observer.png" alt="" align="right" /> 

Provides visibility into a distant room from your script.

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td colspan="2"><strong>Controller level</strong></td>
    </tr>
    <tr>
        <td>1-7</td>
        <td>—</td>
    </tr>
    <tr>
        <td>8</td>
        <td>1 observer</td>
    </tr>
    <tr>
        <td><strong>Cost</strong></td>
        <td>8,000</td>
    </tr>
    <tr>
        <td><strong>Hits</strong></td>
        <td>500</td>
    </tr>
    <tr>
        <td><strong>Range</strong></td>
        <td>10 rooms</td>
    </tr>
    </tbody>
</table>

{% page inherited/OwnedStructure.md %}


{% api_method observeRoom 'roomName' A %}



Provide visibility into a distant room from your script. The target room object will be available on the next tick.

{% api_method_params %}
roomName : string
The name of the target room.
{% endapi_method_params %}


### Return value

One of the following codes:
{% api_return_codes %}
OK | The operation has been scheduled successfully.
ERR_INVALID_ARGS | <code>roomName</code> argument is not a valid room name value.
ERR_NOT_IN_RANGE | Room <code>roomName</code> is not in observing range.
ERR_RCL_NOT_ENOUGH | Room Controller Level insufficient to use this structure.
{% endapi_return_codes %}


