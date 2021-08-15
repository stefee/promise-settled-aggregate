import allOrNone from "./allOrNone";

it("rejects immediately on invalid arg", async () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  /* @ts-expect-error */
  await expect(() => allOrNone()).rejects.toThrow();
});

it("returns a promise", async () => {
  expect(allOrNone([])).toBeInstanceOf(Promise);
});

it("returns resolved values if all promises resolve", async () => {
  const result = await allOrNone([Promise.resolve(5), Promise.resolve(true)]);
  expect(result).toEqual([5, true]);
});

it("rejects with the error if one of the promises rejected", async () => {
  const err = new Error("Boom!");
  await expect(() =>
    allOrNone([Promise.resolve(5), Promise.reject(err)])
  ).rejects.toThrow(err);
});

it("rejects with AggregateError if multiple of the promises rejected", async () => {
  const err = new Error("Boom!");
  const err2 = new Error("Woopsie!");
  let aggregateErr: AggregateError;
  await expect(() =>
    allOrNone([
      Promise.resolve(5),
      Promise.reject(err),
      Promise.reject(err2),
    ]).catch(async (e) => {
      aggregateErr = e;
      throw e;
    })
  ).rejects.toThrow("Some promises were rejected");
  expect(aggregateErr!.name).toBe("AggregateError");
  expect(aggregateErr!.errors).toEqual([err, err2]);
});
