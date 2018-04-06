cd ..
npm run ionic:build
mkdir build
cp -r ../www/*  build/
cp main.js build/
cp package.json build/
cd build
electron .
