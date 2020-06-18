title: Public Test Realm (PTR)
---

The Public Test Realm is a stand-alone game server with its own world data, players' scripts, memory, and settings. It has been created for two purposes:

1) testing changes and new features upcoming to the main server,  
2) providing players with a platform to safely test their scripts in a multi-room environment.

---

<div style="text-align: center">

<p><strong style="font-size: 20px; background: #eee; padding: 10px 40px;">[ENTER](https://screeps.com/ptr/)</strong></p>

<p>[Changelogs](https://screeps.com/forum/category/8/)</p>

<p>[API Reference](http://docs-ptr.screeps.com/api/)</p> 
</div>

---

Both World Mode and Simulation Mode are available on PTR. All the game world data is copied from the main server to PTR every Monday at 0:00 UTC, and old PTR data is then wiped (including players’ scripts). **Don’t use PTR for prolonged storage of your code!**

Registering new accounts on PTR is blocked. Each time after data is copied from the main server into PTR, existing players accounts are copied as well. Your account CPU subscription is deactivated by default. Click the Activate button on the [order page](https://screeps.com/ptr/#!/order) to enable your free PTR subscription until the next PTR reset.

Please take note that construction of any structures on the PTR costs only 1 energy unit and the controller upgrade requires 1000 energy units. It allows quick creation of infrastructure you need for testing purposes.

If you use [grunt-screeps](/commit.html) for committing your scripts from a local machine, you can provide <code style="white-space: nowrap;">ptr: true</code> option in order to commit your code to the PTR.

Engine code changes from the PTR are periodically deployed to the `ptr` branch of the private server package on npm, so you can use this command to run it locally:

```
npm install screeps@ptr
``` 
