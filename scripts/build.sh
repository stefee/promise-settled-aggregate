#! /bin/bash
node_modules/.bin/swc promiseSettledAggregate.ts -o dist/promiseSettledAggregate.js --config-file scripts/.swcrc
node_modules/.bin/swc promiseSettledAggregate.ts -o dist/promiseSettledAggregate.cjs --config-file scripts/.swcrc.cjs.json
node_modules/.bin/swc promiseSettledAggregate.ts -o dist/promiseSettledAggregate.min.js --config-file scripts/.swcrc.minify.json
