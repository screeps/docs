---
title: 第三方工具
---

Screeps 拥有一个活跃的第三方开发社区，该社区已经构建了许多的工具、库和 web 应用。如果您有一个工具想要在此处列出，请随时编辑本文。

{% note warn 谨慎使用 %}

*   切勿将您的密码泄露给第三方工具。
*   任何第三方工具都是使用非官方 API 构建的，并且可能随时停止服务或更新。
*   任何第三方工具的运行风险均由您自己承担 - 游戏开发者并不会对其进行审查，并且可能会导致无法预料的问题。
{% endnote %}

**译者注**：下述项目中有很多已经停止更新多年了，请在使用前注意其最后更新时间。

## 语言支持

您可以设置一个外部编译器以使用其他语言编写您的 Screep AI。

### TypeScript

*   [screeps-typescript-starter](https://github.com/screepers/screeps-typescript-starter) 是想要使用 TypeScript 进行编程的玩家的起点。
*   [typed-screeps](https://github.com/screepers/typed-screeps) 是涵盖了 Screeps API 的 TypeScript 声明。

### Python

*   [screeps-starter-python](https://github.com/daboross/screeps-starter-python/) 是一个用于在 Python 上运行 Screeps 代码的平台。

### Rust

*   [screeps-starter-rust](https://github.com/daboross/screeps-starter-rust) 是一个内测阶段的平台，借助它您将可以使用 Rust 来编写 Screeps 代码。

### Kotlin

* [screeps-kotlin](https://github.com/exaV/screeps-kotlin) 是使用了 Kotlin 的游戏代码示例。
* [screeps-kotlin-starter](https://github.com/exaV/screeps-kotlin-starter) 是想要使用 Kotlin 进行编程的玩家的起点。
* [screeps-kotlin-types](https://github.com/exaV/screeps-kotlin-types) 是涵盖了 Screeps API 的 Kotlin 声明。

## API 客户端

该 Screeps API 并不是官方的，并且随时可能更改。这些客户端由社区维护，并用于生成本文中介绍的许多服务和程序。

*   [python](https://github.com/screepers/python-screeps)
*   [node](https://github.com/screepers/node-screeps-api)


## 应用

*   [Screeps Monitor](https://play.google.com/store/apps/details?id=com.danielscholte.screepsmonitor) 是一款 Android 应用，可为玩家提供帐户和游戏统计信息，以及完整的消息客户端和市场历史记录。（已失效）


## 备份

*   [screeps-backup](https://github.com/screepers/screeps-backup) 是一个用于备份还原内存及分段的简单实用程序。


## 控制台

*   [screeps_console](https://github.com/screepers/screeps_console) 是使用 python 构建的独立交互式控制台。它支持常见的控制台键盘快捷键，具有许多内置命令，并且具有明暗主题。同时也包括一个非交互式版本。


## 分析器

*   [gdborton's profiler](https://github.com/gdborton/screeps-profiler) 是基于函数包装的检查器，在发现性能问题时非常有用。


## 编程工具

*   [closure-compiler-externs](https://github.com/screepers/screeps-closure-compiler-externs) 定义了 Screeps API，以便闭包不会重写这些调用。
*   [ScreepsAutocomplete](https://github.com/Garethp/ScreepsAutocomplete) 提供 Screeps API 的自动补全。
*   [screeps-server-mockup](https://github.com/Hiryus/screeps-server-mockup) 用于单元测试的私有服务器包。


## 通知

*   [Screeps Notify](https://github.com/screepers/screeps_notify) 提供一套游戏内接口，使玩家可以将消息发送到游戏外的服务器。它内置有SMS系统，并且支持将消息发送到任意 http 端点。


## 统计

Screeps 是不断运行的，作为玩家不可能看到每件事的发生。还有一些问题并不会在玩家进行游戏的时候出现，而是在观察长期趋势时才会暴露出来。这就是为什么 Screeps 中最流行的应用是用于跟踪统计信息的。

*   [ScreepsPlus Grafana](https://screepspl.us/services/grafana) 是 [ags131]() 使用 Grafana 编写的一个服务。它会通过代理来收集信息从而避免密码泄露。
*   [screeps-stats](https://github.com/screepers/screeps-stats) 将控制台数据和统计信息存储在 elasticsearch 中，并使用 kibana 进行可视化。该系统利用内存分段来减少存储大量数据可能导致的游戏消耗。这是一项自托管服务。
*   [screeps-grafana](https://github.com/screepers/screeps-grafana) 是一个老牌统计工具。它使用 Grafana 进行前端展示。和 screeps-stats 一样，它也是个自托管服务。
*   [screeps-ConsoleStats](https://github.com/screepers/screeps-ConsoleStats) 提供了无需外部服务的统计信息。


## 上传工具

使用下列命令行程序将您的代码推送至服务器。

*   [grunt-screeps](https://github.com/screeps/grunt-screeps) 由 Screeps 官方团队编写和维护。它使用 [Grunt](https://gruntjs.com/) 来将代码推送到 screeps 服务器。
*   [gulp-screeps](https://github.com/screepers/gulp-screeps) 使用 [Gulp](http://gulpjs.com/) 将代码推送到 screeps 服务器。


## Web 客户端拓展

javascript 拓展插件，需要提前安装诸如 [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) 和 [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) 之类的基础插件。

*   [Alliance Overlay](https://raw.githubusercontent.com/LeagueOfAutomatedNations/loan-browser-ext/master/dist/alliance-overlay.user.js) 将 [League of Automated Nations](http://www.leagueofautomatednations.com/map) 的相关信息显示在游戏地图上。
*   [Room Claim Assistant](https://github.com/Esryok/screeps-browser-ext/raw/master/room-claim-assistant.user.js) 颜色拓展了 "Owner Control Level" 来使得房间的选择更加轻松。它将 mineral 添加到了视图中，将拥有两个 source 的房间标记为绿色，已占领或已预订的房间标记为红色，被其他玩家“签名”的房间将标记为橙色。
*   [Visible Room Tracker](https://github.com/Esryok/screeps-browser-ext/blob/master/visible-room-tracker.user.js) 会自动设置您当前查看房间的 memory，使您能够完成诸如”仅在需要时打开可视化“之类的操作。
*   [ScreepsSC](https://github.com/stybbe/Screeps-SC) 是一个 Chrome 扩展程序，它添加了新功能并在 Screeps 网站上提供了更多信息。 一些功能包括使市场历史更具可读性，添加战斗雷达，让用户查看其他玩家的 creep 名字以及优化排行榜。