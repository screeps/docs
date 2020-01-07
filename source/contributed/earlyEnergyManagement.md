---
title: Energy Collection Guide
contributed:
    name: Eiskalt
    link: https://screeps.com/a/#!/profile/Eiskalt
    date: 2018-01-19
---

## Early Game Energy Collection Guide:
This guide aims to improve the energy collection capability of novice player Bots.

Your goal in the early stages of the game is to generate a as many control points as possible.
Control point generation is basically energy management, because energy is directly converted into control points by upgrading the controller.

The goal of this guide is to enable you to:
* Harvesting as much energy as possible
* Doing so with as few creep parts as possible

After a genreal introduction to energy harvesting, I will provide a few key features you might want to implement.
These features will dramatically increase the energy amount harvested or focus on improving creep efficiency.


### Division of labor
A key concept for increasing creep efficiency is division of labor: splitting a complex task into smaller tasks distributed to multiple specialized creeps.

Imgine you are using generic worker creeps with bodys of equal WORK / CARRY / MOVE parts.
* A creep mining a source is using it's WORK body parts every time it harvests the source, but it is not using it's CARRY or MOVE parts at all. 
    When this creep filled all it's CARRY parts with energy and traveling to the storage to store that energy, it will not use it's very expensive WORK parts at all.
* The far more efficient setup is to split these two tasks to dedicated creeps. One harvesting the energy (it will have little or no CARRY / MOVE parts) and one creep carrying the energy to the storage (with little or no WORK parts).


### A word on Sources:
* [`Sources`](http://docs.screeps.com/api/#Source) come in various sizes and number. 
* You can find sources in rooms with a controller or Source Keeper protected rooms.
* Sources in unowned rooms hold 1500 energy. A room with a controller an have one or two sources.
* Sources in owned or reserved rooms hold 2000 energy.
* Sources in Source Keeper rooms hold 3000 energy. Source Keeper rooms have three sources.


### How to get all possible energy out of a Source:
* Sources will regenerate every three hundred ticks.
* A source will generate the greatest amount of energy, when it is harvested instantly after regenerating. The regeneration timer will start again after the first harvest action.
* You will need to harvest all energy the source provides before it regenerates again, or any remaining energy will be lost. 


### Container Mining
Container Mining is a very efficient way to harvest sources. The idea works as follows:

* A dedicated Miner creep is used to harvest the source.
* The Miner will not move away from the source during its lifetime.
* A [`container`](http://docs.screeps.com/api/#StructureContainer) is placed next to the source. The Miner will stand on top of the container. All energy the Miner harvests (and his carry parts cannot hold) will be dropped in the container automatically.
* The Miner will need the help of a carrier creep, because we don't want the container to overflow.
* The only job of the carrier is to carry energy from the container to the storage structure.
* Keep in mind, that containers will need to be repaired regularly.


### Local Mining
* Local mining is mining in a room you control.
* Sources in your rooms will hold 2000 Energy.
* Once you can build Links, you might want to consider substituting your carriers with links.
* When using links, your miner will need to store harvested energy in the link.
* You might not need the container any more.


### Remote Mining
This miner & carrier setup can also be used to harvest sources in neighboring unclaimed rooms. Energy from those sources will have to be carried back to the storage structure.
* Harvesting additional remote sources will drasticly increase the amount of energy harvested by your bot.
* This is an area of the game with a lot of optimizing and automation potential and I will only provide a few pointers for you to consider:
    
    * Someone needs to build and maintain the container in the remote room.
    * Roads need to be built and maintained.
    * You can adapt the size of the miner creep to the size of the source.
    * You can adapt the size of the carrier creep to the distance and size of the source.
    * A reserved room will have an increased amount of energy per source. But be careful: CLAIM bodyparts are expensive. The farther away the remote controller is, the more energy you will pay for the claimer. Hint: reserving a room with two sources will result in two increased sources with only one claimer necessary.
    * You will need to set up a guard system for remote mining of neighboring rooms. In regular intervals NPC invaders will spawn. If ignored, a lot (!) of energy will be lost replacing your miners / carriers. You will need to regularly check those rooms for invaders and send a guard if you found one.
    * Miners and carriers will make up the major part of your creep population. It is worthwhile to think about CPU efficiency for those roles in particular. Miners and carriers could, for example, store the IDs of objects they interact with regularly, to avoid the need to find them every tick.
