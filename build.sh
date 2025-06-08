#!/bin/bash

pushd web-buddy
rm -rf out
rm -rf ../docs
npm ci
npm run build
touch out/.nojekyll
cp -a out/. ../docs
popd
