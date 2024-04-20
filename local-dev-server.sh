#!/bin/bash

if [ ! $(which tsc) ]; then
    npm install -g typescript
fi

if [ ! $(which http-server) ]; then
    npm i -g http-server
fi

http-server
