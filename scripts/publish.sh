#!/bin/sh
set -e

pnpm build

cd packages/screen-fit
npm publish

cd -

cd packages/screen-fit-vue
npm publish

echo "✅ Publish completed"
