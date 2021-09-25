type AwaitedAll<Promises> = {
  -readonly [I in keyof Promises]: Promises[I] extends PromiseLike<infer Value>
    ? Value
    : Promises[I];
};

const promiseSettledAggregate = async <T extends readonly unknown[]>(
  values: T
): Promise<AwaitedAll<T>> => {
  const allResults = await Promise.allSettled(values);
  const rejectedOnly = allResults.filter(
    (result): result is PromiseRejectedResult => result.status === "rejected"
  );
  if (rejectedOnly.length === 1 && rejectedOnly[0]) {
    throw rejectedOnly[0].reason;
  }
  if (rejectedOnly.length > 0) {
    throw new AggregateError(
      rejectedOnly.map(({ reason }) => reason as unknown),
      "Some promises were rejected"
    );
  }

  // SAFETY: We must only cast to PromiseFulfilledResult if we know that the
  // status of every result is "fulfilled". Since there were zero rejected
  // promises, then all of them must have been fulfilled.
  const fulfilledResults = allResults as PromiseFulfilledResult<unknown>[];

  // SAFETY: We must only cast to AwaitedAll if we know that the array
  // contains the promises mapped to their fulfilled values. We know this
  // because we have all of the settled results, and all of them are fulfilled.
  return fulfilledResults.map(({ value }) => value) as AwaitedAll<T>;
};

export default promiseSettledAggregate;
