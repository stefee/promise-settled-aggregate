# promise-settled-aggregate

It works like [Promise.allSettled](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) except it will reject with an [AggregateError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError) if some of the promises are rejected, otherwise it resolves with the fulfilled values like [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all).

If only one of the promises is rejected, the rejection will **not** be wrapped in AggregateError.

```tsx
try {
  const [a, b, c, d]: number[] = await promiseSettledAggregate([
    Promise.reject(new Error("Boom")),
    Promise.resolve(2),
    Promise.resolve(3),
    Promise.reject(new Error("Pow")),
  ]);
} catch (err: unknown) {
  if (err instanceof AggregateError) {
    err.errors.map(console.error);
  } else {
    console.error(err);
  }
}
```

You may copy [the source code](https://github.com/stefee/promise-settled-aggregate/blob/main/promiseSettledAggregate.js) directly into your project as this library is published under the Unlicense license.
