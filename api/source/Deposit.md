# Deposit

<img src="img/deposit.png" alt="" align="right" />

生产商品所需的稀有资源储备。 可以通过带有 `WORK` 身体部位的 creep 来收获。
每次采集操作都会触发冷却时间，冷却时间会随着时间的流逝而越来越长。

点击 [本文](/resources.html) 了解更多关于 deposits 的信息。

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td><strong>冷却</strong></td> 
        <td>`0.001 * totalHarvested ^ 1.2`<td>
    </tr>
    <tr>
        <td><strong>老化</strong></td>
        <td>50,000 ticks after appearing or last harvest operation</td>
    </tr>
    </tbody>
</table>

{% page inherited/RoomObject.md %}

{% api_property cooldown 'number' %}


下一次采集前还要冷却多少 tick。


{% api_property depositType 'string' %}


deposit 类型, 以下常量之一:

```javascript-content
RESOURCE_MIST
RESOURCE_BIOMASS
RESOURCE_METAL
RESOURCE_SILICON
```

{% api_property id 'string' %}

唯一的对象标识符。您可以使用 <a href="#Game.getObjectById"><code>Game.getObjectById</code></a> 方法通过其 <code>id</code> 检索对象实例。 。


{% api_property lastCooldown 'number' %}


该结构上次采集的冷却时间。


{% api_property ticksToDecay 'number' %}


该结构还有多少 tick 就要因老化而消失。
