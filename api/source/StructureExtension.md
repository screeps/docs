# StructureExtension

<img src="img/spawn.png" alt="" align="right" />

Contains energy which can be spent on spawning bigger creeps. Extensions can be placed anywhere in the room, any spawns will be able to use them regardless of distance.

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td colspan="2"><strong>Controller level</strong></td>
    </tr>
    <tr>
        <td>1</td>
        <td>—</td>
    </tr>
    <tr>
        <td>2</td>
        <td>5 extensions (50 capacity)</td>
    </tr>
    <tr>
        <td>3</td>
        <td>10 extensions (50 capacity)</td>
    </tr>
    <tr>
        <td>4</td>
        <td>20 extensions (50 capacity)</td>
    </tr>
    <tr>
        <td>5</td>
        <td>30 extensions (50 capacity)</td>
    </tr>
    <tr>
        <td>6</td>
        <td>40 extensions (50 capacity)</td>
    </tr>
    <tr>
        <td>7</td>
        <td>50 extensions (100 capacity)</td>
    </tr>
    <tr>
        <td>8</td>
        <td>60 extensions (200 capacity)</td>
    </tr>
    <tr>
        <td><strong>Cost</strong></td>
        <td>3,000</td>
    </tr>
    <tr>
        <td><strong>Hits</strong></td>
        <td>1,000</td>
    </tr>
    </tbody>
</table>

{% page inherited/OwnedStructure.md %}

{% api_property energy 'number' '{"deprecated": true}' %}
                                
An alias for [`.store[RESOURCE_ENERGY]`](#StructureExtension.store).


{% api_property energyCapacity 'number' '{"deprecated": true}' %}
                                                                        
An alias for [`.store.getCapacity(RESOURCE_ENERGY)`](#Store.getCapacity).



The total amount of energy the extension can contain.

{% api_property store 'object' %}

```javascript
if(structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
    creep.transfer(structure, RESOURCE_ENERGY);
}
```


A [`Store`](#Store) object that contains cargo of this structure.

