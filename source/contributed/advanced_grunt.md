title: Advanced Grunt Usage
contributed: 
    name: tedivm
    link: https://github.com/tedivm
    date: 2017-05-01
---

Uploading your code with grunt is just the beginning. This guide covers numerous enhancements that can be added to your scripts to really get the most out of grunt and make your development easier.


## Assumptions

This article makes a few assumptions-

* Code is stored in the `src` directory.
* You've read the [Getting Started](http://gruntjs.com/getting-started) guide.
* Specifically, you understand how tasks are stored using grunt.initConfig.


## Secure Credentials

As your Gruntfile gets more complex you are going to want to save it in source control, but at the same time saving credentials in repositories is generally considered a horrible idea. Moving the credentials to a separate file will allow you to commit your Gruntfile without your credentials.


First create the file `.screeps.json` to save your credentials.

    {
      "email": "<YOUR EMAIL HERE>",
      "password": "<YOUR PASSWORD HERE>",
      "branch": "default",
      "ptr": false
    }

Now modify `Gruntfile.js` to use the new file.

    module.exports = function(grunt) {
        var config = require('./.screeps.json')
        grunt.loadNpmTasks('grunt-screeps');
        grunt.initConfig({
            screeps: {
                options: {
                    email: config.email,
                    password: config.password,
                    branch: config.branch,
                    ptr: config.ptr
                },
                dist: {
                    src: ['src/*.js']
                }
            }
        });
    }

Finally, open your `.gitignore` (create it if it doesn't exist already) and add `.screeps.json`

```
/.screeps.json
```


## Override Options with CLI Flags

Changing the options that Grunt is using should not require a change in code and can be done using command line flags.

Now update `Gruntfile.js` so it utilizes the `.screeps.json` file created above and the `grunt.option` function.

    module.exports = function(grunt) {

        var config = require('./.screeps.json')
        var branch = grunt.option('branch') || config.branch;
        var email = grunt.option('email') || config.email;
        var password = grunt.option('password') || config.password;
        var ptr = grunt.option('ptr') ? true : config.ptr

        grunt.loadNpmTasks('grunt-screeps');

        grunt.initConfig({
            screeps: {
                options: {
                    email: email,
                    password: password,
                    branch: branch,
                    ptr: ptr
                },
                dist: {
                    src: ['src/*.js']
                }
            }
        });
    }

Now you can override any of the commands on the fly. Any new option can be added to `.screeps.json`.

    grunt screeps --ptr=true --branch=development


## Using Folders

A common frustration amongst new players is that folders are not available by default. This can be changed using Grunt.

To get started install the [grunt-contrib-copy](https://www.npmjs.com/package/grunt-contrib-copy) and [grunt-contrib-clean](https://www.npmjs.com/package/grunt-contrib-clean) plugins.

    npm install grunt-contrib-clean --save-dev
    npm install grunt-contrib-copy --save-dev
    npm install grunt-text-replace --save-dev

In this case the "copy" plugin is going to be used to move code from the `src` directory to `dist`, thie "replace" plugin is go to be used to replace '/' to '_' which in the require string. The plugin as an option to rename files and modify require string, so a function to convert directory delimiters (slashes) to underscores is used to flatten the file structure. Once run the results will look like this-

* File

| Before                     | After                       |
|----------------------------|:----------------------------|
| src/main.js                | dist/main.js                |
| src/lib/creeptalk.js       | dist/lib_creeptalk.js       |
| src/lib/creeptalk/emoji.js | dist/lib_creeptalk_emoji.js |
| src/prototypes/creeps.js   | dist/prototypes_creeps.js   |
| src/prototypes/spawns.js   | dist/prototypes_spawns.js   |

* Require

| Before                          | After                           |
|---------------------------------|:--------------------------------|
| require(main.js)                | require('main');                |
| require(lib/creeptalk)          | require('lib_creeptalk');       |
| require(lib/creeptalk/emoji)    | require('lib_creeptalk_emoji'); |
| require(prototypes/creeps)      | require('prototypes_creeps');   |
| require(prototypes/spawns)      | require('prototypes_spawns');   |


The copy plugin does not clear any data before it is run, so the `clean` plugin is used to make sure the `dist` folder is empty before files are moved into it.

Finally we use `grunt.registerTask()` to combine these three seperate tasks into one, which we will make the default.

    module.exports = function(grunt) {

        var config = require('./.screeps.json')
        var branch = grunt.option('branch') || config.branch;
        var email = grunt.option('email') || config.email;
        var password = grunt.option('password') || config.password;
        var ptr = grunt.option('ptr') ? true : config.ptr

        grunt.loadNpmTasks('grunt-screeps')
        grunt.loadNpmTasks('grunt-contrib-clean')
        grunt.loadNpmTasks('grunt-contrib-copy')

        grunt.initConfig({
            screeps: {
                options: {
                    email: email,
                    password: password,
                    branch: branch,
                    ptr: ptr
                },
                dist: {
                    src: ['dist/*.js']
                }
            },

            // Remove all files from the dist folder.
            clean: {
              'dist': ['dist']
            },

            // Copy all source files into the dist folder, flattening the folder structure by converting path delimiters to underscores
            copy: {
              // Pushes the game code to the dist folder so it can be modified before being send to the screeps server.
              screeps: {
                files: [{
                  expand: true,
                  cwd: 'src/',
                  src: '**',
                  dest: 'dist/',
                  filter: 'isFile',
                  rename: function (dest, src) {
                    // Change the path name utilize underscores for folders
                    return dest + src.replace(/\//g,'_');
                  }
                }],
              }
            },
            replace:{
              requireReplace:{
                src: ['dist/*.js'],
                overwrite: true,
                replacements:[{
                  from: /require.*/g,
                  to: function (requireString) {
                    requireString = requireString.replace(/\//g,'_')
                    return requireString;
                  }
                }]
              }
            }
        })

        grunt.registerTask('default',  ['clean', 'copy:screeps', 'replace', 'screeps']);
    }

Now with a single command your code will be copied from its `src` directory, flattened,replace require string , and then pushed to the screeps server.

    grunt


## Automatic Versioning

Install the [file-append](https://www.npmjs.com/package/grunt-file-append) plugin.

    npm install grunt-file-append --save-dev


In your source code create an empty file named `version.js`. Grunt is going to use this file to add the global variable `SCRIPT_VERSION` with the timestamp as its value. Then populate a variable with the current date and create a new `file_append` task.

    module.exports = function(grunt) {

        // parameters

        grunt.loadNpmTasks('grunt-screeps')
        grunt.loadNpmTasks('grunt-contrib-clean')
        grunt.loadNpmTasks('grunt-contrib-copy')
        grunt.loadNpmTasks('grunt-file-append')

        var currentdate = new Date();

        // Output the current date and branch.
        grunt.log.subhead('Task Start: ' + currentdate.toLocaleString())
        grunt.log.writeln('Branch: ' + branch)


        grunt.initConfig({

            // Truncated for space.
            screeps: {},
            clean: {},
            copy: {},

            // Add version variable using current timestamp.
            file_append: {
              versioning: {
                files: [
                  {
                    append: "\nglobal.SCRIPT_VERSION = "+ currentdate.getTime() + "\n",
                    input: 'dist/version.js',
                  }
                ]
              }
            },

        })

        grunt.registerTask('default',  ['clean', 'copy:screeps', 'file_append:versioning', 'screeps']);
    }

Now by adding `require('version')` the variable `SCRIPT_VERSION` will be available. Comparing this to a version string saved in memory allows players to see when new scripts are updated.

    require('version')
    if(!Memory.SCRIPT_VERSION || Memory.SCRIPT_VERSION != SCRIPT_VERSION) {
        Memory.SCRIPT_VERSION = SCRIPT_VERSION
        console.log('New code uplodated')
    }



## Private Server 

There are two ways to upload code to your private server account using Grunt.

### Via Steam Client

The Steam client is used to upload code from your local folder. In this case Grunt can be used to copy the files from the `dist` folder to the local folder used by steam to upload the data.

Unfortunately the `copy` plugin can cause some issues with the steam client, so in this case the [rsync](https://www.npmjs.com/package/grunt-rsync) plugin should be used.

    npm install grunt-rsync --save-dev


  Now add a parameter for `private_directory` to your settings and grunt files and configure `rsync`. To make it cross compatible with the main server a seprate `private` task is created using `grunt.registerTask`.

    module.exports = function(grunt) {

        // parameters
        var private_directory = grunt.option('private_directory') || config.private_directory;

        grunt.loadNpmTasks('grunt-screeps')
        grunt.loadNpmTasks('grunt-contrib-clean')
        grunt.loadNpmTasks('grunt-contrib-copy')
        grunt.loadNpmTasks('grunt-rsync')

        var currentdate = new Date();

        grunt.initConfig({

            // Truncated for space.
            screeps: {},
            clean: {},
            copy: {},

            // Copy files to the folder the client uses to sink to the private server.
            // Use rsync so the client only uploads the changed files.
            rsync: {
                options: {
                    args: ["--verbose", "--checksum"],
                    exclude: [".git*"],
                    recursive: true
                },
                private: {
                    options: {
                        src: './dist/',
                        dest: private_directory,
                    }
                },
            },


        })

        grunt.registerTask('default',  ['clean', 'copy:screeps', 'file_append:versioning', 'screeps']);
        grunt.registerTask('private',  ['clean', 'copy:screeps', 'file_append:versioning', 'rsync:private']);
    }

Now code can be pushed to your private server.

    grunt private

### Using Server Mod 


You need to install some authentication mod like 
[screepsmod-auth](https://github.com/ScreepsMods/screepsmod-auth) at your private server in order for this method to work.

```javascript
module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                server: {
                    host: 'your.server.hostname.or.ip',
                    port: 21025,
                    http: true
                },
                email: 'YOUR_EMAIL',
                password: 'YOUR_PASSWORD',
                branch: 'default',
                ptr: false
            },
            dist: {
                src: ['dist/*.js']
            }
        }
    });
}
```

## Beautify

Keeping code pretty is a common task with Grunt and can be accomplished with the [jsbeautifier](https://www.npmjs.com/package/grunt-jsbeautifier) plugin.

    npm install grunt-jsbeautifier --save-dev

Now add two new tasks for Grunt- one to cleanup the code and one to verify code standards as the start of a test suite (this task can be expanded later). The task is configured to look for `.jsbeautifyrc` for [style rules](https://github.com/beautify-web/js-beautify#options).

    module.exports = function(grunt) {

        // parameters
        var private_directory = grunt.option('private_directory') || config.private_directory;

        grunt.loadNpmTasks('grunt-screeps')
        grunt.loadNpmTasks('grunt-contrib-clean')
        grunt.loadNpmTasks('grunt-contrib-copy')
        grunt.loadNpmTasks('grunt-rsync')

        var currentdate = new Date();

        grunt.initConfig({

            // Truncated for space.
            screeps: {},
            clean: {},
            copy: {},

            // Apply code styling
            jsbeautifier: {
              modify: {
                src: ["src/**/*.js"],
                options: {
                  config: '.jsbeautifyrc'
                }
              },
              verify: {
                src: ["src/**/*.js"],
                options: {
                  mode: 'VERIFY_ONLY',
                  config: '.jsbeautifyrc'
                }
              }
            }

        })

        grunt.registerTask('default',  ['clean', 'copy:screeps', 'file_append:versioning', 'screeps']);
        grunt.registerTask('private',  ['clean', 'copy:screeps', 'file_append:versioning', 'rsync:private']);

        grunt.registerTask('test',     ['jsbeautifier:verify']);
        grunt.registerTask('pretty',   ['jsbeautifier:modify']);
    }

Now code can be altered in place to match rules

    grunt pretty

or simply tested.

    grunt test


## Add Stats

Sometimes it gets boring watching your script upload. The plugin [time-grunt](https://www.npmjs.com/package/time-grunt) provides a breakdown of how much time is spent on each task.

    npm install time-grunt --save-dev

Now as the very first line in the grunt function load the special plugin and pass the grunt object to it.

    module.exports = function(grunt) {
      require('time-grunt')(grunt);
      ...
    }


## Full Example

Putting it all together gives a powerful but simple to use tool for managing your Screeps deployment.

    module.exports = function (grunt) {
      require('time-grunt')(grunt);

      // Pull defaults (including username and password) from .screeps.json
      var config = require('./.screeps.json')

      // Allow grunt options to override default configuration
      var branch = grunt.option('branch') || config.branch;
      var email = grunt.option('email') || config.email;
      var password = grunt.option('password') || config.password;
      var ptr = grunt.option('ptr') ? true : config.ptr
      var private_directory = grunt.option('private_directory') || config.private_directory;


      var currentdate = new Date();
      grunt.log.subhead('Task Start: ' + currentdate.toLocaleString())
      grunt.log.writeln('Branch: ' + branch)

      // Load needed tasks
      grunt.loadNpmTasks('grunt-screeps')
      grunt.loadNpmTasks('grunt-contrib-clean')
      grunt.loadNpmTasks('grunt-contrib-copy')
      grunt.loadNpmTasks('grunt-file-append')
      grunt.loadNpmTasks("grunt-jsbeautifier")
      grunt.loadNpmTasks("grunt-rsync")

      grunt.initConfig({

        // Push all files in the dist folder to screeps. What is in the dist folder
        // and gets sent will depend on the tasks used.
        screeps: {
          options: {
            email: email,
            password: password,
            branch: branch,
            ptr: ptr
          },
          dist: {
            src: ['dist/*.js']
          }
        },


        // Copy all source files into the dist folder, flattening the folder
        // structure by converting path delimiters to underscores
        copy: {
          // Pushes the game code to the dist folder so it can be modified before
          // being send to the screeps server.
          screeps: {
            files: [{
              expand: true,
              cwd: 'src/',
              src: '**',
              dest: 'dist/',
              filter: 'isFile',
              rename: function (dest, src) {
                // Change the path name utilize underscores for folders
                return dest + src.replace(/\//g,'_');
              }
            }],
          }
        },


        // Copy files to the folder the client uses to sink to the private server.
        // Use rsync so the client only uploads the changed files.
        rsync: {
            options: {
                args: ["--verbose", "--checksum"],
                exclude: [".git*"],
                recursive: true
            },
            private: {
                options: {
                    src: './dist/',
                    dest: private_directory,
                }
            },
        },


        // Add version variable using current timestamp.
        file_append: {
          versioning: {
            files: [
              {
                append: "\nglobal.SCRIPT_VERSION = "+ currentdate.getTime() + "\n",
                input: 'dist/version.js',
              }
            ]
          }
        },


        // Remove all files from the dist folder.
        clean: {
          'dist': ['dist']
        },


        // Apply code styling
        jsbeautifier: {
          modify: {
            src: ["src/**/*.js"],
            options: {
              config: '.jsbeautifyrc'
            }
          },
          verify: {
            src: ["src/**/*.js"],
            options: {
              mode: 'VERIFY_ONLY',
              config: '.jsbeautifyrc'
            }
          }
        }

      })

      // Combine the above into a default task
      grunt.registerTask('default',  ['clean', 'copy:screeps',  'file_append:versioning', 'screeps']);
      grunt.registerTask('private',  ['clean', 'copy:screeps',  'file_append:versioning', 'rsync:private']);
      grunt.registerTask('test',     ['jsbeautifier:verify']);
      grunt.registerTask('pretty',   ['jsbeautifier:modify']);
    }
