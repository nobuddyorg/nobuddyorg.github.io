#!/bin/bash

pushd web-buddy
npm ci
npm run build
rm -rf out
touch out/.nojekyll
rm -rf ../docs
cp -a out/. ../docs
popd
