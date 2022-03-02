# Qover Car Insurance

Backend part of qover car insurance task. Allowing FE to use APIs for login, cars and car offers.

## Running backend with Docker (with DB)

    docker-compose up -d

## Pre-requirements

    - NodeJS
    - NPM
    - MongoDB

## Installation

Use the node package manager to install all dependencies

    npm install

## DB migration (pre populate)

    npx migrate up

## Starting server
Use predefined start script from package.json for starting server. Script have before launch options
for compiling ts in js.

    npm start

## Starting server in debug mode

    npm run debug

## Run tests

    npm run test
