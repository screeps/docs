---
title: Ubuntu 上使用 MongoDB 和 Redis 搭建私人服务器
贡献者:
    名字: tedivm
    链接: https://github.com/tedivm
    日期: 2018-02-07
---

The Screeps engine is [Open Source](https://github.com/screeps/screeps), allowing people to run Private Servers on their own. The Steam Client even provides a tool to make launching private servers easier.
Screeps 游戏引擎是 [开源](https://github.com/screeps/screeps) 的, 因此允许任何人自己运行私人服务器。 Screeps 的 Steam 客户端甚至提供了一套工具以简化创建私人服务器的步骤

For players who want to run a headless server (one without a desktop or windows system, such as when running on Linode or AWS) a little more work is needed to get a reliable server, especially since the built in LokiJS engine does not scale well over time. This tutorial will guide you through installing Screeps in dedicated environment with MongoDB and redis.
对于想要运行没有桌面环境系统(比如在 Linode 或是 AWS 上运行)的玩家, 需要一些额外的工作才能获得一个稳定的服务器, 特别是内建的 LokiJS 引擎不能很好地随着时间推移扩展。这篇教程会知道您使用 MongoDB 和 Redis 在专有环境中安装 Screeps。


## Prerequisites
## 先决条件

### Server
### 服务器

This article assumes the user is running Ubuntu 16. It is recommended that the machine have at least two cores and 2gb of ram, although for single players and a couple of bots a one core 2gb machine will work with reasonable tick speeds.
这篇文章假设用户运行 Ubuntu 16。建议服务器至少有两个 CPU 内核和 2GB 内存, 尽管对于单个用户和几个 bot 来说，单核并拥有 2GB 内存的机器会在合理的 tick 速度运行

As the system tends to be very CPU intensive it is recommended that you avoid "burstable" servers that don't provide constant cpu, such as the AWS t2 line.
由于系统往往非常占用 CPU, 因此建议您避免使用不提供常量 CPU 的 "burstable" 服务器, 比如 AWS t2 系列。


### Build Tools
### 构建工具

The following steps will need some common build and development tools, which we'll install here.
以下步骤将需要一些常见的构建和开发工具，我们将在此处安装。

```shell
sudo apt install -y build-essential tcl git
```


### Install Node
### 安装 Node.js

The main world runs on Node8, but Ubuntu only provides an older version of Node6. Fortunately there is another apt repository we can use to get the most up to date versions.
主要游戏世界在 Node.js 8 上运行, 但是 Ubuntu 只提供了一个更老的版本, Node.js 6。幸运的是, 我们可以使用另一个 apt 存储库来获得最新版本

```shell
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt install -y nodejs
```


### Install Mongo
### 安装 MongoDB

The version of MongoDB in the Ubuntu repositories is remarkably old. MongoDB maintains an apt repository with updated versions, so the first step will be configuring that.
Ubuntu 存储库中的 MongoDB 版本非常老。 MongoDB维护一个包含更新版本的apt存储库, 因此第一步是配置它。

```shell
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
sudo apt update
```

Now we can install MongoDB.
现在我们可以安装 MonboDB

```shell
sudo apt-get install -y mongodb-org
```

By default MongoDB is not running or set to start on boot, so lets go ahead fix that.
默认情况下 MongoDB 不会在系统启动时运行, 所以我们继续修复它。

```shell
sudo systemctl start mongod
sudo systemctl enable mongod
```


### Install redis
### 安装 Redis

Like the Mongo example above the distro version of redis is extremely outdated, but in this case there is a PPA available rather than an official apt repository for the project. This PPA is well maintained and has even been "blessed" by the redis developers.
与上面的 MongoDB 示例一样, Redis 的发行版版本非常过时, 但在这种情况下, 可以使用PPA而不是项目的官方apt存储库。 这个 PPA 维护得很好, 甚至被 redis 开发人员"祝福"了。


The `software-properties-common` gives us `add-apt-repository`, which will allow us to skip several manual steps for setting up a PPA.
`software-properties-common` 提供了 `add-apt-repository`, 允许我们跳过几个配置 PPA 的手动步骤。

```bash
sudo apt install software-properties-common
sudo add-apt-repository ppa:chris-lea/redis-server
sudo apt update
sudo apt install redis-server
```

That's it! The redis server is remarkably simple and the apt package takes care of making sure it stays running.
好了! Redis 服务器非常简单, apt 包会负责它保持运行。


## Screeps Server
## Screeps 服务器

### Create Screeps User
## 创建 Screeps 用户

For the next steps we're going to create a new user, `screeps`, and then setup the server under that user and group. Since this user will not have sudo access or need to log in we will created it without a password.
我们将在接下来的步骤中创建一个新的用户, `screeps`, 然后将服务器设置在那个用户和用户组下。由于这个用户不会拥有 sudo 权限并不需要登录, 我们将不为它设置密码。

```shell
sudo adduser --disabled-password --gecos "" screeps
```

Next we change to that user and run the rest of the setup. Since we can not log in as the user directly we have to use the `su` command to change users. You'll want to remember this for any time you want to run as the screeps user, such as when debugging or installing new mods on your server.
接下来我们将切换到那个用户并完成安装的剩下部分。由于我们不能直接通过它登录, 我们需要用 `su` 命令来切换用户。 您会希望在想要以 `screeps` 用户身份运行的任何时候记住这一点, 例如在服务器上调试或安装新 mod 时。

```shell
sudo su screeps
```

### Setup Server Environment
### 配置服务器环境

Now that the prerequisites and user are created we can create the unique server environment for your world.
现在先决条件已经满足并创建了新用户, 我们可以为您的游戏世界创建独一无二的服务器环境。

During this step you will need a Steam API Key, which you can obtain [from here](https://steamcommunity.com/dev/apikey) for free.
在这个步骤中, 你会需要一个 Steam API Key, 你可以在 [这里]（https://steamcommunity.com/dev/apikey） 免费获取。

```shell
mkdir ~/world
cd ~/world
npm install screeps
npx screeps init
```

The `init` call creates the configuration for your server in `.screepsrc`. You should read through this file, which is pretty well documented, but the only things you will likely want to change are `runners_cnt` and `processors_cnt`. On a smaller system (two cores) you'll want to set these to the number of processor cores available, but on larger systems you may want to leave a core or two free for use by MongoDB. If you want to run multiple worlds on the same server you should make sure to limit each server so their total combined `runners_cnt` and total combined `processors_cnt` values do not exceed the number of processors on the system.
`Init` 指令创建了服务器配置文件 `.screepsrc`。 您应该仔细阅读这个已经很好地创建的文件, 您唯一可能想要更改的内容是 `runners_cnt` 和 `processors_cnt`。 在相对较小的系统中(比如 2 个 CPU 核心), 您需要将它们设置成你可用的核心数量, 但是在更大的系统上, 您可能会想保留 1-2 个 空余的核心给 MongoDB 使用。 如果您想在一台服务器上运行多个游戏世界, 您应该确保限制每个世界的 `runners_cnt` 和 `processors_cnt` 以确保它们的总和不会超过您系统上的处理器数量。


### Install Server Mods
### 安装服务器 Mod

There are a few mods we'll be installing to enable the new backend and make the server easier to use and manage.
我们将安装几个 mod 以启用新的后端并使得服务器更容易使用和管理

* [screepsmod-mongo](https://github.com/ScreepsMods/screepsmod-mongo) replaces the LokiJS based storage with a mongodb and redis solution.
* [screepsmod-mongo](https://github.com/ScreepsMods/screepsmod-mongo) 用 MongoDB 和 Redis 的存储解决方案替换内置的 LokiJS。
* [screepsmod-auth](https://github.com/ScreepsMods/screepsmod-auth) allows players to set a password that can be used to log into the server with third party tools.
* [screepsmod-auth](https://github.com/ScreepsMods/screepsmod-auth) 允许玩家设置登录密码, 允许通过第三方工具登录。
* [screepsmod-tickrate](https://github.com/ScreepsMods/screepsmod-tickrate) lets the server admin modify the minimum tick rate on the fly from the screeps cli tool.
* [screepsmod-tickrate](https://github.com/ScreepsMods/screepsmod-tickrate) 允许服务器管理员通过 screeps cli 更改最小 tick 速度。
* [screepsmod-admin-utils](https://github.com/ScreepsMods/screepsmod-admin-utils) adds some useful functions to the screeps cli.
* [screepsmod-admin-utils](https://github.com/ScreepsMods/screepsmod-admin-utils) 为 screeps cli 添加了一些有用的功能。
* [screepsmod-features](https://github.com/ScreepsMods/screepsmod-features) exposes a list of features supported by the server.
* [screepsmod-features](https://github.com/ScreepsMods/screepsmod-features) 公开了服务器支持功能的列表。

We can install all of these at once with a simple command (still running as the user `screeps`).
我们可以用一个简单的命令(以 `screeps` 用户运行)同时安装以上 Mod。

```shell
npm install screepsmod-mongo screepsmod-auth screepsmod-tickrate screepsmod-admin-utils screepsmod-features
```

Then just confirm that the `mods.json` file looks like this-
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

### Initialize Database
### 初始化数据库

Because we switched away from the default storage engine we need to initialize the new databases.
由于我们更改了默认的存储引擎, 我们需要初始化新的数据库。

In one terminal you'll need to start the Screeps server manually. You'll want to do this as the user `screeps` still.
在一个终端中您需要手动启动 Screeps 服务器。 你仍然需要以 `screeps` 用户运行。

```bash
cd ~/world
npx screeps start
```

Now in another terminal open the Screeps CLI tool and reset the data.
现在在另一个终端中打开 Screeps CLI 工具并重置数据

```bash
sudo su screeps
cd ~/world
npx screeps cli
> system.resetAllData()
```

Now you should stop the Screeps server process in the first terminal.
现在您应该在第一个终端中停止 Screeps 服务器

That should be the last thing you need to do for now as the user `screeps`, so lets go back to your main user.
这是您需要通过 `screeps` 用户做的最后一件事, 我们现在可以切换回主要用户。

```bash
exit
```

### Setup Service
### 配置服务

Now that we have a working Screeps server we'll want to make sure it stays running, including through reboots. Since we're using Ubuntu 16 we can do this with a simple systemd service file.
现在我们有了一个正常运行的 Screeps 服务器, 我们回想要确保它保持运行, 包括在重启系统后。 由于我们运行 Ubuntu 16, 我们可以通过一个简单的 systemd 服务文件来实现这个目的。

As the root user (not `screeps`) open `/etc/systemd/system/screeps-world.service`.
作为 root 用户 (不是 `screeps`!) 打开 `/etc/systemd/system/screeps-world.service`。

```shell
sudo nano /etc/systemd/system/screeps-world.service
```

Give it the following contents-
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

This tells the system that the Screeps server will require networking, should run as the `screeps` user and group, what directory to start it in, and the startup command itself.
这个文件告诉系统 Screeps 服务器需要网络, 应该以 `screeps` 用户和用户组运行, 以及启动服务器的文件路径和启动服务器的指令。

We'll need to tell systemd to load the new service we just created-
告诉 systemd 加载我们创建的新服务:

```shell
sudo systemctl daemon-reload
```

Now we can start the server up, and then tell systemd to always start it after boots.
现在我们可以启动服务器, 并告诉 systemd 永远在启动机器后启动它。

```shell
sudo systemctl start screeps-world
sudo systemctl enable screeps-world
```
