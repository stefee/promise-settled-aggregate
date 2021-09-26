type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

/**
 * Creates a Promise that is resolved after all of the input Promises have
 * either fulfilled or rejected, with an array of the results if all of the
 * provided Promises resolve, or rejected with an AggregateError if some
 * Promises rejected. If exactly one of the input Promises rejected, it is
 * rejected with this rejection instead.
 * @param values An array of Promises.
 * @returns A new Promise.
 */
async function promiseSettledAggregate<
  T extends readonly unknown[] | readonly [unknown]
>(values: T): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }>;

/**
 * Creates a Promise that is resolved after all of the input Promises have
 * either fulfilled or rejected, with an array of the results if all of the
 * provided Promises resolve, or rejected with an AggregateError if some
 * Promises rejected. If exactly one of the input Promises rejected, it is
 * rejected with this rejection instead.
 * @param values An array of Promises.
 * @returns A new Promise.
 */
async function promiseSettledAggregate<T>(
  values: Iterable<T>
): Promise<Awaited<T>[]>;

async function promiseSettledAggregate<T>(
  values: Iterable<T>
): Promise<Awaited<T>[]> {
  const allResults = await Promise.allSettled(values);

  const rejectedOnly = allResults.filter(
    (result): result is PromiseRejectedResult => result.status === "rejected"
  );

  if (rejectedOnly.length <= 0) {
    // SAFETY: It is safe to cast to PromiseFulfilledResult because there were
    // no rejected promises, and so all of them must have been fulfilled.
    const allFulfilled = allResults as PromiseFulfilledResult<unknown>[];

    const allFulfilledValues = allFulfilled.map((result) => result.value);

    // SAFETY: It is safe to cast to Awaited<T> because we have mapped over all
    // the settled results, and so the values will be in the same order and
    // match the awaited type of the input promises.
    return allFulfilledValues as Awaited<T>[];
  }

  if (rejectedOnly.length === 1 && rejectedOnly[0]) {
    throw rejectedOnly[0].reason;
  }

  throw new AggregateError(
    rejectedOnly.map((result) => result.reason as unknown),
    "Some promises were rejected"
  );
}

export default promiseSettledAggregate;
