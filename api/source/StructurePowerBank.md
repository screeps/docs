# StructurePowerBank

<img src="img/powerBank.png" alt="" align="right" />

Non-player structure. Contains power resource which can be obtained by destroying the structure.
Hits the attacker creep back on each attack. Learn more about power
from [this article](/power.html).

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td><strong>Hits</strong></td>
        <td>2,000,000</td>
    </tr>
    <tr>
        <td><strong>Return damage</strong></td>
        <td>50%</td>
    </tr>
    <tr>
        <td><strong>Capacity</strong></td>
        <td>500 — 10,000</td>
    </tr>
    <tr>
        <td><strong>Decay</strong></td>
        <td>5,000 ticks</td>
    </tr>
    </tbody>
</table>

{% page inherited/OwnedStructure.md %}


{% api_property power 'number' %}



The amount of power containing.



{% api_property ticksToDecay 'number' %}



The amount of game ticks when this structure will disappear.
