# Score

A score object that appears randomly in rooms during Season 10. Move a creep onto the same tile to automatically collect it — the score value is credited to the creep's owner and the object disappears.

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td><strong>Spawn interval</strong></td>
        <td>Every 250 game ticks per room (with 1% chance)</td>
    </tr>
    <tr>
        <td><strong>Score amount</strong></td>
        <td>500–2500 (common) / 3500–6500 (uncommon) / 8500–11500 (rare)</td>
    </tr>
    <tr>
        <td><strong>Decay</strong></td>
        <td>Up to 5000 ticks after spawn</td>
    </tr>
    <tr>
        <td><strong>Collection</strong></td>
        <td>Automatic — move a creep onto the same tile</td>
    </tr>
    </tbody>
</table>

{% page inherited/RoomObject.md %}

{% api_property id 'string' %}

A unique object identificator. You can use <a href="#Game.getObjectById"><code>Game.getObjectById</code></a> method to retrieve an object instance by its <code>id</code>.

{% api_property score 'number' %}

```javascript
const scores = room.find(FIND_SCORES);
const best = scores.reduce((a, b) => b.score > a.score ? b : a);
creep.moveTo(best);
```

The score value that will be credited to the creep's owner upon collection.

{% api_property ticksToDecay 'number' %}

The number of game ticks remaining before this object disappears.
