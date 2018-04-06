# sh build-run.sh
rm -r build
mkdir build
cp -r ../www/*  build/
cp main.js build/
cp package.json build/
electron-packager build desktoptouch
