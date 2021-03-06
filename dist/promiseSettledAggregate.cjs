"use strict";
async function promiseSettledAggregate(a) {
    const b = await Promise.allSettled(a), c = b.filter((a)=>"rejected" === a.status
    );
    if (c.length <= 0) {
        const d = b, e = d.map((a)=>a.value
        );
        return e;
    }
    throw new AggregateError(c.map((a)=>a.reason
    ), "Some promises were rejected");
}
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;
var _default = promiseSettledAggregate;
exports.default = _default;


//# sourceMappingURL=promiseSettledAggregate.cjs.map