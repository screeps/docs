# StructureRampart

<img src="img/rampart.png" alt="" align="right" />

阻挡敌方 creep 的移动。并防御本格空间上的我方建筑和 creep。可以当做可控门来进行使用。

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td colspan=2><strong>控制器等级</strong></td>
    </tr>
    <tr>
        <td>1</td>
        <td>—</td>
    </tr>
    <tr>
        <td>2</td>
        <td>最大生命值: 300,000 hits</td>
    </tr>
    <tr>
        <td>3</td>
        <td>最大生命值: 1,000,000 hits</td>
    </tr>
    <tr>
        <td>4</td>
        <td>最大生命值: 3,000,000 hits</td>
    </tr>
    <tr>
        <td>5</td>
        <td>最大生命值: 10,000,000 hits</td>
    </tr>
    <tr>
        <td>6</td>
        <td>最大生命值: 30,000,000 hits</td>
    </tr>
    <tr>
        <td>7</td>
        <td>最大生命值: 100,000,000 hits</td>
    </tr>
    <tr>
        <td>8</td>
        <td>最大生命值: 300,000,000 hits</td>
    </tr>
    <tr>
        <td><strong>花费</strong></td>
        <td>1</td>
    </tr>
    <tr>
        <td><strong>建造完成时的生命值</strong></td>
        <td>1</td>
    </tr>
    <tr>
        <td><strong>老化</strong></td>
        <td>每 100 ticks 失去 300 hits</td>
    </tr>
    </tbody>
</table>

{% page inherited/OwnedStructure.md %}


{% api_property isPublic 'boolean' %}


当值为 false (默认) 时。只有你的 creep 能通过。当值为 true 时，任何玩家的 creep 都可以通过。



{% api_property ticksToDecay 'number' %}


还有多少 tick 就要因老化而失去生命值。



{% api_method setPublic 'isPublic' A %}



将该 rampart 的状态设置为开放，从而允许其他玩家的 creep 通过。

{% api_method_params %}
isPublic : boolean
该 rampart 是否开放
{% endapi_method_params %}


### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是这个建筑的拥有者。
{% endapi_return_codes %}


