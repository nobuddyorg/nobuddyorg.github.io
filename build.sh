#!/bin/bash

pushd web-buddy
npm run build
touch out/.nojekyll
cp -a out/. ../docs
popd
