#!/bin/sh

set -e
if [[ ! -d node_modules/.bin ]]; then
    npm i --registry=https://registry.npm.taobao.org
fi

cd api
if [[ ! -d node_modules/.bin ]]; then
    npm i --registry=https://registry.npm.taobao.org
fi

cd ..
npm run hexo-server
