# Nuke （核弹）

核弹着落的位置，这个对象无法被更改或移除。您可以用常数 `FIND_NUKES` 来获取即将落地的核弹。


<table class="table gameplay-info">
    <tbody>
    <tr>
        <td><strong>Landing time</strong></td>
        <td>50,000 ticks</td>
    </tr>
    <tr>
        <td><strong>Effect</strong></td>
        <td>在堡垒内外的所有的 creeps 、建筑工地、掉落的资源会在核爆瞬间被移除。对建筑的伤害：
            <ul>
                <li>10,000,000 hits 在着落点;</li>
                <li>5,000,000 hits 对周边 5x5 区域内的所有建筑.</li>
            </ul>
            <p>注：向同一目标发射多枚核弹可叠加伤害。</p>
            <p>如果目标房间启用了安全模式，则其会被立即取消，但冷却时间会被重置为0。</p>
            <p>目标房间的控制器会进入 <code>upgradeBlocked</code> ，这意味着在 200 ticks 内其无法重新开启安全模式。</p>
        </td>
    </tr>
    </tbody>
</table>

{% page inherited/RoomObject.md %}

{% api_property id 'string' %}



身份证，可使用 <a href="#Game.getObjectById"><code>Game.getObjectById</code></a> 通过 <code>id</code> 查找对象。



{% api_property launchRoomName 'string' %}



发射此核弹的房间



{% api_property timeToLand 'number' %}



预计核爆时间


