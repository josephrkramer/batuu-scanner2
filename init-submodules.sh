#!/bin/bash
#Init and update git submodules
git submodule init
git submodule update

#Run a first build to ensure functionality
npm run build
