const promiseSettledAggregate: typeof Promise.all = async (
  values: any
): Promise<any> => {
  const allResults = await Promise.allSettled<unknown[]>(values);
  const rejectedOnly = allResults.filter(
    (result) => result.status === "rejected"
  ) as PromiseRejectedResult[];
  if (rejectedOnly.length === 1 && rejectedOnly[0]) {
    throw rejectedOnly[0].reason;
  }
  if (rejectedOnly.length > 0) {
    throw new AggregateError(
      rejectedOnly.map(({ reason }) => reason as unknown),
      "Some promises were rejected"
    );
  }
  return (allResults as PromiseFulfilledResult<unknown>[]).map(
    ({ value }) => value
  );
};

export default promiseSettledAggregate;
