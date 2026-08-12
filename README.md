# Screeps Documentation

This repository contains the sources for [docs.screeps.com](https://docs.screeps.com).

## Requirements

- Node.js 24
- npm 11

## Install

The main site and API site have independent dependency trees:

```sh
npm ci
npm ci --prefix api
```

## Build

Run the authoritative build from the repository root. It cleans and generates the main site first, generates the API into `public/api`, and verifies the output:

```sh
npm run build
```

The API can still be built independently with `npm run generate --prefix api`. Use `npm run generate-watch` in either project for local content work, or `npm run server` at the root after generating the site.
