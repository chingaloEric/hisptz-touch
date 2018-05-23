cd ..
npm run ionic:build --prod
cd electron
rm -r build
mkdir build
cp -r ../www/*  build/
cp main.js build/
cp package.json build/
electron-packager build --ignore='\.\/app\/*\.*' desktoptouch
