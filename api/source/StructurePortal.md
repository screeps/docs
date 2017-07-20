# StructurePortal

<img src="img/portal.png" alt="" align="right" />

A non-player structure. Instantly teleports your creeps to a distant room acting as a room exit tile. 
Portals appear randomly in the central room of each sector.</p>

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td><strong>Stable time</strong></td>
        <td>10 days</td>
    </tr>
    <tr>
        <td><strong>Decay time</strong></td>
        <td>30,000 ticks</td>
    </tr>
    </tbody>
</table>

{% page inherited/Structure.md %}


{% api_property destination '<a href="#RoomPosition">RoomPosition</a> | object' %}

If this is an **inter-room** portal, then this property contains a `RoomPosition` object 
leading to the point in the destination room.

If this is an **inter-shard** portal, then this property contains an object with `shard` and `room` string properties.
Exact coordinates are undetermined, the creep will appear at any free spot in the destination room.


{% api_property ticksToDecay 'number' %}



The amount of game ticks when the portal disappears, or undefined when the portal is stable.


