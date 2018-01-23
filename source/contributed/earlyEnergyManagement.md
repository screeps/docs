---
title: Energy Collection Guide
contributed:
    name: Eiskalt
    link: https://screeps.com/a/#!/profile/Eiskalt
    date: 2018-01-19
---

## Early Game Energy Collection Guide:
This guide aims at improving the energy collection capability of novice player AIs.

One goal of the game (especially in the beginning) is to produce a lot of control points.
Control point generation is basically energy management, because energy is converted into control points by upgrading the controller.

The goal of this guide is to enable you to:
* Harvesting as much energy as possible
* Doing so with as few creeps as possible

We will provide a few key features ranked by importance. Every established AI should have these implemented in some form.
These features will dramatically increase the energy amount harvested or focus on improving creep efficiency.

### Storage Structure
The most basic requirement for proper energy management is the [`storage`](http://docs.screeps.com/api/#StructureStorage) structure.

* The storage is the place where all harvested energy will go.
* It functions as a buffer for excess energy.
* The storage structure is not available below [`RCL`](http://docs.screeps.com/control.html#Room-Controller-Level) 4. 
* You need to check for the presence of the storage (`Game.rooms['roomName'].storage`) and provide alternative logic for energy mangement in that case.


### A word on sources:
* [`Sources`](http://docs.screeps.com/api/#Source) come in various sizes.
* Sources will regenerate every few hundred ticks after the first harvest action.
* A source will generate the greatest amount of energy, when it is harvested for the first time instantly after regenerating.
* You will need to harvest all energy the source provides before it regenerates again.


### Container Mining
Container Mining is a key feature used to harvest the greatest amount of energy from a source. The idea works as follows:

* A dedicated miner creep is used to harvest the source.
* It will not move away from the source in its lifetime.
* A [`container`](http://docs.screeps.com/api/#StructureContainer) is placed at the miner creeps position. The miner will stand on top of the container. All energy the miner creep harvests (and his carry parts cannot hold) will be dropped in the container automatically.
* The miner creep implies a carrier creep, because we don’t want the container to overflow. The only job of the carrier is to carry energy from the container to the storage structure.


### A word on division of labor
A key concept for increasing creep efficiency is division of labor: splitting a complex task into smaller tasks distributed to multiple creeps.

* Think about it: a creep mining a source is using its WORK body parts, but is not using its CARRY parts at all. When this creep filled all its CARRY parts and traveling to the storage to store that energy, it will not use its very expensive WORK parts at all.
* The far more efficient setup is to split these tasks to dedicated creeps. One Harvesting the energy (he will have little or no CARRY parts) and one carrying the energy to the storage (with little or no WORK parts).


### Remote Mining
This miner & carrier setup can also be used to harvest sources in neighboring unclaimed rooms. Energy from those sources will have to be carried back to the storage structure.
* Harvesting additional remote sources will dramatically increase the amount of energy harvested by your AI.
* This is an area of the game with a lot of optimizing and automation potential and we will only provide a few pointers for you to consider:
    
    * Someone needs to build and maintain the container in the remote room.
    * Roads need to be built and maintained.
    * You can adapt the size of the miner creep to the size of the source.
    * You can adapt the size of the carrier creep to the distance and size of the source.
    * A reserved room will have an increased amount of energy per source. But be careful: CLAIM bodyparts are expensive. The farther away the remote controller is, the more energy you will pay for the claimer. Hint: reserving a room with two sources will result in two increased sources with only one claimer necessary.
    * You will need to set up a guard system for remote mining of neighboring rooms. In regular intervals NPC invaders will spawn. If ignored, a lot (!) of energy will be lost replacing your miners / carriers. You will need to regularly check those rooms for invaders and send a guard if you found one.
    * Miners and carriers will make up the major part of your creep population. It is worthwhile to think about CPU efficiency for those roles in particular. Miners and carriers could, for example, store the IDs of objects they interact with regularly, to avoid the need to find them every tick.

