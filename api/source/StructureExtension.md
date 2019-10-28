# StructureExtension

<img src="img/spawn.png" alt="" align="right" />

填充能量从而允许建造更大型的 creep。Extension 可以被放置在房间的任何地方，无论距离有多远，任何 spawn 都可以使用其中的能量进行孵化。

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td colspan="2"><strong>控制器等级</strong></td>
    </tr>
    <tr>
        <td>1</td>
        <td>—</td>
    </tr>
    <tr>
        <td>2</td>
        <td>5 extensions (50 容量)</td>
    </tr>
    <tr>
        <td>3</td>
        <td>10 extensions (50 容量)</td>
    </tr>
    <tr>
        <td>4</td>
        <td>20 extensions (50 容量)</td>
    </tr>
    <tr>
        <td>5</td>
        <td>30 extensions (50 容量)</td>
    </tr>
    <tr>
        <td>6</td>
        <td>40 extensions (50 容量)</td>
    </tr>
    <tr>
        <td>7</td>
        <td>50 extensions (100 容量)</td>
    </tr>
    <tr>
        <td>8</td>
        <td>60 extensions (200 容量)</td>
    </tr>
    <tr>
        <td><strong>建造花费</strong></td>
        <td>3,000</td>
    </tr>
    <tr>
        <td><strong>生命值</strong></td>
        <td>1,000</td>
    </tr>
    </tbody>
</table>

{% page inherited/OwnedStructure.md %}

{% api_property energy 'number' '{"deprecated": true}' %}
                                
[`.store[RESOURCE_ENERGY]`](#StructureExtension.store) 的别名。


{% api_property energyCapacity 'number' '{"deprecated": true}' %}
                                                                        
[`.store.getCapacity(RESOURCE_ENERGY)`](#Store.getCapacity) 的别名。



该 extension 所能容纳的能量上限。

{% api_property store 'object' %}

```javascript
if(structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
    creep.transfer(structure, RESOURCE_ENERGY);
}
```


一个包含了该建筑中所存储的货物的 [`Store`](#Store) 对象。

