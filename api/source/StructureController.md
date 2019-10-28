# StructureController

<img src="img/controller.png" alt="" align="right" />

占领(claim) 这个建筑来控制其所在的房间。控制器无法被攻击或摧毁。

你可以通过 [`Room.controller`](#Room.controller) 属性来快速访问到它。

<table class="table gameplay-info">
    <tbody>
    <tr>
        <th><strong>等级</strong></th>
        <th>升级至下个等级</th>
        <th>降级时间</th>
    </tr>
    <tr>
        <td>1</td>
        <td>200 energy</td>
        <td>20,000 ticks</td>
    </tr>
    <tr>
        <td>2</td>
        <td>45,000 energy</td>
        <td>10,000 ticks</td>
    </tr>
    <tr>
        <td>3</td>
        <td>135,000 energy</td>
        <td>20,000 ticks</td>
    </tr>
    <tr>
        <td>4</td>
        <td>405,000 energy</td>
        <td>40,000 ticks</td>
    </tr>
    <tr>
        <td>5</td>
        <td>1,215,000 energy</td>
        <td>80,000 ticks</td>
    </tr>
    <tr>
        <td>6</td>
        <td>3,645,000 energy</td>
        <td>120,000 ticks</td>
    </tr>
    <tr>
        <td>7</td>
        <td>10,935,000 energy</td>
        <td>150,000 ticks</td>
    </tr>
    <tr>
        <td>8</td>
        <td>—</td>
        <td>200,000 ticks</td>
    </tr>
    </tbody>
</table>
	
### 安全模式
	
<table class=gameplay-info>
    <tbody>
    <tr>
        <td style="width:60px;"><strong>效果</strong></td>
        <td>阻止本房间中的所有敌对 creep 的 <code>attack</code>, <code>rangedAttack</code>, <code>rangedMassAttack</code>, <code>dismantle</code>, <code>heal</code>, <code>rangedHeal</code>, <code>attackController</code> and <code>withdraw</code> 方法。同一时间内只能有一个房间激活安全模式。<br/>
    当安全模式被激活时，所有的敌对 creep 都将变透明并且可通过, 您的 creep 可以自由的穿过他们 (反之亦然)。</td>
    </tr>
    <tr>
        <td style="width:60px;"><strong>持续时间</strong></td>
        <td>20,000 ticks</td>
    </tr>
    <tr>
        <td style="width:60px;"><strong>冷却时间</strong></td>
        <td>50,000 ticks (新手区 (Novice Areas) 以及您第一个房间的初始安全模式都没有冷却时间)</td>
    </tr>
    <tr>
        <td style="width:60px;"><strong>获取途径</strong></td>
        <td>
            <ul>
                <li>每次控制器升级时提供一次可用次数</li>
                <li>可以使用 1,000 ghodium 化合物来生成一个可用次数</li>
                <li>控制器降级时将会重置所有可用次数</li>
            </ul>
        </td>
    </tr>
    </tbody>
</table>

{% page inherited/OwnedStructure.md %}

{% api_property isPowerEnabled 'boolean' %}
该房间是否启用了超能 (power)。使用 [`PowerCreep.enableRoom`](#PowerCreep.enableRoom) 来启用超能。

{% api_property level 'number' %}



当前的控制器等级，从 0 到 8。



{% api_property progress 'number' %}



当前控制器升级到下个等级的进度。



{% api_property progressTotal 'number' %}



控制器升级到下个等级所需的总进度。



{% api_property reservation 'object' %}



如果控制器被预定，则该对象表示预定的信息:

{% api_method_params %}
username : string
预定了该房间的玩家名称。
===
ticksToEnd : number
预定时间还有多少 tick 结束。
{% endapi_method_params %}


{% api_property safeMode 'number' %}



安全模式还有多少 tick 结束。没激活安全模式时返回 undefined。



{% api_property safeModeAvailable 'number' %}



可用的安全模式激活次数。



{% api_property safeModeCooldown 'number' %}



安全模式的冷却时间还有多少 tick。冷却结束前将无法激活安全模式，当安全模式没有冷却时返回 undefined。



{% api_property sign 'object' %}



如果控制器被签名，则该对象表示签名的信息：

{% api_method_params %}
username : string
将控制器签名的玩家名称。
===
text : string
签名的文本内容。
===
time : number
进行签名的游戏 tick 时间。
===
datetime : Date
进行签名的现实时间。
{% endapi_method_params %}


{% api_property ticksToDowngrade 'number' %}



该控制器还有多少 tick 就将降级。当控制器升级或者降级时, 该计时器将被设置为总降级时间的 50%。可以使用 <code><a href="#Creep.upgradeController">Creep.upgradeController</a></code> 来增加该计时器的时间。控制器想要升级必须先保证该计时器满额。



{% api_property upgradeBlocked 'number' %}



还有多少 tick 就能从控制器被攻击从而无法升级的状态中恢复过来。在此期间安全模式也不可用。



{% api_method activateSafeMode '' A %}

```javascript
room.controller.activateSafeMode();
```

激活安全模式 (如果有的话)。



### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是该控制器的所有者。
ERR_BUSY | 已经有其他房间处于安全模式下了。
ERR_NOT_ENOUGH_RESOURCES | 没有足够的可用激活次数。
ERR_TIRED | 上一个安全模式仍在冷却中，或者控制器正处于 `upgradeBlocked` 状态，或者控制器的降级计时器已经超过了 50% + 5000 tick 甚至更久。
{% endapi_return_codes %}



{% api_method unclaim '' A %}

```javascript
room.controller.unclaim();
```

放弃该房间，使得控制器重新变为中立状态。



### 返回值

如下错误码之一：
{% api_return_codes %}
OK | 这个操作已经成功纳入计划。
ERR_NOT_OWNER | 你不是该控制器的所有者。
{% endapi_return_codes %}


