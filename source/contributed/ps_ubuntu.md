---
title: Private server on Ubuntu using MongoDB and Redis
contributed:
    name: tedivm
    link: https://github.com/tedivm
    date: 2018-02-07
---

The Screeps engine is [Open Source](https://github.com/screeps/screeps), allowing people to run Private Servers on their own. The Steam Client even provides a tool to make launching private servers easier.

For players who want to run a headless server (one without a desktop or windows system, such as when running on Linode or AWS) a little more work is needed to get a reliable server, especially since the built in LokiJS engine does not scale well over time. This tutorial will guide you through installing Screeps in dedicated environment with MongoDB and redis.


## Prerequisites

### Server

This article assumes the user is running Ubuntu 16. It is recommended that the machine have at least two cores and 2gb of ram, although for single players and a couple of bots a one core 2gb machine will work with reasonable tick speeds.

As the system tends to be very CPU intensive it is recommended that you avoid "burstable" servers that don't provide constant cpu, such as the AWS t2 line.


### Build Tools

The following steps will need some common build and development tools, which we'll install here.

```shell
sudo apt install -y build-essential tcl git curl
```


### Install Node

The main world runs on Node8, but Ubuntu only provides an older version of Node6. Fortunately there is another apt repository we can use to get the most up to date versions.

```shell
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt install -y nodejs
```


### Install Mongo

The version of MongoDB in the Ubuntu repositories is remarkably old. MongoDB maintains an apt repository with updated versions, so the first step will be configuring that.

```shell
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
sudo apt update
```

Now we can install MongoDB.

```shell
sudo apt-get install -y mongodb-org
```

By default MongoDB is not running or set to start on boot, so lets go ahead fix that.

```shell
sudo systemctl start mongod
sudo systemctl enable mongod
```


### Install redis

Like the Mongo example above the distro version of redis is extremely outdated, but in this case there is a PPA available rather than an official apt repository for the project. This PPA is well maintained and has even been "blessed" by the redis developers.

The `software-properties-common` gives us `add-apt-repository`, which will allow us to skip several manual steps for setting up a PPA.

```bash
sudo apt install software-properties-common
sudo add-apt-repository ppa:chris-lea/redis-server
sudo apt update
sudo apt install redis-server
```

That's it! The redis server is remarkably simple and the apt package takes care of making sure it stays running.


## Screeps Server

### Create Screeps User

For the next steps we're going to create a new user, `screeps`, and then setup the server under that user and group. Since this user will not have sudo access or need to log in we will created it without a password.

```shell
sudo adduser --disabled-password --gecos "" screeps
```

Next we change to that user and run the rest of the setup. Since we can not log in as the user directly we have to use the `su` command to change users. You'll want to remember this for any time you want to run as the screeps user, such as when debugging or installing new mods on your server.

```shell
sudo su screeps
```

### Setup Server Environment

Now that the prerequisites and user are created we can create the unique server environment for your world.

During this step you will need a Steam API Key, which you can obtain [from here](https://steamcommunity.com/dev/apikey) for free.

```shell
mkdir ~/world
cd ~/world
npm install screeps
npx screeps init
```

The `init` call creates the configuration for your server in `.screepsrc`. You should read through this file, which is pretty well documented, but the only things you will likely want to change are `runners_cnt` and `processors_cnt`. On a smaller system (two cores) you'll want to set these to the number of processor cores available, but on larger systems you may want to leave a core or two free for use by MongoDB. If you want to run multiple worlds on the same server you should make sure to limit each server so their total combined `runners_cnt` and total combined `processors_cnt` values do not exceed the number of processors on the system.


### Install Server Mods

There are a few mods we'll be installing to enable the new backend and make the server easier to use and manage.

* [screepsmod-mongo](https://github.com/ScreepsMods/screepsmod-mongo) replaces the LokiJS based storage with a mongodb and redis solution.
* [screepsmod-auth](https://github.com/ScreepsMods/screepsmod-auth) allows players to set a password that can be used to log into the server with third party tools.
* [screepsmod-tickrate](https://github.com/ScreepsMods/screepsmod-tickrate) lets the server admin modify the minimum tick rate on the fly from the screeps cli tool.
* [screepsmod-admin-utils](https://github.com/ScreepsMods/screepsmod-admin-utils) adds some useful functions to the screeps cli.
* [screepsmod-features](https://github.com/ScreepsMods/screepsmod-features) exposes a list of features supported by the server.

We can install all of these at once with a simple command (still running as the user `screeps`).

```shell
npm install screepsmod-mongo screepsmod-auth screepsmod-tickrate screepsmod-admin-utils screepsmod-features
```

Then just confirm that the `mods.json` file looks like this-

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

Because we switched away from the default storage engine we need to initialize the new databases.

In one terminal you'll need to start the Screeps server manually. You'll want to do this as the user `screeps` still.

```bash
cd ~/world
npx screeps start
```

Now in another terminal open the Screeps CLI tool and reset the data.

```bash
sudo su screeps
cd ~/world
npx screeps cli
> system.resetAllData()
```

Now you should stop the Screeps server process in the first terminal.

That should be the last thing you need to do for now as the user `screeps`, so lets go back to your main user.

```bash
exit
```

### Setup Service

Now that we have a working Screeps server we'll want to make sure it stays running, including through reboots. Since we're using Ubuntu 16 we can do this with a simple systemd service file.

As the root user (not `screeps`) open `/etc/systemd/system/screeps-world.service`.

```shell
sudo nano /etc/systemd/system/screeps-world.service
```

Give it the following contents-

```ini
[Unit]
Description=Screeps Server (world)
Wants=network-online.target
After=network-online.target

[Service]
Type=simple
WorkingDirectory=/home/screeps/world
ExecStart=/usr/bin/npx screeps start
User=screeps
Group=screeps

[Install]
WantedBy=multi-user.target
```

Check and correct the npx path in line `ExecStart=/usr/bin/npx screeps start` with the value returned by the command- 

```shell
which npx
``` 

This tells the system that the Screeps server will require networking, should run as the `screeps` user and group, what directory to start it in, and the startup command itself.

We'll need to tell systemd to load the new service we just created-

```shell
sudo systemctl daemon-reload
```

Now we can start the server up, and then tell systemd to always start it after boots.

```shell
sudo systemctl start screeps-world
sudo systemctl enable screeps-world
```
