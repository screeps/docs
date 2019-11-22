title: 使用外部工具提交代码
---

Screeps 拥有一个小巧的嵌入式编辑器来方便代码的编写。但是，在某些情况下（例如，您想使用 JavaScript 以外的语言或者想使用您的 IDE），您可能不得不使用其他方式将代码从外部提交至您的 Screeps 账户。
 
{% note info %}
如果您是使用 GitHub 完成注册的，则必须先在[帐户设置](https://screeps.com/a/#!/account)中设置 Screeps 的登录密码之后才能使用外部同步。
{% endnote %}

## 使用 Grunt 任务

如果您以前从未使用过 [Grunt](http://gruntjs.com)，请务必查看 [Getting Started](http://gruntjs.com/getting-started) 指南，它会告诉您如何创建 [Gruntfile](http://gruntjs.com/sample-gruntfile) 以及如何安装和使用 Grunt 插件。在您有了一定的了解后，就可以使用以下命令安装此插件：

    npm install grunt-screeps

配置您的 Gruntfile.js:

    module.exports = function(grunt) {

        grunt.loadNpmTasks('grunt-screeps');
    
        grunt.initConfig({
            screeps: {
                options: {
                    email: '<your e-mail>',
                    password: '<your password>',
                    branch: 'default',
                    ptr: false
                },
                dist: {
                    src: ['dist/*.js']
                }
            }
        });
    }

现在，您可以执行以下命令来将您的代码从 `dist` 文件夹提交至 Screeps 账户：

    grunt screeps

## 直接通过 API 进行访问

Screeps Web API 有一个用于上传/下载代码的接口 `https://screeps.com/api/user/code`。支持通过 `POST` 上传代码和通过 `GET` 下载代码。这两种方法都接受[基本访问鉴权](http://en.wikipedia.org/wiki/Basic_access_authentication)。接口可以接受或返回一个包含所有模块的 JSON 数据，其中模块的名作为键，模块的内容作为值。

使用 Node.js 提交代码的示例：

    var https = require('https');

    var email = '<your e-mail>',
        password = '<your password>',
        data = {
            branch: 'default',         
            modules: {
                main: 'require("hello");',
                hello: 'console.log("Hello World!");'
            }
        };

    var req = https.request({
        hostname: 'screeps.com',
        port: 443,
        path: '/api/user/code',
        method: 'POST',
        auth: email + ':' + password,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    });

    req.write(JSON.stringify(data));
    req.end();

请求:

    POST /api/user/code HTTP/1.1
    Content-Type: application/json; charset=utf-8
    Host: screeps.com:443
    Authorization: Basic PHlvdXIgZS1tYWlsPjo8eW91ciBwYXNzd29yZD4=
    Connection: close
    Transfer-Encoding: chunked

    {"branch":"default","modules":{"main":"require(\"hello\");","hello":"console.log(\"Hello World!\");"}}

响应:

    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 8
    Date: Mon, 02 Feb 2015 18:46:11 GMT
    Connection: close

    {"ok":1}
