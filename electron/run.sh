# Move files to build directory
# cp hisptz-touch/platforms/browser/www/*  build/
mkdir build
cp -r ../www/*  build/
cp main.js build/
cp package.json build/
cd build
electron .
