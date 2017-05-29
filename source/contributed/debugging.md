title: Extended Debugging
---

## Debugging using private server

Full debugging is possible when running on private server.

- Install [private server](https://github.com/screeps/screeps) and make sure your scripts execute normally.
- Install [debug mod](https://github.com/ScreepsMods/screepsmod-user-script-debug) from npm and update `.screepsrc` to limit number of runners to one: `runners_cnt = 1`.
- Configure IDE to attach to node's debug port 6001 (see mod's documentation for VSCode example).
- Add `debugger` statements to your code to break in.
- After first break-in, soft breakpoints would mostly work. Make sure to set them on code retrieved by debugger from node instance, not on the source you happened to have open before attaching.

Private server can also be run from Steam install. In this case use [workshop mod](http://steamcommunity.com/sharedfiles/filedetails/?id=826156595) instead of npm install.
