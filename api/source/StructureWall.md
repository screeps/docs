# StructureWall

<img src="img/wall.png" alt="" align="right" />

Blocks movement of all creeps.

Players can build destructible walls in controlled rooms.
Some rooms also contain indestructible walls separating novice and respawn areas from the rest of the world or dividing novice / respawn areas into smaller sections. Indestructible walls have no `hits` property.

This structure is unowned, so it won't be returned in a `room.find(FIND_MY_STRUCTURES)` call.
	
<table class="table gameplay-info">
    <tbody>
    <tr>
        <td><strong>Controller level</strong></td>
        <td>2</td>
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
        <td><strong>Max hits</strong></td>
        <td>300,000,000</td>
    </tr>
    </tbody>
</table>

{% page inherited/Structure.md %}



