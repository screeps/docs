---
title: Third Party Tools
---

Screeps has a rich third party development community which have built a number of tools, libraries and web applications.
If you have a tool not listed here, feel free to edit this article.

{% note warn Use Caution %}

*   Never give your password out to a third party.
*   Many third party programs are built using unofficial APIs and may stop working at any time.
*   All third party programs are run at your own risk- they are not reviewed by game devs and could cause unforeseen issues.
{% endnote %}

## Languages Support

You can set up an external transpiler to write your Screeps AI in another language.   

### TypeScript

*   [typescript-starter](https://github.com/screepers/screeps-typescript-starter) is a starting point for players who want to program in TypeScript.
*   [Typescript-Declarations](https://github.com/screepers/Screeps-Typescript-Declarations) is a set of TypeScript declarations to cover the Screeps API.

### Python

*   [screeps-starter-python](https://github.com/daboross/screeps-starter-python/) is a platform you can use to play Screeps in Python.

### Rust

*   [screeps-starter-rust](https://github.com/daboross/screeps-starter-rust) is a alpha-status platform you can use to play Screeps in Rust.

### Kotlin

*   [kotlin-starter](https://github.com/exaV/screeps-kotlin-starter) is a starting point for players who want to program in Kotlin.
*   [kotlin-types](https://github.com/exaV/screeps-kotlin-types) is a set of Kotlin declarations to cover the Screeps API.

## API Clients

The Screeps API is not official and may change at any time. These clients are maintained by the community and are used to generate many of the services and programs on this page.

*   [python](https://github.com/screepers/python-screeps)
*   [node](https://github.com/screepers/node-screeps-api)


## Apps

*   [Screeps Monitor](https://play.google.com/store/apps/details?id=com.danielscholte.screepsmonitor) is an Android app that provides players with account and game statistics, as well as a full messaging client and a market history. (No longer available).


## Backups

*   [screeps-backup](https://github.com/screepers/screeps-backup) is a simple backup and restore utility for memory and segments.


## Consoles

*   [screeps_console](https://github.com/screepers/screeps_console) is an interactive stand alone console built with python. It supports common console keyboard shortcuts, has a number of built in commands, and has light and dark themes. There is a non-interactive version that is also included.


## Profilers

*   [gdborton's profiler](https://github.com/gdborton/screeps-profiler) is a function wrapper based profiler that is extremely useful in finding performance issues.


## Programming Tools

*   [closure-compiler-externs](https://github.com/screepers/screeps-closure-compiler-externs) defines the Screeps API so that closure does not rewrite those calls.
*   [ScreepsAutocomplete](https://github.com/Garethp/ScreepsAutocomplete) provides autocomplete data for the Screeps API.
*   [screeps-server-mockup](https://github.com/Hiryus/screeps-server-mockup) private server package for unit tests.


## Notifications

*   [Screeps Notify](https://github.com/screepers/screeps_notify) provides an in game interface which lets players send messages to out of game services. It has a built in SMS system and can also support sending messages to arbitrary http endpoints.


## Statistics

Screeps runs constantly, and as a player it's not possible to watch everything that occurs. There are also issues which may show up when watching long term trends but not during the times which players are watching. For these reasons it's not surprising that the most popular applications are those used to track statistics.

*   [ScreepsPlus Grafana](https://screepspl.us/services/grafana) is a services provided by [ags131]() that works with Grafana. In order to avoid password sharing it uses an agent to run and collect statistics.
*   [screeps-stats](https://github.com/screepers/screeps-stats) stores console data and statistics in elasticsearch, making it accessible in kibana. This system utilizes segments to reduce the in game demand that storing lots of data can cause. This is a self hosted service.
*   [screeps-grafana](https://github.com/screepers/screeps-grafana) is the original stats program. It uses Grafana as it's front it. Like screeps-stats this is a self hosted option.
*   [screeps-ConsoleStats](https://github.com/screepers/screeps-ConsoleStats) provides stats without requiring an external service.


## Uploaders

Pushing code to the server can be done using these plugins to common programs.

*   [grunt-screeps](https://github.com/screeps/grunt-screeps) is written and maintained by the Screeps team. It used to upload code to the screeps server using [Grunt](https://gruntjs.com/).
*   [gulp-screeps](https://github.com/pcmulder/gulp-screeps) is used to upload code to the screeps server using [Gulp](http://gulpjs.com/). (No longer available).


## Web Client Extensions

A javascript plugin extension, such as [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) and [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/), are needed to run these plugins.

*   [Alliance Overlay](https://raw.githubusercontent.com/LeagueOfAutomatedNations/loan-browser-ext/master/dist/alliance-overlay.user.js) adds information from the [League of Automated Nations](http://www.leagueofautomatednations.com/map) to the game map.
*   [Room Claim Assistant](https://github.com/Esryok/screeps-browser-ext/raw/master/room-claim-assistant.user.js) colors extends the "Owner Control Level" to make room selection easier. It adds the mineral to the view, turns two source rooms green, claimed or reserved rooms red, and "signed" rooms by other players orange.
*   [Visible Room Tracker](https://github.com/Esryok/screeps-browser-ext/blob/master/visible-room-tracker.user.js) automatically sets a memory location with your current visible room, allow you to do things such as turn on visualizations only when needed.
*   [ScreepsSC](https://github.com/stybbe/Screeps-SC) is a Chrome extension which adds new features and makes more information available on the Screeps website. Some features include making market history more readable, adding a battle radar, letting users view other player's creep names, and enhancing the leaderboard.
