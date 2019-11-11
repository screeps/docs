# StructureNuker

<img src="img/nuke.png" alt="" align="right" />

向其他房间发射一枚核弹，对着落区域造成大量伤害。
每次发射都有冷却时间并且需要能量和 ghodium 资源。
发射后将会在目标房间位置创建一个对任何玩家可见的 [Nuke](#Nuke) 对象，直至其着陆。
已发射的核弹无法移动或者取消。核弹不能从新手房间发射或者发射向新手房间。放置到 StructureNuker 中的资源无法被取出 (withdraw)。

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td colspan="2" style="width: 70px;"><strong>控制器等级</strong></td>
    </tr>
    <tr>
        <td>1-7</td>
        <td>—</td>
    </tr>
    <tr>
        <td>8</td>
        <td>1 nuke</td>
    </tr>
    <tr>
        <td style="width: 70px;"><strong>建造花费</strong></td>
        <td>100,000</td>
    </tr>
    <tr>
        <td style="width: 70px;"><strong>生命值</strong></td>
        <td>1,000</td>
    </tr>
    <tr>
        <td style="width: 70px;"><strong>攻击范围</strong></td>
        <td>10 rooms</td>
    </tr>
    <tr>
        <td style="width: 70px;"><strong>发射花费</strong></td>
        <td>300,000 energy<br /> 5,000 ghodium</td>
    </tr>
    <tr>
        <td style="width: 70px;"><strong>发射冷却</strong></td>
        <td>100,000 ticks</td>
    </tr>
    <tr>
        <td style="width: 70px;"><strong>着陆时间</strong></td>
        <td>50,000 ticks</td>
    </tr>
    <tr>
        <td style="width: 70px;"><strong>效果</strong></td>
        <td>立刻清除所有的 creep，建筑工地(construction site)和掉落的资源，即使它位于 rampart 之下。并对建筑造成如下伤害：
            <ul>
                <li>对着落位置造成 10,000,000 hits 伤害。</li>
                <li>对周围 5x5 区域中的建筑造成 5,000,000 hits 伤害。</li>
            </ul>
            <p>注意，您可以将来自多个不同房间的核弹叠加到同一位置来增强伤害。</p>
            <p>如果核弹着落时房间正处于安全模式，则会立刻取消安全模式，并将安全模式的冷却时间重置为 0。</p>
            <p>房间控制器将会触发 <code>upgradeBlocked</code> 计时，这意味着在接下来的 200 tick 中将无法再次使用安全模式。</p>
        </td>
    </tr>
    </tbody>
</table>

{% page inherited/OwnedStructure.md %}


{% api_property energy 'number' '{"deprecated": true}' %}
                                                                
[`.store[RESOURCE_ENERGY]`](#StructureExtension.store) 的别名。



{% api_property energyCapacity 'number' '{"deprecated": true}' %}
                                                                                                                
[`.store.getCapacity(RESOURCE_ENERGY)`](#Store.getCapacity) 的别名。



{% api_property ghodium 'number' '{"deprecated": true}' %}
                                                                 
[`.store[RESOURCE_GHODIUM]`](#StructureExtension.store) 的别名。



{% api_property ghodiumCapacity 'number' '{"deprecated": true}' %}
                                                                                                                 
[`.store.getCapacity(RESOURCE_GHODIUM)`](#Store.getCapacity) 的别名。



{% api_property cooldown 'number' %}



下次发射前还需多少 tick 的冷却时间。


{% api_property store '<a href="#Store">Store</a>' %}

```javascript
if(structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
    creep.transfer(structure, RESOURCE_ENERGY);
}
```


一个包含了该建筑中所存储资源的 [`Store`](#Store) 对象。



{% api_method launchNuke 'pos' A %}

```javascript
nuker.launchNuke(new RoomPosition(20,30, 'W1N1'));
```

向指定位置发射核弹。

{% api_method_params %}
pos : <a href="#RoomPosition">RoomPosition</a>
目标房间位置
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个建筑的拥有者。
ERR_NOT_ENOUGH_RESOURCES | 该建筑没有足够的能量和/或 ghodium。
ERR_INVALID_TARGET | 目标不是有效的 RoomPosition。
ERR_NOT_IN_RANGE | 目标房间超出打击范围。
ERR_TIRED | 该建筑仍在冷却。
ERR_RCL_NOT_ENOUGH | 房间控制中心等级不足。
{% endapi_return_codes %}


