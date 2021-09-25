import promiseSettledAggregate from "./promiseSettledAggregate";

it("rejects immediately on invalid arg", async () => {
  // @ts-expect-error (omitting required param for test purposes)
  await expect(() => promiseSettledAggregate()).rejects.toThrow();
});

it("returns a promise", async () => {
  const p = promiseSettledAggregate([]);
  expect(p).toBeInstanceOf(Promise);
  await p;
});

it("returns resolved values if all promises resolve", async () => {
  const result = await promiseSettledAggregate([
    Promise.resolve(5),
    Promise.resolve(true),
  ]);
  expect(result).toEqual([5, true]);
});

it("rejects with the error if one of the promises rejected", async () => {
  const err = new Error("Boom!");
  await expect(async () => {
    const result = await promiseSettledAggregate([
      Promise.resolve(5),
      Promise.reject(err),
    ]);
    return result;
  }).rejects.toThrow(err);
});

it("rejects with AggregateError if multiple of the promises rejected", async () => {
  const err = new Error("Boom!");
  const err2 = new Error("Woopsie!");
  let aggregateErr: AggregateError | undefined;
  await expect(async () => {
    const result = await promiseSettledAggregate([
      Promise.resolve(5),
      Promise.reject(err),
      Promise.reject(err2),
    ]).catch((e) => {
      aggregateErr = e as AggregateError;
      throw e;
    });
    return result;
  }).rejects.toThrow("Some promises were rejected");
  expect(aggregateErr?.name).toBe("AggregateError");
  expect(aggregateErr?.errors).toEqual([err, err2]);
});
