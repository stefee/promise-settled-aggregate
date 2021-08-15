const promiseSettledAggregate = async (values) => {
  const allResults = await Promise.allSettled(values);
  const rejectedOnly = allResults.filter(
    (result) => result.status === "rejected"
  );
  if (rejectedOnly.length === 1) {
    throw rejectedOnly[0].reason;
  }
  if (rejectedOnly.length > 0) {
    throw new AggregateError(
      rejectedOnly.map(({ reason }) => reason),
      "Some promises were rejected"
    );
  }
  return allResults.map(({ value }) => value);
};

export default promiseSettledAggregate;
