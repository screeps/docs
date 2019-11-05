# Source
 
一个能量源对象。可以被拥有 `WORK` 身体部件的 creep 采集。

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td><strong>能量容量</strong></td>
        <td>中央房间：4000<br />被控制(owned)或者被预定(reserved)房间：3000<br />未预定房间：1500</td>
    </tr>
    <tr>
        <td><strong>能量再生</strong></td>
        <td>每 300 tick</td>
    </tr>
    </tbody>
</table>

{% page inherited/RoomObject.md %}

{% api_property energy 'number' %}



能量的剩余容量。



{% api_property energyCapacity 'number' %}



该 source 的总能量容量。



{% api_property id 'string' %}



一个唯一的对象标识。你可以使用<a href="#Game.getObjectById"><code>Game.getObjectById</code></a>方法获取对象实例。



{% api_property ticksToRegeneration 'number' %}



该 source 还有多少 tick 将会再生。


