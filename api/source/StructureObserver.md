# StructureObserver

<img src="img/observer.png" alt="" align="right" /> 

为你的代码提供远处房间的视野。

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td colspan="2"><strong>控制中心等级</strong></td>
    </tr>
    <tr>
        <td>1-7</td>
        <td>—</td>
    </tr>
    <tr>
        <td>8</td>
        <td>1 观察者</td>
    </tr>
    <tr>
        <td><strong>建筑成本</strong></td>
        <td>8,000</td>
    </tr>
    <tr>
        <td><strong>生命值</strong></td>
        <td>500</td>
    </tr>
    <tr>
        <td><strong>观察范围</strong></td>
        <td>10个房间</td>
    </tr>
    </tbody>
</table>

{% page inherited/OwnedStructure.md %}


{% api_method observeRoom 'roomName' A %}



为你的代码提供远处房间的视野。目标房间将在下一个tick可见。

{% api_method_params %}
roomName : string
The name of the target room.
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个建筑的拥有者。
ERR_INVALID_ARGS | <code>roomName</code>参数不是一个有效的房间名。
ERR_NOT_IN_RANGE | 房间<code>roomName</code>不在观察范围内。
ERR_RCL_NOT_ENOUGH | 房间控制中心等级不足。
{% endapi_return_codes %}


