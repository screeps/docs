# Ruin

<img src="img/ruin.png" alt="" align="right" />

一个被摧毁的建筑。该对象允许其他单位在其上行走。

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td><strong>Decay</strong></td>
        <td>500 tick 除了某些情况外</td>
    </tr>
    </tbody>
</table>

{% page inherited/RoomObject.md %}


{% api_property destroyTime 'number' %}

该建筑被摧毁的时间。

{% api_property id string %}

一个唯一的对象标识。你可以使用 <a href="#Game.getObjectById"><code>Game.getObjectById</code></a> 方法获取对象实例。

{% api_property store '<a href="#Store">Store</a>' %}

一个包含了该建筑中所存储资源的 [`Store`](#Store) 对象。

{% api_property structure '<a href="#Structure">Structure</a> | <a href="#OwnedStructure">OwnedStructure</a>' %}

一个包含了已被摧毁建筑基本信息的对象。


{% api_property ticksToDecay 'number' %}

该废墟离老化消失还有多少 tick。



