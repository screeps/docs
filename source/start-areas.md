title: 开始区域
---

## 新手区
 
为了保护新玩家的发展起步，我们定期会在地图上划出临时区域。在地图上这些新手区会被标<font color="green"><b>绿</b></font>且当鼠标指针移动到区域内时，会弹出写有 “**Novice Area**” （新手区）字样的标签

![](img/novice.png)

以下为新手区的额外规则：

*   此区域由一条不间断的、不可摧毁的外墙环绕。没有玩家可以逾越此墙。[重生](respawn.html)是唯一进入新手区方法。
*   只有 [GCL](/control.html#提升GCL) 小于等于 3 的玩家才可在此区域出生。
*   玩家最多只能 [claim （占领）](/api/#Creep.claimController) 3 房间，但房间 [reservation（预定）](/api/#Creep.reserveController) 数不受限。
*   启用 [safe mode （安全模式）](/defense.html) 没有冷却时间。
*   无法使用 [Nukers （核弹发射井）](/api/#StructureNuker)。

当新手区倒计时结束，环绕新手区的墙将消失，房间不再被标绿，且额外规则解除。此刻，新手区回归为世界的一部分。区内玩家可选择向其他区域扩张，同时也得面对区外世界玩家的威胁。
Novice Areas have the day counter. After it runs out, the walls disappear, rooms lose the green mark, all the limitations are cancelled, and the sector becomes a regular part of the world. After zones are opened, residents can start outward expansion, but can also face invasion into their sectors. 

大多数新手由一个 sector （9x9 房间）构成。除了环绕整个 sector 的外墙，还有“十”字型的内墙将这个 sector 隔成 4 个小区。内墙会比外墙先消失，意味着一开始玩家只能在其小区内活动，几天后内墙消失才可以进入其他的小区。

## 重生区

类似新手区，地图上存在**重生区**（ Respawn Areas ），在地图上被标<font color="blue"><b>蓝</b></font>，与新手区不同的是，这些重生区只禁止使用[Nukers （核弹发射井）](/api/#StructureNuker)。任何 [GCL](control.html) 的玩家均可在此区域重生并占领其所 GCL 所允许的房间。

![chrome_2017-03-06_14-40-11.png](img/chrome_2017-03-06_14-40-11.png)

## 开始区域的规划

我们将会持续观察新手及重生区的玩家数并按需添加开始区域。开始区域一般会选址在较为空旷的 sector ，并不排除已有玩家的 sector 。

{% note info %}
如果玩家所在 sector 被规划成了开始区域，玩家可[reserve （保留）](/api/#Creep.reserveController)其不想被包括进开始区域的房间。
{% endnote %}

所有将被规划为开始区域的中立房间会被标注以下消息：

![chrome_2017-03-08_13-01-20.png](img/chrome_2017-03-08_13-01-20.png)

玩家可用游戏常数 `SYSTEM_USERNAME`, `SIGN_NOVICE_AREA`, 和 `SIGN_RESPAWN_AREA` 来在其代码中以检测房间是否被规划为开始区域。
**译者注：**若游戏将玩家所在的 sector 被规划为未来的开始区域，则其将会避开玩家的房间及使其通向外界的房间。
