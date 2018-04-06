#!/usr/bin/env bash
cd ..
npm run ionic:build
cd electron
mkdir build
cp -r ../www/*  build/
cp main.js build/
cp package.json build/
