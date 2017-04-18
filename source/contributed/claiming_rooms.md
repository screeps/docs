title: How to claim a new room
---

Screeps, being a strategy game, has a mechanic to expand your empire. In other games, its called, well, "expand your empire". In Screeps, its called "Room Claiming". There are 4 steps to claim a room.
* Get a Higher GCL
* Claiming
* Spawn Building
* Fix Your Code

# Step 0: Upgrading Your GCL
You can only have as many rooms as your Global Control Level (GCL). You can level up your GCL by upgrading controllers. For every 1 energy put into any room controller, 1 point is put towards upgrading your GCL.

# Step 1: Claiming
The first step is to claim the room! Use a spawn to create a creep. The creep needs a body made of 1 MOVE part and 1 CLAIM part. Next, move the creep into the room you need to claim. Finally, claim the room. Let's break this down.
### Step 1.1: Create a Claimer Creep
I will assume that you have completed step 0, which would mean you know how to create a creep. Make a creep with a body ```[MOVE, CLAIM]```, put the ID of the target room into it's memory under ```claimTarget```, and set its name to ```claimer1```

### Step 1.2: Get to the room you want to claim
If you haven't claimed a room, it will not be in your ```Game.rooms``` object. That means you can't tell your creep to move to ```Game.rooms["ROOM_ID"].controller```, because ```ROOM_ID``` isn't in ```Game.rooms```. So how do you get there?  
We are going to get the room that our creep is in right now, then find an exit in the direction of the target room, then move to the closest exit.

    //Get the claimer1 creep
    let creep = Game.creeps.claimer1
    //Get a list of exits that go from the current room to the target room
    let exits = creep.room.findExitTo(creep.memory.claimTarget)
    //Find the nearest exit
    let nearest = creep.pos.findClosestByRange(exits)
    //Move to it
    creep.moveTo(nearest)

### Step 1.3: Moving to the controller
Now the creep will go to the target room, but what happens when we get there? Now we need to move to next to the room's controller.  
Take the code to move to the target room, and wrap it in an if statement that checks if the current room is not the target.

    if(creep.room.name != creep.memory.claimTarget) {
        //Get the claimer1 creep
        let creep = Game.creeps.claimer1
        //Get a list of exits that go from the current room to the target room
        let exits = creep.room.findExitTo(creep.memory.claimTarget)
        //Find the nearest exit
        let nearest = creep.pos.findClosestByRange(exits)
        //Move to it
        creep.moveTo(nearest)
    }

Next we need to add an else block, where if we can't claim the current room's controller yet, we will move to the current room's controller. Notice, all we need to do is get the controller of the room the creep is in, because if the creep isn't in the target room, the else block won't run.

    if(creep.room.name != creep.memory.claimTarget) {
        //Get the claimer1 creep
        let creep = Game.creeps.claimer1
        //Get a list of exits that go from the current room to the target room
        let exits = creep.room.findExitTo(creep.memory.claimTarget)
        //Find the nearest exit
        let nearest = creep.pos.findClosestByRange(exits)
        //Move to it
        creep.moveTo(nearest)
    } else {
        //Get the claimer1 creep
        let creep = Game.creeps.claimer1
        //Get the current room's controller
        let controller = creep.room.controller
        //Try to claim the controller, and if we can't, move closer.
        if(creep.claimController(controller) != OK) {
            //Move to it
            creep.moveTo(controller)
        }
    }

Great! We now have a room! Wait, what's that? The room controller will downgrade in 20000 ticks!? That's a problem!

# Step 2: Spawn Building
The next stage in claiming a room is to build a spawn in that room. To do this, you have to designate the spawn building, then create worker creeps, then once they get some energy, send them to the newly claimed room to build a spawn.
### Step 2.0: Designate a Spawn to be Built
The very first thing you need to do once the room has been claimed is to go to the build menu and place a spawn. Try to place it close to any sources and the room controller for optimal efficiency.
### Step 2.1: Creating Worker Creeps
Again, you should know how to create creeps if you are looking into another room. Create 3 creeps with a body consisting of 1 WORK part, as many CARRY parts as you can, and at least 1 MOVE part (add more MOVE parts to make the creep move more quickly, but don't add more than the number of CARRY parts + the number of WORK parts). Set their names to ```builderX```, where X is how many builders you have already. i.e. the first will be called ```builder0```, then ```builder1```, etc. If you create 3, you should have builders 0 through 2.

### Step 2.2: Getting Energy
You will need energy to build the spawn. Once again, you won't be able to get another room if you don't already have a way to get energy.

### Step 2.3: Moving to the room you want to claim
I'll start with the code for moving the claimer1 creep to the new room, but let's remove ```let creep = Game.creeps.claimer1``` and wrap the entire thing in a for loop. Combine the value from the for loop with the word "builder", and then use that as a key for ```Game.creeps``` to get the creeps we need.

    for(var i = 0; i < 3; i++) {
        let creep = Game.creeps["builder" + i]
        if(creep.room.name != creep.memory.claimTarget) {
            //Get a list of exits that go from the current room to the target room
            let exits = creep.room.findExitTo(creep.memory.claimTarget)
            //Find the nearest exit
            let nearest = creep.pos.findClosestByRange(exits)
            //Move to it
            creep.moveTo(nearest)
        } else {
            //Get the current room's controller
            let controller = creep.room.controller
            //Try to claim the controller, and if we can't, move closer.
            if(creep.claimController(controller) != OK) {
                //Move to it
                creep.moveTo(controller)
            }
        }
    }

We don't want to claim the controller again, so we need to change the else block to build the spawn.

    for(var i = 0; i < 3; i++) {
        let creep = Game.creeps["builder" + i]
        if(creep.room.name != creep.memory.claimTarget) {
            //Get a list of exits that go from the current room to the target room
            let exits = creep.room.findExitTo(creep.memory.claimTarget)
            //Find the nearest exit
            let nearest = creep.pos.findClosestByRange(exits)
            //Move to it
            creep.moveTo(nearest)
        } else {
            //Get the current room
            let room = creep.room
            //Find all construction sites in the room and get the first. The only construction site should be the Spawn
            let spawnSite = room.find(FIND_CONSTRUCTION_SITES)[0]
            //Try to build the Spawn, and if we can't, move closer.
            if(creep.build(spawnSite) != OK) {
                //Move to it
                creep.moveTo(controller)
            }
        }
    }

Now wait for your creeps to build the spawn. It is worth noting that you will need to create new creeps every once in a while. Something that you will already be dealing with if you are looking to expand.

# Step 3: Fix Your Code
You thought it would be easy huh? Well GUESS AGAIN! You will have to change your code to deal with separate rooms. As everyone's code is different, I won't go into specifics here, but here are a few things to be sure will work.
* Spawn Code (Are you going through Game.spawns, or are you interacting with your spawns using their name/id?)
* Mining Code (Are you finding sources in each room, or do you have a list of sources and their ids?)
* Room Claiming Code (If you ever expand again, which room will do what, and how?)

Obviously this is a very short list, you might have to completely rewrite your code to make it work with a second room. If you do, I'm sorry :(
