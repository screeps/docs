# StructureRoad

<img src="img/road_plain.png" alt="" align="right" />

Decreases movement cost to 1. Using roads allows creating creeps with less `MOVE` body parts.

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td><strong>Controller level</strong></td>
        <td>Any (including neutral rooms)</td>
    </tr>
    <tr>
        <td><strong>Cost</strong></td>
        <td>
            <ul>
                <li>300 at plain land</li>
                <li>1,500 at swamp</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><strong>Hits</strong></td>
        <td>
            <ul>
                <li>5,000 at plain land</li>
                <li>25,000 at swamp</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><strong>Decay</strong></td>
        <td>
            <ul>
                <li>Loses 100 hits every 1,000 ticks at plain land</li>
                <li>Loses 500 hits every 1,000 ticks at swamp</li>
            </ul>
            Note: every creep step decreases the decay timer for 1 tick per each creep body part</td>
    </tr>
    </tbody>
</table> 

{% page inherited/Structure.md %}


{% api_property ticksToDecay 'number' %}



The amount of game ticks when this road will lose some hit points.


