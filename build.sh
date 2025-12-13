#!/bin/bash
#only for local sanity check

set -euo pipefail

pushd web-buddy >/dev/null
rm -rf out
npm ci
npm run build
touch out/.nojekyll
popd >/dev/null
