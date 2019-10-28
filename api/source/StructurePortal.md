# StructurePortal

<img src="img/portal.png" alt="" align="right" />

一个非玩家建造的建筑。立刻将你的 creep 传送至一个遥远房间的出口位置。传送门会在每个区块的中央房间随机刷新。</p>

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td><strong>稳定时间</strong></td>
        <td>10 天</td>
    </tr>
    <tr>
        <td><strong>老化时间</strong></td>
        <td>30,000 ticks</td>
    </tr>
    </tbody>
</table>

{% page inherited/Structure.md %}


{% api_property destination '<a href="#RoomPosition">RoomPosition</a> | object' %}

如果这是个**通往其他房间**的传送门，则该属性为指向目的地房间出口位置的 `RoomPosition` 对象。

如果这是个**通往其他 shard** 的传送门，则该属性为一个包含了 `shard` 和 `room` 字符串属性的对象。无法确定其具体出口位置，creep 会被随机传送到目标房间的任意空闲位置。



{% api_property ticksToDecay 'number' %}



还有多少 tick 就要因老化而失去生命值，当传送门稳定时其值为 undefined。


