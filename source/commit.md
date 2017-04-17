title: Committing scripts using external tools
---

Screeps has a handy embedded code editor for writing game scripts. However, in some cases (for example, you want to use a language other than JavaScript or integrate with your IDE) you will have to commit game scripts to your Screeps account from outside.
 
{% note info %}
If you signed up using GitHub, you have to set your Screeps password in the [account settings](https://screeps.com/a/#!/account) in order to use external synchronization.
{% endnote %}

## Using Grunt task

If you haven't used [Grunt](http://gruntjs.com) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command: 

    npm install grunt-screeps

Configure your Gruntfile.js:

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

Now you can run this command to commit your code from `dist` folder to your Screeps account:

    grunt screeps

## Using direct API access

Screeps Web API has an endpoint `https://screeps.com/api/user/code` for working with scripts. The two supported methods are `POST` and `GET` for writing and retrieving respectively. Both methods accept [Basic access authentication](http://en.wikipedia.org/wiki/Basic_access_authentication). Endpoints get and return a JSON structure containing modules object with module names as keys and their content as values.

An example of committing code using Node.js:

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
    req.end();</code>

Request:

    POST /api/user/code HTTP/1.1
    Content-Type: application/json; charset=utf-8
    Host: screeps.com:443
    Authorization: Basic PHlvdXIgZS1tYWlsPjo8eW91ciBwYXNzd29yZD4=
    Connection: close
    Transfer-Encoding: chunked

    {"branch":"default","modules":{"main":"require(\"hello\");","hello":"console.log(\"Hello World!\");"}}

Response:

    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 8
    Date: Mon, 02 Feb 2015 18:46:11 GMT
    Connection: close

    {"ok":1}