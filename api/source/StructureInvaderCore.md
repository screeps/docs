# StructureInvaderCore

<img src="img/invaderCore.png" alt="" align="right" />

该 NPC 建筑是 NPC 要塞的控制中心，并且也统治这本区块中的所有入侵者。它会孵化要塞中的 NPC 守卫，重新装填 tower 以及修复建筑。
当它存在的时候，本区块中的所有房间都将会生成入侵者。它其中也储藏着一些有价值的资源，当您摧毁该建筑时，就可以从它的废墟(ruin)中搜刮这些资源。

一个入侵者核心 (Invader Core) 包含两个生命周期阶段：部署阶段和活动阶段。当它刚刚出现在本区块的某个随机房间中时，会包含一个 `ticksToDeploy` 属性，
周围在其周围的开放 rampart，并且也不会执行任何操作。在该阶段中，它将无法被攻击 (效果 `EFFECT_INVULNERABILITY` 生效)。当 `ticksToDeploy` 计时器结束的时候，它将解除无法被攻击的状态，并会在周围生成建筑和孵化 creep。与此同时，它将获得 `EFFECT_COLLAPSE_TIMER` 效果，在该计时器结束时，该要塞将会被移除。

一个活动的入侵者核心会在其相邻的房间中生成等级为 0 的小型入侵者核心。这些较小的核心会出现在房间控制器的附近，并且只会攻击和预定控制器。一个入侵者核心一生中最多只能产生 10 个小型核心。

<table class="table gameplay-info">
    <tbody>
    <tr>
        <td><strong>部署时间</strong></td>
        <td>5,000 ticks</td>
    </tr>
    <tr>
        <td><strong>活跃时间</strong></td>
        <td>80,000 ticks</td>
    </tr>
    <tr>
        <td><strong>生成小型核心</strong></td>
        <td>每 2,000 ticks</td>
    </tr>
    <tr>
        <td><strong>生命值</strong></td>
        <td>100,000</td>
    </tr>
    
    </tbody>
</table>

{% page inherited/OwnedStructure.md %}


{% api_property level 'number' %}
                                                                
此要塞的等级。该等级也决定了战利品的数量和质量。

{% api_property ticksToDeploy 'number' %}
                                                                                                                
部署阶段的计时器，在要塞尚未部署完成时显示，否则为 undefined。
