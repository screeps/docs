This project contains the sources of the [documentation web site](http://docs.screeps.com) for Screeps online game.

You need to have Node.js in order to build this project.

1. Install all npm dependencies:

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

### Docker Support

1. Build the docker image:

`docker build -t screeps_docs .`

2. Run it

`docker run -d -p 3000:3000 screeps_docs`

3. Connect to it at http://localhost:3000