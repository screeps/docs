# 核弹 Nuke

核弹着落的位置，这个对象无法被更改或移除。您可以用常数 `FIND_NUKES` 来获取即将落地的核弹。
A nuke landing position. This object cannot be removed or modified. You can find incoming nukes in the room using the `FIND_NUKES` constant.

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td><strong>Landing time</strong></td>
        <td>50,000 ticks</td>
    </tr>
    <tr>
        <td><strong>Effect</strong></td>
        <td>在堡垒内外的所有的 creeps 、建筑工地、掉落的资源会在核爆瞬间被移除。
            All creeps, construction sites and dropped resources in the room are removed immediately, even inside ramparts. Damage to structures:
        <td>All creeps, construction sites and dropped resources in the room are removed immediately, even inside ramparts.  cr eeDamage to structures:
        <td>All creeps, construction sites and dropped resources in the room are removed immediately, even inside ramparts. Damage to structures:
            <ul>
                <li>10,000,000 hits 在着落点;</li>
                <li>5,000,000 hits 对周边 5x5 区域的所有建筑.</li>
            </ul>
            <p>Note that you can stack multiple nukes from different rooms at the same target position to increase damage.</p>
            <p>If the room is in safe mode, then the safe mode is cancelled immediately, and the safe mode cooldown is reset to 0.</p>
            <p>The room controller is hit by triggering <code>upgradeBlocked</code> period, which means it is unavailable to activate safe mode again within the next 200 ticks.</p>
        </td>
    </tr>
    </tbody>
</table>

{% page inherited/RoomObject.md %}

{% api_property id 'string' %}



A unique object identificator. You can use <a href="#Game.getObjectById"><code>Game.getObjectById</code></a> method to retrieve an object instance by its <code>id</code>.



{% api_property launchRoomName 'string' %}



The name of the room where this nuke has been launched from.



{% api_property timeToLand 'number' %}



The remaining landing time.


