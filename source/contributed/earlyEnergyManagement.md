---
title: Energy Collection Guide
contributed:
    name: Eiskalt
    link: https://screeps.com/a/#!/profile/Eiskalt
    date: 2018-01-19
---

## Energy Collection Guide:
This guide aims to improve the energy collection capability of novice player bots.

Your goal, especially in the early stages of the game, is to generate a as many control points as possible.
Control point generation is basically energy management, because energy is directly converted into control points by upgrading the controller.

The goal of this guide is to enable you to:
* Harvest as much energy as possible.
* Doing so with as few creep parts as possible.

After a general introduction to energy harvesting, I will provide a few key features you might want to implement.
These features will dramatically increase the energy amount harvested by your bot or focus on improving creep efficiency.


### Division of labor
A key concept for increasing creep efficiency is division of labor: splitting a complex task into smaller tasks distributed to multiple specialized creeps.

Imagine you are using generic worker creeps with bodies of equal WORK / CARRY / MOVE parts.
* A creep mining a source is using it's WORK body parts every time it harvests the source, but it is not using it's CARRY or MOVE parts at all. 
    When this worker creep filled all it's CARRY parts with energy and is traveling to the storage to store that energy, it will not use it's very expensive WORK parts at all.
* The far more efficient setup is to split these two tasks to dedicated creeps. One harvesting energy (it will have little or no CARRY / MOVE body parts) and one creep carrying the harvested energy to the storage (with little or no WORK body parts).


### A word on Sources:
* [`Sources`](http://docs.screeps.com/api/#Source) come in various sizes and number. 
* You can find sources in rooms with a controller or in Source Keeper protected rooms.
* Sources in unowned rooms hold 1500 energy. A room with a controller can have one or two sources.
* Sources in owned or reserved rooms hold 2000 energy.
* Sources in Source Keeper rooms hold 3000 energy. Source Keeper rooms have three sources.


### How to get all possible energy out of a Source:
* Sources will regenerate every three hundred ticks.
* A source will generate the greatest amount of energy, when it is harvested instantly after regenerating. The regeneration timer will start again after the first harvest action.
* You will need to harvest all energy the source provides before it regenerates again, or any remaining energy will be lost. Sources are topped-off when regenerating.


### Container Mining
Container mining is a very efficient way to harvest sources using division of labor. The idea works as follows:
* A dedicated Miner creep is used to harvest the source.
* The Miner will not move away from the source during its lifetime.
* A [`container`](http://docs.screeps.com/api/#StructureContainer) is placed next to the source. The Miner will stand on top of the container. All energy the Miner harvests (and his carry parts can not hold) will be dropped in the container automatically.
* The Miner will need the help of a carrier creep, because we don't want the container to overflow.
* The only job of the carrier is to carry energy from the container to the storage structure.
* Keep in mind, that containers will need to be repaired regularly.


### Container Mining efficiency
There are various ways to increase the efficiency of your miner & carrier pair. Here is a small list of ideas for you to consider:
* The number of CARRY parts a carrier uses, can be adjusted to the distance from the storage to the source.
* The number of WORK parts the miner uses, can be adjusted to the amount of energy the source holds.
* You could use the pull feature to create miners without any MOVE parts at all.
* The miner could have extra WORK parts to repair its container itself.
* Miners and carriers will make up the major part of your creep population. It is worthwhile to think about CPU efficiency for those roles in particular. Miners and carriers could, for example, store the IDs of objects they interact with in memory. This way, you avoid the need to find these objects every tick.


### Local Mining
Local mining is harvesting energy in a room you control.
* Sources in your rooms will hold 2000 Energy.
* Once you can build Links at RCL 5, you might want to consider substituting your carriers with links.
    * When using links, your miner will need to store harvested energy in the link.
    * You might not need the container any more.


### Remote Mining
Remote mining is harvesting energy in neighboring unclaimed rooms.
* Harvesting additional remote sources will drastically increase the amount of energy harvested by your bot.
* Mining in remote rooms will be different to local mining:
* You can not build Links to substitute your carriers.
* The distance your carriers will need to travel is considerably longer.
    * Roads should to be built and maintained to save some MOVE parts.
* If you reserve the remote room, the sources will hold more energy. But be careful: CLAIM body parts are expensive. The farther away the remote controller is, the more energy you will need for the claimers. It is usually worth it though.
* You can not use your Towers to protect your creeps from Invaders.
    * You will need to set up a guard system for remote mining of neighboring rooms. In regular intervals NPC invaders will spawn. If ignored, a lot of energy will be lost replacing your miners & carriers. You will need to regularly check those rooms for invaders and send a guard if you found any.
