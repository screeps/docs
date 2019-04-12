FROM node:6

WORKDIR /docs
ADD package.json package.json
RUN npm install


WORKDIR /docs/api
ADD api/package.json package.json
RUN npm install

WORKDIR /docs
ADD . .
RUN npm run generate

WORKDIR /docs/api
RUN npm run generate

WORKDIR /docs
CMD npm run server