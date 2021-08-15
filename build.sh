#! /bin/bash
npm exec --no esbuild -- promiseSettledAggregate.js --platform=neutral --format=cjs --outfile=promiseSettledAggregate.dist.js
npm exec --no esbuild -- promiseSettledAggregate.js --platform=browser --format=cjs --target=es2017 --minify --outfile=promiseSettledAggregate.dist.min.js
