title: 高级 Grunt 用法
contributed: 
    name: tedivm
    link: https://github.com/tedivm
    date: 2017-05-01
---

使用 grunt 上传代码仅仅是开始。本指南涵盖了许多可以添加到脚本中的增强功能，它们可使您将自己的精力用在正确的地方上，并使您的开发更加轻松。


## 假设条件

本文做出了如下假设

* 代码存放在 `src` 文件夹中。
* 您已经读过了 [Getting Started](http://gruntjs.com/getting-started) 指南。
* 具体来说就是，您已经了解了如何使用 grunt.initConfig 安排工作。


## 安全凭据

随着您的 Gruntfile 变得越来越复杂，您将需要将其保存在源代码管理中，但与此同时，将账号密码等凭据保存在存储库中通常被认为是一个糟糕的想法。将凭证移动到单独的文件中可以使您提交不包含凭证的 Gruntfile。


首先创建 `.screeps.json` 文件来保存您的凭据。

    {
      "email": "<YOUR EMAIL HERE>",
      "password": "<YOUR PASSWORD HERE>",
      "branch": "default",
      "ptr": false
    }

现在修改 `Gruntfile.js` 来使用新文件。

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

最后，打开您的 `.gitignore`（不存在请创建）然后添加 `.screeps.json`

```
/.screeps.json
```


## 使用 CLI 参数覆盖配置

更改 Grunt 使用的配置不应该需要更改代码，我们可以通过命令行参数来完成该功能。

现在更新 `Gruntfile.js` 来使用上面创建的 `.screeps.json` 以及 `grunt.option` 功能。

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

现在你可以随时通过命令行参数来覆盖任何配置，您也可以向 `.screeps.json` 中添加任何新的配置项。

    grunt screeps --ptr=true --branch=development


## 使用文件夹

**译者注**：如果你是 TypeScript 玩家的话，下面的方法可能无法直接使用。

一个困扰新玩家的常见问题是，默认情况下不能使用文件夹来存储文件。不过我们可以使用 Grunt 解决该问题。

首先请安装 [grunt-contrib-copy](https://www.npmjs.com/package/grunt-contrib-copy) and [grunt-contrib-clean](https://www.npmjs.com/package/grunt-contrib-clean) 插件。

    npm install grunt-contrib-clean --save-dev
    npm install grunt-contrib-copy --save-dev

在我们的解决方法中，”copy“ 插件将会把代码从 `src` 文件夹移动到 `dist` 里。该插件拥有一个配置项可以用来重命名文件，所以我们可以通过一个将目录分隔符(斜杠)转换为下划线的函数来”展开“文件结构。运行后，将产生如下效果：

| 之前                       | 之后                       | 要求（代码里要提前这么写好）            |
|----------------------------|:----------------------------|---------------------------------|
| src/main.js                | dist/main.js                | require('main');                |
| src/lib/creeptalk.js       | dist/lib_creeptalk.js       | require('lib_creeptalk');       |
| src/lib/creeptalk/emoji.js | dist/lib_creeptalk_emoji.js | require('lib_creeptalk_emoji'); |
| src/prototypes/creeps.js   | dist/prototypes_creeps.js   | require('prototypes_creeps');   |
| src/prototypes/spawns.js   | dist/prototypes_spawns.js   | require('prototypes_spawns');   |

copy 插件在运行之前不会清理任何数据，所以 `clean` 插件可以保证在 `dist` 在移入文件之前是空的文件夹。

最后我们使用 `grunt.registerTask()` 将这三个任务组合在一起，这里我们将其设置为默认任务。

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

            // 移除 dist 文件夹中的所有文件。
            clean: {
              'dist': ['dist']
            },

            // 将所有源文件复制到 dist 文件夹中并展平文件夹结构
            copy: {
              // 将游戏代码推送到dist文件夹，以便在将其发送到 screeps 服务器之前可以对其进行修改。
              screeps: {
                files: [{
                  expand: true,
                  cwd: 'src/',
                  src: '**',
                  dest: 'dist/',
                  filter: 'isFile',
                  rename: function (dest, src) {
                    // 通过将文件夹分隔符替换成下划线来重命名文件
                    return dest + src.replace(/\//g,'_');
                  }
                }],
              }
            },
        })

        grunt.registerTask('default',  ['clean', 'copy:screeps', 'screeps']);
    }

现在，只需要一条简单的命令，就可以将您的代码从 `src` 文件夹中复制出来，展平，并推送到 screeps 服务器。

    grunt


## 自动版本控制

首先安装 [file-append](https://www.npmjs.com/package/grunt-file-append) 插件。

    npm install grunt-file-append --save-dev


在您的源代码中创建一个名为 `version.js` 的空文件。Grunt 将使用该文件创建一个值为时间戳的全局变量 `SCRIPT_VERSION`。然后使用当前的时间填充该变量并创建一个新的 `file_append` 任务。

    module.exports = function(grunt) {

        // 准备

        grunt.loadNpmTasks('grunt-screeps')
        grunt.loadNpmTasks('grunt-contrib-clean')
        grunt.loadNpmTasks('grunt-contrib-copy')
        grunt.loadNpmTasks('grunt-file-append')

        var currentdate = new Date();

        // 输入当前时间和分支
        grunt.log.subhead('Task Start: ' + currentdate.toLocaleString())
        grunt.log.writeln('Branch: ' + branch)


        grunt.initConfig({

            // 此处省略
            screeps: {},
            clean: {},
            copy: {},

            // 使用当前时间戳添加版本变量
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

现在添加 `require('version')` 来启用 `SCRIPT_VERSION`。将其与保存在内存中的版本字符串进行比较，就可以让玩家看到代码是何时更新的了。

    require('version')
    if(!Memory.SCRIPT_VERSION || Memory.SCRIPT_VERSION != SCRIPT_VERSION) {
        Memory.SCRIPT_VERSION = SCRIPT_VERSION
        console.log('New code uplodated')
    }



## 私有服务器

有两种使用 Grunt 上传代码到您的私有服务器帐户的方法。

### 通过 Steam 客户端

Steam 客户端可以从您的本地文件夹上传代码。在这种情况下，可以使用 Grunt 将文件从 `dist` 文件夹复制到 Steam 用来上传数据的本地文件夹来完成提交代码的功能。

不幸的是，该 `copy` 插件可能会导致 Steam 客户端出现一些问题，所以在这种情况下，应使用 [rsync](https://www.npmjs.com/package/grunt-rsync) 插件。

    npm install grunt-rsync --save-dev


  现在添加参数 `private_directory` 到您的凭据文件和 grunt 文件并配置 `rsync`。为了保证提交到主服务器任务的交叉兼容性，我们将使用 `grunt.registerTask` 创建一个新的 `private` 任务。

    module.exports = function(grunt) {

        // 参数
        var private_directory = grunt.option('private_directory') || config.private_directory;

        grunt.loadNpmTasks('grunt-screeps')
        grunt.loadNpmTasks('grunt-contrib-clean')
        grunt.loadNpmTasks('grunt-contrib-copy')
        grunt.loadNpmTasks('grunt-rsync')

        var currentdate = new Date();

        grunt.initConfig({

            // 此处省略
            screeps: {},
            clean: {},
            copy: {},

            // 将文件复制到客户端用于提交到私有服务器的文件夹。
            // 使用 rsync，以便客户端仅上传被更改的文件。
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

现在，代码就可以被简单的推送到您的私有服务器了。

    grunt private

### 使用服务器 Mod


您需要在私有服务器上安装一些身份验证模块，例如 [screepsmod-auth](https://github.com/ScreepsMods/screepsmod-auth)，之后才能使用该方法提交代码。

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

## 代码美化

使代码格式保持优雅是 Grunt 的一项常见任务，可以通过 [jsbeautifier](https://www.npmjs.com/package/grunt-jsbeautifier) 插件来完成。

    npm install grunt-jsbeautifier --save-dev

现在，为 Grunt 添加两个新任务 - 一个用于清理代码，另一个用于验证代码标准，我们将把这些任务作为测试套件的开始（此任务可以在以后扩展）。该任务配置为在 `.jsbeautifyrc` 查找[样式规则](https://github.com/beautify-web/js-beautify#options)。

    module.exports = function(grunt) {

        // 参数
        var private_directory = grunt.option('private_directory') || config.private_directory;

        grunt.loadNpmTasks('grunt-screeps')
        grunt.loadNpmTasks('grunt-contrib-clean')
        grunt.loadNpmTasks('grunt-contrib-copy')
        grunt.loadNpmTasks('grunt-rsync')

        var currentdate = new Date();

        grunt.initConfig({

            // 此处省略
            screeps: {},
            clean: {},
            copy: {},

            // 应用代码样式
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

现在可以在将代码按规则进行格式化

    grunt pretty

或者执行简单的测试

    grunt test


## 添加统计

有时看着代码上传会很无聊。[time-grunt](https://www.npmjs.com/package/time-grunt) 插件提供了每个任务花费多少时间的细分统计。

    npm install time-grunt --save-dev

现在，作为 grunt 函数的第一行，加载该插件并将 grunt 对象传递给它。

    module.exports = function(grunt) {
      require('time-grunt')(grunt);
      ...
    }


## 完整的例子

将所有这些插件组合在一起可以即可提供一个功能强大但易于使用的工具来管理 Screeps 的部署。

    module.exports = function (grunt) {
      require('time-grunt')(grunt);

      // 从 .screeps.json 拉取默认配置（包括用户名和密码）
      var config = require('./.screeps.json')

      // 允许 grunt 配置项覆盖默认配置
      var branch = grunt.option('branch') || config.branch;
      var email = grunt.option('email') || config.email;
      var password = grunt.option('password') || config.password;
      var ptr = grunt.option('ptr') ? true : config.ptr
      var private_directory = grunt.option('private_directory') || config.private_directory;


      var currentdate = new Date();
      grunt.log.subhead('Task Start: ' + currentdate.toLocaleString())
      grunt.log.writeln('Branch: ' + branch)

      // 加载需要的任务
      grunt.loadNpmTasks('grunt-screeps')
      grunt.loadNpmTasks('grunt-contrib-clean')
      grunt.loadNpmTasks('grunt-contrib-copy')
      grunt.loadNpmTasks('grunt-file-append')
      grunt.loadNpmTasks("grunt-jsbeautifier")
      grunt.loadNpmTasks("grunt-rsync")

      grunt.initConfig({

        // 将 dist 文件夹中的所有文件推送到 screeps。 dist 文件夹中的内容
        // 以及要发送的内容取决于所使用的任务。
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

        // 将所有源文件复制到 dist 文件夹
        // 通过将路径分隔符转换为下划线来展平文件夹结构
        copy: {
          // 将游戏代码推送到dist文件夹，以便在将其发送到 screeps 服务器之前可以对其进行修改。
          screeps: {
            files: [{
              expand: true,
              cwd: 'src/',
              src: '**',
              dest: 'dist/',
              filter: 'isFile',
              rename: function (dest, src) {
                // 通过将文件夹分隔符替换成下划线来重命名文件
                return dest + src.replace(/\//g,'_');
              }
            }],
          }
        },


        // 将文件复制到客户端用于提交到私有服务器的文件夹。
        // 使用 rsync，以便客户端仅上传被更改的文件。
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


        // 使用当前时间戳添加版本变量
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


        // 移除 dist 文件夹中的所有文件。
        clean: {
          'dist': ['dist']
        },


        // 应用代码样式
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

      // 将它们组合为一个默认任务。
      grunt.registerTask('default',  ['clean', 'copy:screeps',  'file_append:versioning', 'screeps']);
      grunt.registerTask('private',  ['clean', 'copy:screeps',  'file_append:versioning', 'rsync:private']);
      grunt.registerTask('test',     ['jsbeautifier:verify']);
      grunt.registerTask('pretty',   ['jsbeautifier:modify']);
    }
