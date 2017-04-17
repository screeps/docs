This project contains the sources of the [documentation web site](http://docs.screeps.com) for Screeps online game.

You need to have Node.js in order to build this project.

1. Install all npm dependendcies:

```
npm install
cd api
npm install
cd ..
```
    
2. Generate static site:

```
npm run generate
cd api
npm run generate
cd ..
```

You can use `generate-watch` instead of `generate` to sync changes in real time.

3. Run development server:

```
npm run server
```

