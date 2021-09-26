# promise-settled-aggregate

> Creates a Promise that is resolved after all of the input Promises have either fulfilled or rejected, with an array of the results if all of the provided Promises resolve, or rejected with an AggregateError if some Promises rejected. If exactly one of the input Promises rejected, it is rejected with this rejection instead.

It works like [Promise.allSettled](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) except it will reject with an [AggregateError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError) if some of the promises are rejected, otherwise it resolves with the fulfilled values like [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all).

If only one of the promises is rejected, the rejection will **not** be wrapped in AggregateError.

```js
try {
  const [a, b, c, d] = await promiseSettledAggregate([
    Promise.reject(new Error("Boom")),
    Promise.resolve(2),
    Promise.resolve(true),
    Promise.reject(new Error("Pow")),
  ]);
} catch (err) {
  if (err instanceof AggregateError) {
    err.errors.forEach(console.error);
  } else {
    console.error(err);
  }
}
```

You may copy [the source code](https://github.com/stefee/promise-settled-aggregate/blob/main/promiseSettledAggregate.ts) (see [dist](./dist) for JS) directly into your project as this library is published under the Unlicense license.

You can also install from npm registry (`npm install promise-settled-aggregate`).
