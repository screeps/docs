# Mineral

矿床。在建有 extractor 建筑时可以通过带有 `WORK` 身体部件的 creep 采集。
点击 [本文](/resources.html) 来了解更多关于 mineral 的信息。

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td><strong>再生容量</strong></td>
        <td><code>DENSITY_LOW</code>: 15,000 <br /> <code>DENSITY_MODERATE</code>: 35,000<br /> <code>DENSITY_HIGH</code>: 70,000 <br /> <code>DENSITY_ULTRA</code>: 100,000</td>
    </tr>
    <tr>
        <td><strong>再生时间</strong></td>
        <td>50,000 ticks</td>
    </tr>
    <tr>
        <td><strong>丰度(Density)变化几率</strong></td>
        <td><code>DENSITY_LOW</code>: 100% 变化<br /> <code>DENSITY_MODERATE</code>: 5% 变化<br /> <code>DENSITY_HIGH</code>: 5% 变化<br /> <code>DENSITY_ULTRA</code>: 100% 变化</td>
    </tr>
    </tbody>
</table>

{% page inherited/RoomObject.md %} 

{% api_property density 'number' %}



矿床密度。密度越高容量越大。一旦 <code>ticksToRegeneration</code> 降低至 0，该矿床的密度将被重新设置。其值为 <code>DENSITY_*</code> 常量之一。



{% api_property mineralAmount 'number' %}



资源的剩余容量。



{% api_property mineralType 'string' %}



资源类型，<code>RESOURCE_*</code>常量之一。



{% api_property id 'string' %}



一个唯一的对象标识。你可以使用<a href="#Game.getObjectById"><code>Game.getObjectById</code></a>方法获取对象实例。



{% api_property ticksToRegeneration 'number' %}



矿床容量将要恢复满额的剩余时间。


