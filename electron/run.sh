cd ..
npm run ionic:build
cd electron
rm -r build
mkdir build
cp -r ../www/*  build/
cp main.js build/
cp package.json build/
cd build
../node_modules/electron/dist/electron .
