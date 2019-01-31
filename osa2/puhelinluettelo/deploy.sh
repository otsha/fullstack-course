#!/bin/sh
npm run build
rm -rf ../../../fullstack-puhelinluettelo/build/
cp -r build/ ../../../fullstack-puhelinluettelo/