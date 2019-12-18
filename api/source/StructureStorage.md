# StructureStorage

<img src="img/storage.png" alt="" align="right" />

A structure that can store huge amount of resource units. Only one structure per room is allowed 
that can be addressed by [`Room.storage`](#Room.storage) property.</p>

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td colspan="2"><strong>Controller level</strong></td>
    </tr>
    <tr>
        <td>1-3</td>
        <td>—</td>
    </tr>
    <tr>
        <td>4-8</td>
        <td>1 storage</td>
    </tr>
    <tr>
        <td><strong>Cost</strong></td>
        <td>30,000</td>
    </tr>
    <tr>
        <td><strong>Hits</strong></td>
        <td>10,000</td>
    </tr>
    <tr>
        <td><strong>Capacity</strong></td>
        <td>1,000,000</td>
    </tr>
    </tbody>
</table>

{% page inherited/OwnedStructure.md %}


{% api_property store '<a href="#Store">Store</a>' %}

A [`Store`](#Store) object that contains cargo of this structure.


{% api_property storeCapacity 'number' '{"deprecated": true}' %}
                                                                              
An alias for [`.store.getCapacity()`](#Store.getCapacity).

