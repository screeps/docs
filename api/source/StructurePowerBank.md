# StructurePowerBank

<img src="img/powerBank.png" alt="" align="right" />

非玩家建筑。储存着超能资源，可以通过摧毁该建筑获得。攻击该建筑的 creep 每次攻击都会承受反弹回来的伤害。点击[本文](/power.html)了解更多关于超能的信息。

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td><strong>生命值</strong></td>
        <td>2,000,000</td>
    </tr>
    <tr>
        <td><strong>反弹伤害</strong></td>
        <td>50%</td>
    </tr>
    <tr>
        <td><strong>容量</strong></td>
        <td>500 — 10,000</td>
    </tr>
    <tr>
        <td><strong>老化</strong></td>
        <td>5,000 ticks</td>
    </tr>
    </tbody>
</table>

{% page inherited/Structure.md %}


{% api_property power 'number' %}



储存的 power 容量。



{% api_property ticksToDecay 'number' %}



该建筑还有多少 tick 就要因老化而消失。
