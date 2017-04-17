title: Scripting Basics
---

Writing scripts for Screeps is similar to writing any other JavaScript application. You write your scripts in a special in-game editor, and they are executed continuously even while you are offline (with the exception of the Simulation Room).

Your game script is executed each game tick in a loop. The game tick duration depends on the current load of servers. The goal of a script is to process the current situation within the game and pass orders to your creeps and spawns. Commands are not executed instantly. Rather, the game remembers your commands and executes them later, after all players' scripts have been executed. For more details on this topic, see the article [Understanding game loop, time and ticks](/game-loop.md).

Please remember that the exact duration of the execution of your script is limited by the CPU time available in your account. In case of exceeding the limit, the script execution will be stopped. The exception is the Simulation Room where the script execution time is unlimited.