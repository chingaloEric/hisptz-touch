#!/usr/bin/env bash

npm install
npm install -g -save node-gyp
npm install --save sqlite3
cd node_modules/sqlite3
npm install
npm run prepublishOnly
ls lib/binding/
node-gyp configure --module_name=node_sqlite3 --module_path=../lib/binding/node-v51-linux-x64
node-gyp rebuild --target=1.8.4 --arch=x64 --target_platform=linux --dist-url=https://atom.io/download/atom-shell --module_name=node_sqlite3 --module_path=../lib/binding/node-v51-linux-x64
mv lib/binding/node-v51-linux-x64/ lib/binding/electron-v1.8-linux-x64/
