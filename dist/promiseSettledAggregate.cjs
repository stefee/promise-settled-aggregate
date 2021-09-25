"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;
const promiseSettledAggregate = async (a)=>{
    const b = await Promise.allSettled(a), c = b.filter((d)=>"rejected" === d.status
    );
    if (1 === c.length && c[0]) throw c[0].reason;
    if (c.length > 0) throw new AggregateError(c.map((e)=>e.reason
    ), "Some promises were rejected");
    const f = b;
    return f.map((g)=>g.value
    );
};
var _default = promiseSettledAggregate;
exports.default = _default;

