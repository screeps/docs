# Tombstone

<img src="img/tombstone.gif" alt="" align="right" />

死亡creep的遗物。这个对象不阻碍行走。

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td><strong>消失</strong></td>
        <td>死去的creep每个身体部件5 tick</td>
    </tr>
    </tbody>
</table>

{% page inherited/RoomObject.md %}

{% api_property creep '<a href="#Creep">Creep</a> | <a href="#PowerCreep">PowerCreep</a>' %}

```javascript
room.find(FIND_TOMBSTONES).forEach(tombstone => {
    if(tombstone.creep.my) {
        console.log(`My creep died with ID=${tombstone.creep.id} ` +
             `and role=${Memory.creeps[tombstone.creep.name].role}`);   
    }    
});
```
```javascript
room.find(FIND_TOMBSTONES).forEach(tombstone => {
    if(tombstone.creep instanceof PowerCreep) {
        console.log(`Power creep died here`);   
    }    
});
````

一个内含死亡creep或超能creep的对象。

{% api_property deathTime 'number' %}

死亡时间。

{% api_property id string %}

一个唯一的对象标识。你可以使用<a href="#Game.getObjectById"><code>Game.getObjectById</code></a>方法获取对象实例。


{% api_property store '<a href="#Store">Store</a>' %}

一个表示该结构所存储资源的 [`Store`](#Store) 对象。


{% api_property ticksToDecay 'number' %}

这个墓碑消失的剩余时间。



