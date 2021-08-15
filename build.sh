#! /bin/bash
npm exec --no esbuild -- allOrNone.js --platform=neutral --format=cjs --outfile=allOrNone.dist.js
npm exec --no esbuild -- allOrNone.js --platform=browser --format=cjs --target=es2017 --minify --outfile=allOrNone.dist.min.js
