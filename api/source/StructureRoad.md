# StructureRoad

<img src="img/road_plain.png" alt="" align="right" />

将每个身体部件的移动成本降低至 1。建造道路之后，你就可以用更少的 `MOVE` 身体部件来孵化一个 creep。你也可以在自然墙壁上建造一个道路来使其可以通行。

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td><strong>控制器等级</strong></td>
        <td>任何等级 (包括无主房间)</td>
    </tr>
    <tr>
        <td><strong>花费</strong></td>
        <td>
            <ul>
                <li>在平原上: 300</li>
                <li>在沼泽上: 1,500</li>
                <li>在墙壁上: 45,000</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><strong>生命值</strong></td>
        <td>
            <ul>
                <li>在平原上: 5,000 hits</li>
                <li>在沼泽上: 25,000 hits</li>
                <li>在墙壁上: 750,000 hits</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><strong>老化</strong></td>
        <td>
            <ul>
                <li>在平原上: 每 1,000 ticks 失去 100 hits</li>
                <li>在沼泽上: 每 1,000 ticks 失去 500 hits</li>
                <li>在墙壁上: 每 1,000 ticks 失去 15,000 hits</li>
            </ul>
            注意: creep 的每次移动都会导致更快的老化, 每一个身体部件都会降低老化计时器 1 tick。</td>
    </tr>
    </tbody>
</table> 

{% page inherited/Structure.md %}


{% api_property ticksToDecay 'number' %}



这格道路还有多少 tick 就要因老化而失去生命值。


