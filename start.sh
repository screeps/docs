set -e
if [[ ! -d node_modules ]]; then
    npm i
fi

cd api
if [[ ! -d node_modules ]]; then
    npm i
fi

cd ..
npm run hexo-server

