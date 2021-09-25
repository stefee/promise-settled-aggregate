#! /bin/bash
npm exec --no tsc
npm exec --no esbuild -- promiseSettledAggregate.ts --platform=neutral --format=cjs --outfile=promiseSettledAggregate.dist.js
npm exec --no esbuild -- promiseSettledAggregate.ts --platform=browser --format=cjs --target=es2017 --minify --outfile=promiseSettledAggregate.dist.min.js
