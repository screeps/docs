FROM node:9-alpine

RUN apk upgrade --update-cache \
    && apk add git python make

RUN apk add vips-dev fftw-dev build-base --update-cache \
    --repository https://alpine.global.ssl.fastly.net/alpine/edge/testing/ \
    --repository https://alpine.global.ssl.fastly.net/alpine/edge/main

VOLUME ["/src", "/root/.npm"]

WORKDIR /src
