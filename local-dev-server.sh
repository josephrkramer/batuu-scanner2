#!/bin/bash

if [ ! $(which http-server) ]; then
    npm i -g http-server
fi

http-server
