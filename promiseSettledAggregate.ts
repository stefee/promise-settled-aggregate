const promiseSettledAggregate: typeof Promise.all = async (
  values: any
): Promise<any> => {
  const allResults = await Promise.allSettled<unknown[]>(values);
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
  // SAFETY: if there are zero rejected promises, then all of them must be fulfilled
  const fulfilledResults = allResults as PromiseFulfilledResult<unknown>[];
  return fulfilledResults.map(({ value }) => value);
};

export default promiseSettledAggregate;
