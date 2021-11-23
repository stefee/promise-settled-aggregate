async function promiseSettledAggregate(values) {
    const allResults = await Promise.allSettled(values);
    const rejectedOnly = allResults.filter((result)=>result.status === "rejected"
    );
    if (rejectedOnly.length <= 0) {
        // SAFETY: It is safe to cast to PromiseFulfilledResult because there were
        // no rejected promises, and so all of them must have been fulfilled.
        const allFulfilled = allResults;
        const allFulfilledValues = allFulfilled.map((result)=>result.value
        );
        // SAFETY: It is safe to cast to Awaited<T> because we have mapped over all
        // the settled results, and so the values will be in the same order and
        // match the awaited type of the input promises.
        return allFulfilledValues;
    }
    throw new AggregateError(rejectedOnly.map((result)=>result.reason
    ), "Some promises were rejected");
}
export default promiseSettledAggregate;


//# sourceMappingURL=promiseSettledAggregate.js.map