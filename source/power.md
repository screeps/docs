title: 超能
---

超能是是一种游戏后期的机制，在你的领地发展中开启一段全新的旅程：通过提高效率替代扩大领地规模。它的基本内容如下：

* 你开采一种叫做“超能”的特殊资源。

* 这项资源可以在8级以上的房间处理，并增加你的**全局超能等级（Global Power Level GPL）**

* 全局超能等级GPL允许你创造**超能creep（Power Creeps PC）**，一种特殊的英雄单位，可以升级和获得技能。 

## 超能宝库

![](img/power_banks.gif)

超能可以从叫作[超能宝库（Power Bank）](/api/#StructurePowerBank)的建筑物中收集，它时常出现在划分活动区域的中立空房间里。每个超能宝库包含随机数量的超能，摧毁该建筑可以获取它。由于这些建筑具有高能量的属性，它将会反弹所受伤害的50%给攻击它的creep，因此需要一些治疗者在你的队伍中。

你也可以从市场中买到超能，无论是其他玩家还是NPC商人。

## Global Power Level

![](img/gpl.png) 

8级的房间将会解锁叫[超能母巢Power Spawn](/api/#StructurePowerSpawn)的建筑。它允许执行[`StructurePowerSpawn.processPower`](/api/#StructurePowerSpawn.processPower)方法。将50个单位的能量合成一个单位的超能，你可以增加你的**全局超能等级GPL**。通过提升等级，你将会解锁开发**超能creep（PC）**的能力。

你可以在游戏中的[预览页面](https://screeps.com/a/#!/overview)查看你的全局超能等级GPL。或者使用API[`Game.gpl`](/api/#Game.gpl)的属性。

## 超能Creeps

<video autoplay loop muted playsinline>
    <source src="img/pc_anim.mp4" type="video/mp4">
</video>

[超能creep Power Creeps](/api/#PowerCreep) (PC)和游戏中的常规creep不同，类似于策略游戏中的英雄单位。

超能creep是不休的。一个新建造的超能creep将会你的账号绑定，甚至在还没被招募到游戏世界的时候就存在账号里了。在它死后（老死或者手动强制死亡），它只是会返回你的账号中，等待8小时的冷却后，你仍然可以在任何一个超能母巢中再次招募它。

超能creep有以下三种类型：

<table>
<tr>
<td style="padding: 10px; background: #141414"><img src="img/operator.png"></td>
<td><strong>操作员Operator</strong><br>
一种在后方基地工作的creep，虽然它可以在进攻时作为破坏者使用。
</td>
</tr>
<tr style="background: none">
<td style="padding: 10px; background: #141414"><img src="img/commander.png"></td>
<td><strong>司令官Commander</strong><br>
这种超能creep是团队辅助，单独使用时发挥不出来。它可以给己方常规creep施加增益效果，给敌方常规creep施加减益效果。
</td>
</tr>
<tr>
<td style="padding: 10px; background: #141414"><img src="img/executor.png"></td>
<td><strong>执行官Executor</strong><br>
这种类型的creep偏向于单独使用，由于它的技能，将会使你的经济更有效率或者作为一个战争机器在进攻和防守时。
</td>
</tr> 
</table> 

超能creep 拥有0到25个等级和技能（也就是所谓的“**超能力**”），每当升一次级，你可以添加一项新的技能，或者提升现有技能的等级。

你需要至少一个空余的全局超能等级GPL才能提升现有超能creep的等级，同样的你也需要一个空余的全局超能等级GPL创建一个新的0级超能creep。

你可以在m没有控制器的任何房间使用超能creep的技能，或者在有power-enabled控制器的房间使用（详见 [`PowerCreep.enableRoom`](/api/#PowerCreep.enableRoom)）。

虽然超能creep有寿并且会老死。但是你可以在任何超能母巢或者超能宝库附近执行[`PowerCreep.renew`](/api/#PowerCreep.renew)，这将会无花费的恢复它的寿命。如果你能及时地找到超能池并恢复，它可以进行长距离移动。

{% note warn %}
<strong style="color: #f33">CAUTION</strong>: 你可以从你的账号中删除超能creep（为了释放更多空余全局超能等级GPL或者新造一个），但是这个操作会**降低你的全局超能等级1级**！这项移除工作需要24个小时。
{% endnote %}

如果您想要查看您的超能creep是如何配置的，并从头开始创建它们，请激活一个**试验期**。它将允许你在24小时之内瞬间无删除（不掉GPL等级）和创建你的超能creep。每个玩家被授予30个试验期。如果平衡性调整或者引入新技能导致玩家需要重新审视自己的超能creep配置时，我们将会不时的补充一些试验期数量。

## Powers

### Operator

{% powers operator %}

### Commander

Under development.

### Executor 

Under development. 
