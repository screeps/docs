---
title: Ubuntu 上使用 MongoDB 和 Redis 搭建私人服务器
贡献者:
    名字: tedivm
    链接: https://github.com/tedivm
    日期: 2018-02-07
---

Screeps 游戏引擎是 [开源](https://github.com/screeps/screeps) 的, 因此允许任何人自己运行私人服务器。 Screeps 的 Steam 客户端甚至提供了一套工具以简化创建私人服务器的步骤

对于想要运行没有桌面环境系统(比如在 Linode 或是 AWS 上运行)的玩家, 需要一些额外的工作才能获得一个稳定的服务器, 特别是内建的 LokiJS 引擎不能很好地随着时间推移扩展。这篇教程会知道您使用 MongoDB 和 Redis 在专有环境中安装 Screeps。


## 先决条件

### 服务器

这篇文章假设用户运行 Ubuntu 16。建议服务器至少有两个 CPU 内核和 2GB 内存, 尽管对于单个用户和几个 bot 来说，单核并拥有 2GB 内存的机器会在合理的 tick 速度运行
由于系统往往非常占用 CPU, 因此建议您避免使用不提供常量 CPU 的 "burstable" 服务器, 比如 AWS t2 系列。


### 构建工具

以下步骤将需要一些常见的构建和开发工具，我们将在此处安装。

```shell
sudo apt install -y build-essential tcl git
```


### 安装 Node.js

主要游戏世界在 Node.js 8 上运行, 但是 Ubuntu 只提供了一个更老的版本, Node.js 6。幸运的是, 我们可以使用另一个 apt 存储库来获得最新版本

```shell
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt install -y nodejs
```


### 安装 MongoDB

Ubuntu 存储库中的 MongoDB 版本非常老。 MongoDB维护一个包含更新版本的apt存储库, 因此第一步是配置它。

```shell
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
sudo apt update
```

现在我们可以安装 MonboDB

```shell
sudo apt-get install -y mongodb-org
```

默认情况下 MongoDB 不会在系统启动时运行, 所以我们继续修复它。

```shell
sudo systemctl start mongod
sudo systemctl enable mongod
```


### 安装 Redis

与上面的 MongoDB 示例一样, Redis 的发行版版本非常过时, 但在这种情况下, 可以使用PPA而不是项目的官方apt存储库。 这个 PPA 维护得很好, 甚至被 redis 开发人员"祝福"了。


`software-properties-common` 提供了 `add-apt-repository`, 允许我们跳过几个配置 PPA 的手动步骤。

```bash
sudo apt install software-properties-common
sudo add-apt-repository ppa:chris-lea/redis-server
sudo apt update
sudo apt install redis-server
```

就是这样! Redis 服务器非常简单, apt 包会负责它保持运行。


## Screeps 服务器

## 创建 Screeps 用户


我们将在接下来的步骤中创建一个新的用户, `screeps`, 然后将服务器设置在那个用户和用户组下。由于这个用户不会拥有 sudo 权限并不需要登录, 我们将不为它设置密码。

```shell
sudo adduser --disabled-password --gecos "" screeps
```

接下来我们将切换到那个用户并完成安装的剩下部分。由于我们不能直接通过它登录, 我们需要用 `su` 命令来切换用户。 您会希望在想要以 `screeps` 用户身份运行的任何时候记住这一点, 例如在服务器上调试或安装新 mod 时。

```shell
sudo su screeps
```

### 配置服务器环境

现在先决条件已经满足并有了新用户, 我们可以为您的游戏世界创建独一无二的服务器环境。

在这个步骤中, 你会需要一个 Steam API Key, 你可以在 [这里](https://steamcommunity.com/dev/apikey) 免费获取。

```shell
mkdir ~/world
cd ~/world
npm install screeps
npx screeps init
```

`Init` 指令创建了服务器配置文件 `.screepsrc`。 您应该仔细阅读这个已经很好地创建的文件, 您唯一可能想要更改的内容是 `runners_cnt` 和 `processors_cnt`。 在相对较小的系统中(比如 2 个 CPU 核心), 您需要将它们设置成你可用的核心数量, 但是在更大的系统上, 您可能会想保留 1-2 个 空余的核心给 MongoDB 使用。 如果您想在一台服务器上运行多个游戏世界, 您应该确保限制每个世界的 `runners_cnt` 和 `processors_cnt` 以确保它们的总和不会超过您系统上的处理器数量。


### 安装服务器 Mod

我们将安装几个 mod 以启用新的后端并使得服务器更容易使用和管理

* [screepsmod-mongo](https://github.com/ScreepsMods/screepsmod-mongo) 用 MongoDB 和 Redis 的存储解决方案替换内置的 LokiJS。
* [screepsmod-auth](https://github.com/ScreepsMods/screepsmod-auth) 允许玩家设置登录密码, 允许通过第三方工具登录。
* [screepsmod-tickrate](https://github.com/ScreepsMods/screepsmod-tickrate) 允许服务器管理员通过 screeps cli 更改最小 tick 速度。
* [screepsmod-admin-utils](https://github.com/ScreepsMods/screepsmod-admin-utils) 为 screeps cli 添加了一些有用的功能。
* [screepsmod-features](https://github.com/ScreepsMods/screepsmod-features) 公开了服务器支持功能的列表。

我们可以用一个简单的命令(以 `screeps` 用户运行)同时安装以上 Mod。

```shell
npm install screepsmod-mongo screepsmod-auth screepsmod-tickrate screepsmod-admin-utils screepsmod-features
```

然后确认 `mods.json` 文件如下:

```json
{
  "mods": [
    "node_modules/screepsmod-mongo/index.js",
    "node_modules/screepsmod-auth/index.js",
    "node_modules/screepsmod-tickrate/index.js",
    "node_modules/screepsmod-admin-utils/index.js",
    "node_modules/screepsmod-features/index.js"
  ],
  "bots": {
    "simplebot": "node_modules/@screeps/simplebot/src"
  }
}
```

### 初始化数据库

由于我们更改了默认的存储引擎, 我们需要初始化新的数据库。

在一个终端中您需要手动启动 Screeps 服务器。 你仍然需要以 `screeps` 用户运行。

```bash
cd ~/world
npx screeps start
```

现在在另一个终端中打开 Screeps CLI 工具并重置数据

```bash
sudo su screeps
cd ~/world
npx screeps cli
> system.resetAllData()
```

现在您应该在第一个终端中停止 Screeps 服务器

这是您需要通过 `screeps` 用户做的最后一件事, 我们现在可以切换回主要用户。

```bash
exit
```

### 配置服务

现在我们有了一个正常运行的 Screeps 服务器, 我们回想要确保它保持运行, 包括在重启系统后。 由于我们运行 Ubuntu 16, 我们可以通过一个简单的 systemd 服务文件来实现这个目的。

作为 root 用户 (不是 `screeps`!) 打开 `/etc/systemd/system/screeps-world.service`。

```shell
sudo nano /etc/systemd/system/screeps-world.service
```

写入以下内容:

```ini
[Unit]
Description=Screeps Server (world)
Wants=network-online.target
After=network-online.target

[Service]
Type=simple
WorkingDirectory=/home/screeps/world
ExecStart=/home/screeps/world/node_modules/screeps/bin/screeps.js start
User=screeps
Group=screeps

[Install]
WantedBy=multi-user.target
```


这个文件告诉系统 Screeps 服务器需要网络, 应该以 `screeps` 用户和用户组运行, 以及启动服务器的文件路径和启动服务器的指令。

告诉 systemd 加载我们创建的新服务:

```shell
sudo systemctl daemon-reload
```

现在我们可以启动服务器, 并告诉 systemd 永远在启动机器后启动它。

```shell
sudo systemctl start screeps-world
sudo systemctl enable screeps-world
```
