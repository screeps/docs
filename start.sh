#!/bin/sh

set -e
if [[ ! -d node_modules/.bin ]]; then
    npm i
fi

cd api
if [[ ! -d node_modules/.bin ]]; then
    npm i
fi

npm run generate-watch &
cd ..
npm run generate-watch &
npm run server
