title: TypeScript and Screeps, from Beginner to Advanced, Pt. 1
contributed:
    name: bryan
    link: https://github.com/bryanbecker
    date: 2017-05-15
---

# TypeScript and Screeps, from Beginner to Advanced, Pt. 1

* [Part 1](http://docs.screeps.com/contributed/typescript-and-screeps-1.html)
**Introduction to TypeScript and setting up a TypeScript + Screeps environment**
* [Part 2](http://docs.screeps.com/contributed/typescript-and-screeps-2.html)
In depth look using TypeScript's features to extend the built-in Screeps objects and methods
* [Part 3](http://docs.screeps.com/contributed/typescript-and-screeps-3.html)
Getters, setters, and meta programming with decorators

Part One of this series with introduce setting up a TypeScript project for Screeps.  This article will present a basic guide to setting up a TypeScript project for Screeps, and a brief introduction to third party tools.

For users who already have a working TypeScript setup, you can directly skip to [Part 2](http://docs.screeps.com/contributed/typescript-and-screeps-2.html).

For a quick-start, skip down to [screeps-typescript-starter](#screeps-typescript-starter).

## Why TypeScript?

TypeScript is a superset of ECMAScript (a fancy way to say Javascript).  That means it has *all* the features of ECMA, *plus* some extra ones.  When a project is compiled, Typescript will process all your files, and "transpile" them into the target Javascript version (ES6, in the case of Screeps).  This works similarly to Babel, if you have used that in the past.

Using TypeScript can be frustrating when you first start, because it seems the compiler never stops complaining. Power through it. This ends up being the most useful feature of TypeScript once you get going. Towards then, we'll look at some concrete examples of this.

This guide won't attempt to teach you typescript ([Typescript Deep Dive](https://basarat.gitbooks.io/typescript/docs/why-typescript.html) is an execellent starting resource for that), but will provide an introduction in getting set up, and using the more advanced features to your advantage

## Getting Started with TypeScript

> **Note**: If you already have a Typescript project that compiles, and understand the basic tooling, you can most likely skip the rest of this article

This section will only provide a very brief overview of getting started with TypeScript.  For more in-depth, please see the above Deep Dive link, or the TypeScript docs.

### Install Your Tooling

To get off the ground with typescript, you're going to need quite a few different tools:

* An IDE that supports TS ([Slant](https://www.slant.co/topics/5815/~ides-for-typescript-development) recommends Visual Studio Code as the most popular choice)

* NPM (not in the scope of this article)

* The typescript compiler:
  ```bash
  # for cutting edge in development version (currently 2.4.0):
  $ npm install -g typescript@next
  # for latest stable version (currently 2.3.2):
  $ npm install -g typescript@latest
  ```
* [Typings](https://github.com/typings/typings) TypeScript definition manager
  ```bash
  $ npm install -g typings
  ```
* *Recommended*: [webpack](https://webpack.js.org/guides/webpack-and-typescript/)
for bundling your project into one output file
  ```bash
  $ npm install -g webpack
  ```
* *Recommended* (but configuration not covered here): [tslint](https://palantir.github.io/tslint/)
for keeping your coding style standard
  ```bash
  $ npm install -g tslint
  ```

### Creating Your First New Project
> **Note**: This is just a brief guide to getting a bare project going. For most users, the **screeps-typescript-starter** below will be a better & more full-feature choice

> **Note**: Your IDE may complete these steps for you when starting a new project... If so, go ahead and skip down to **Typings**

To get a bare project going, we have to first `init` all our tools.  `cd` into your project directory (presumably, an empty folder), and run the following:

```bash
$ cd my_proj/
# start an npm project
/my_proj$ npm init
# start a typescript project (only generates the config)
/my_proj$ tsc --init
# initialize typings
/my_proj$ typings init
# if you are using tslint
/my_proj$ tslint --init
# initialize a git repo (you are using git, aren't you?)
/my_proj$ git init

```

The main result of this is to generate default `tsconfig.json` and `typings.json` files.

### tsconfig.json

Yup.  We're *still* not ready to start coding yet (but almost!).  We need to let TypeScript know about our project and our target environment.

To set up TypeScript for Screeps, we need to make sure the following are set as a bare-minimum in the `tsconfig.json`:

```JSON
{
  "compilerOptions": {
    "module": "commonjs",           /* Export NodeJS style modules (required for Screeps) */
    "target": "es6",                /* Export as ES6 (so we get the cool features) */
    "experimentalDecorators": true  /* We are going to use these later in this guide */
  },
  "include": [          /* Tell the compiler which directories contain your actual code */
    "src/**/*.ts",      /* Tell TypeScript to include all our TypeScript files */
    "src/**/*.d.ts",    /* Tell TypeScript to include all our definition files */
    "typings/**/*.d.ts" /* Tell TypeScript about our installed Typings
  ]
}
```

### Typings

The `typings` tool is how we install TypeScript typings for external JS modules (such as those from `npm`).

Lets install the typings for Screeps, Lodash (screeps is using v3.10.1 at the time of this article), and Node (v6.10.3 at the time of this article).  This way the TypeScript compiler can know about these libraries, even though they aren't actually present in your code

```bash
# (don't worry, global in this context means "ambient" [ see below ]
# it's not actually installing the typings globally on your computer)
# Install Screeps Typings
/my_proj$ typings install --save --global github:screepers/Screeps-Typescript-Declarations/dist/screeps.d.ts 
# Install Node Typings from definately typed repo for version 6
/my_proj$ typings install --save --global "dt~node@6.0.0"
# Install Lodash Typings from definately typed repo for version 3.10
/my_proj$ typings install --save --global "dt~lodash@3.10.0"
```

#### Newbie Gotcha: Ambient Declarations vs. Module Declarations

As you may have guessed, typing is a key feature of TypeScript.  However, a common "gotcha" for beginners is the difference between "ambient" (also called "global") typing declarations, and "module" typing declarations.

Above, we installed the typings as "global".  This means the declarations inside are just assumed to be available everywhere in your project, without having to `import` or `require` them.

For example, `Creep` is ambient, because we can just call `Creep.moveTo(...)` without having to first call `import { Creep } from "some-module";`.

Your own code will largely use "module" declarations.  That is, the declaration and type information won't be available in your files, unless you `import` it first.

TypeScript will automatically infer which type you are using in the file.  If your file contains the `export` keyword anywhere, TS will automatically treat the file as a Module.  If not, it will treat the file as ambient (AKA global).

A common mistake is to accidently include `export` somewhere in a file that is meant to be global, and suddenly have typescript complain about being unable to find your definitions because they suddenly switched from "ambient" to "module".

### Compiling with webpack

So you have some code.  Now what?

There are a lot of ways to compile typescript for export (the built in compiler, grunt, gulp, webpack, etc, etc).  Rather than filling this guide with more TS-specific information, this section will merely serve as a guide to point you in the right direction.  For a full-featured setup, see the **screeps-typescript-starter** below.

To start with, at a minimum, you will need [webpack](https://webpack.js.org/guides/webpack-and-typescript/) and either [ts-loader](https://github.com/TypeStrong/ts-loader/) or [awesome-typescript-loader](https://github.com/s-panferov/awesome-typescript-loader)
(loaders integrate typescript with webpack).  This guide recommends **awesome-typescript-loader**:

```bash
/my_proj$ npm install --save-dev webpack awesome-typescript-loader
```

You will need to create and edit a `webpack.config.js` in your project root.  [webpack.js.org](https://webpack.js.org/guides/webpack-and-typescript/) has great instructions for setting up with TypeScript.

There are a few Screeps-specific configuration options you should make sure are set, marked below:

```js
module.exports = {
  entry: './src/main.ts',       // the main exported module of your application
  output: {
    filename: './main.js',      // the name of the compiled output file
    libraryTarget: 'commonjs2', // required to export as module
  },

  target: 'node',               // required for Screeps

  node: {                       // Screeps specific Node Settings
    console: true,
    global: true,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
  // ...snip
}
```

#### Uploading your code to the Screeps server

There are a few ways to get this code into screeps.  The simplest way is to just copy and paste the compiled `main.js` directly into the screeps editor.

More advanced options include:

* Uploading via grunt (see [Committing scripts using external tools](http://docs.screeps.com/commit.html) and [Advanced Grunt](http://docs.screeps.com/contributed/advanced_grunt.html))
* Uploading via gulp ([gulp-screeps](https://github.com/pcmulder/gulp-screeps))
* Uploading via webpack ([screeps-webpack-plugin](https://github.com/langri-sha/screeps-webpack-plugin))

### screeps-typescript-starter

The community maintained [screeps-typescript-starter](https://github.com/screepers/screeps-typescript-starter) provides a ready-to-go setup for Screeps and TypeScript.

To get started, just clone or download the repository, install dependencies with `npm install`, and follow the directions to add your Screeps login credentials.

Features of the project include:

* Preconfigured tsconfig
* Webpack set up for automatic deploys to server
* Code linting
* [Screeps Profiler](https://github.com/gdborton/screeps-profiler)
* Very basic starter code to start hacking on


##### [Continue on to Part 2](http://docs.screeps.com/contributed/typescript-and-screeps-2.html)
