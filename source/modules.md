title: Organizing scripts using modules
---

For your convenience, you may divide your scripts into modules with the help of Node.js-like syntax – the `require` function and the `module.exports` object. For example, you can create a module called 'scout' with the following content:

    module.exports = {
        run(creep) {
            creep.moveTo(...);
        }
    }

Then you may include this module from the main module this way:

    var scout = require('scout');

    for(var i in Game.creeps) {
        scout.run(Game.creeps[i]);
    }

Besides your own modules, you can also access some embedded modules. Currently, it is the [lodash](http://lodash.com) module which you can use like this:

    var _ = require('lodash');

    var harvesters = _.filter(Game.creeps, {
        memory: {role: 'harvester'}
    });
