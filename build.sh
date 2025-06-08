#!/bin/bash

pushd web-buddy
npm ci
npm run build
touch out/.nojekyll
rm -f ../docs
cp -a out/. ../docs
popd
