# StructureStorage

<img src="img/storage.png" alt="" align="right" />

可以储存大量资源的建筑。每个房间内仅允许建造一个，所以你可以使用 [`Room.storage`](#Room.storage) 属性来快速访问它。</p>

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td colspan="2"><strong>控制器等级</strong></td>
    </tr>
    <tr>
        <td>1-3</td>
        <td>—</td>
    </tr>
    <tr>
        <td>4-8</td>
        <td>1 个 storage</td>
    </tr>
    <tr>
        <td><strong>花费</strong></td>
        <td>30,000</td>
    </tr>
    <tr>
        <td><strong>生命值</strong></td>
        <td>10,000</td>
    </tr>
    <tr>
        <td><strong>储量</strong></td>
        <td>1,000,000</td>
    </tr>
    </tbody>
</table>

{% page inherited/OwnedStructure.md %}


{% api_property store '<a href="#Store">Store</a>' %}

一个包含了该建筑中所存储的货物的 [`Store`](#Store) 对象。


{% api_property storeCapacity 'number' '{"deprecated": true}' %}
                                                                              
[`.store.getCapacity()`](#Store.getCapacity) 属性的别名.

