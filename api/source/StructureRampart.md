# StructureRampart

<img src="img/rampart.png" alt="" align="right" />

Blocks movement of hostile creeps, and defends your creeps and structures on the same tile. 
Can be used as a controllable gate.

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td colspan=2><strong>Controller level</strong></td>
    </tr>
    <tr>
        <td>1</td>
        <td>—</td>
    </tr>
    <tr>
        <td>2</td>
        <td>300,000 max hits</td>
    </tr>
    <tr>
        <td>3</td>
        <td>1,000,000 max hits</td>
    </tr>
    <tr>
        <td>4</td>
        <td>3,000,000 max hits</td>
    </tr>
    <tr>
        <td>5</td>
        <td>10,000,000 max hits</td>
    </tr>
    <tr>
        <td>6</td>
        <td>30,000,000 max hits</td>
    </tr>
    <tr>
        <td>7</td>
        <td>100,000,000 max hits</td>
    </tr>
    <tr>
        <td>8</td>
        <td>300,000,000 max hits</td>
    </tr>
    <tr>
        <td><strong>Cost</strong></td>
        <td>1</td>
    </tr>
    <tr>
        <td><strong>Hits when constructed</strong></td>
        <td>1</td>
    </tr>
    <tr>
        <td><strong>Decay</strong></td>
        <td>Loses 300 hits every 100 ticks</td>
    </tr>
    </tbody>
</table>

{% page inherited/OwnedStructure.md %}


{% api_property isPublic 'boolean' %}



If false (default), only your creeps can step on the same square. If true, any hostile creeps can pass through.



{% api_property ticksToDecay 'number' %}



The amount of game ticks when this rampart will lose some hit points.



{% api_method setPublic 'isPublic' A %}



Make this rampart public to allow other players' creeps to pass through.

{% api_method_params %}
isPublic : boolean
Whether this rampart should be public or non-public.
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个建筑的拥有者。
{% endapi_return_codes %}


