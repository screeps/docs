# Nuke

核弹原爆点，此对象无法被更改或移除。但可以用常数 `FIND_NUKES` 查找即将抵达房间的核弹。核弹只能由 <a href="#StructureNuker"><code>核弹发射井</code></a> 发射

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td><strong>着落时间</strong></td>
        <td>50,000 ticks</td>
    </tr>
    <tr>
        <td><strong>影响</strong></td>
        <td>房间里的所有的 creeps 、建筑工地、掉落的资源会在核爆瞬间被移除，无论其是否在堡垒内。对建筑的伤害：
            <ul>
                <li>10,000,000 hits 在原爆点;</li>
                <li>5,000,000 hits 对周边 5x5 区域内的所有建筑.</li>
            </ul>
            <p>注：向同一目标发射多枚核弹可叠加伤害。</p>
            <p>如果目标房间处与安全模式，则其会被立即取消，但安全模式的冷却时间会被重置为0。</p>
            <p>目标房间的控制器会进入 <code>upgradeBlocked</code> ，这意味着在 200 ticks 内其无法重新开启安全模式。</p>
        </td>
    </tr>
    </tbody>
</table>

{% page inherited/RoomObject.md %}

{% api_property id 'string' %}



一串独一无二的身份识别码，可使用 <a href="#Game.getObjectById"><code>Game.getObjectById</code></a> 来到指定 <code>id</code> 的对象。



{% api_property launchRoomName 'string' %}



发射此核弹的房间名



{% api_property timeToLand 'number' %}



着落倒数

