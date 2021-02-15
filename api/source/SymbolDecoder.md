# SymbolDecoder

Accepts symbols and enrolls it into your account (see <a href="#Game.symbols">Game.symbols</a>). Use <a href="#Creep.transfer">Creep.transfer</a> to put scores into the collector.

{% page inherited/RoomObject.md %}

{% api_property id 'string' %}

A unique object identificator. You can use <a href="#Game.getObjectById"><code>Game.getObjectById</code></a> method to retrieve an object instance by its <code>id</code>.

{% api_property resourceType 'string' %}

The symbol type that this object accepts, one of the <code>RESOURCE_*</code> constants from <code>SYMBOLS</code>.

{% api_property scoreMultiplier 'number' %}

The number of symbols to be enrolled into your account for each resource unit accepted by this object.
The score multiplier depends on the level of the room controller (see <code>CONTROLLER_LEVEL_SCORE_MULTIPLIERS</code> constant).

<table class="table gameplay-info">
    <tbody>
    <tr>
        <th><strong>Controller level</strong></th>
        <th>Score multiplier</th>
    </tr>
    <tr>
        <td>1</td>
        <td>1</td>
    </tr>
    <tr>
        <td>2</td>
        <td>1</td>
    </tr>
    <tr>
        <td>3</td>
        <td>1</td>
    </tr>
    <tr>
        <td>4</td>
        <td>3</td>
    </tr>
    <tr>
        <td>5</td>
        <td>9</td>
    </tr>
    <tr>
        <td>6</td>
        <td>27</td>
    </tr>
    <tr>
        <td>7</td>
        <td>81</td>
    </tr>
    <tr>
        <td>8</td>
        <td>243</td>
    </tr>
    </tbody>
</table>
