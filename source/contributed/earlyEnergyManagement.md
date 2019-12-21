---
title: Energy Collection Guide
contributed:
    name: Eiskalt
    link: https://screeps.com/a/#!/profile/Eiskalt
    date: 2018-01-19
---

## Early Game Energy Collection Guide:
This guide aims at improving the energy collection capability of novice player Bots.

Your goal in the early stages of the game is to produce a as many control points as possible.
Control point generation is basically energy management, because energy is converted into control points by upgrading the controller.

The goal of this guide is to enable you to:
* Harvesting as much energy as possible
* Doing so with as few creep parts as possible

After a genreal introduction to energy harvesting, I will provide a few key features you might want to implement, ranked by importance.
These features will dramatically increase the energy amount harvested or focus on improving creep efficiency.


### Division of labor
A key concept for increasing creep efficiency is division of labor: splitting a complex task into smaller tasks distributed to multiple specialized creeps.

Imgine you are using generic worker creeps with bodys of equal WORK / CARRY / MOVE parts.
* Think about it: a creep mining a source is using it's WORK body parts, but is not using it's CARRY or MOVE parts at all. But when this creep filled all it's CARRY parts and traveling to the storage to store that energy, it will not use it's very expensive WORK parts at all.
* The far more efficient setup is to split these two tasks to dedicated creeps. One harvesting the energy (it will have little or no CARRY / MOVE parts) and one carrying the energy to the storage (with little or no WORK parts).


### Where to get energy
Sources
The two flavors of local mining


### A word on sources:
* [`Sources`](http://docs.screeps.com/api/#Source) come in various sizes.

TODO: why do they vary: SK, reserving, owned rooms

* Sources will regenerate every few hundred ticks after the first harvest action.
* A source will generate the greatest amount of energy, when it is harvested for the first time instantly after regenerating.
* You will need to harvest all energy the source provides before it regenerates again.


### Storage Structure
The most basic requirement for proper energy management is the [`storage`](http://docs.screeps.com/api/#StructureStorage) structure.
* It will store excess energy for you.
* The storage is the place where all harvested energy will go.
* The storage structure is not available below [`RCL`](http://docs.screeps.com/control.html#Room-Controller-Level) 4. 
* You need to check for the presence of the storage (`Game.rooms['roomName'].storage`) and provide alternative logic for energy mangement in that case.


### Container Mining
Container Mining is a key feature used to harvest the greatest amount of energy from a source. The idea works as follows:

* A dedicated Miner creep is used to harvest the source.
* The Miner will not move away from the source during its lifetime.
* A [`container`](http://docs.screeps.com/api/#StructureContainer) is placed at the Miners position. The Miner will stand on top of the container. All energy the Miner creep harvests (and his carry parts cannot hold) will be dropped in the container automatically.
* The Miner creep implies a carrier creep, because we don't want the container to overflow. The only job of the carrier is to carry energy from the container to the storage structure.


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
