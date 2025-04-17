"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.easyCors = easyCors;
const assert_1 = __importDefault(require("assert"));
function easyCors(req, res, next) {
    assert_1.default.strictEqual(typeof next, "function", "next should be a function");
    assert_1.default.ok(res.send, "Response should have a json function");
    assert_1.default.ok(res.header, "Response should have a header function");
    assert_1.default.ok(req.headers, "Request should have a headers object");
    assert_1.default.notStrictEqual(req.headers["origin"], undefined, "Request should have a headers.origin value");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", req.headers["origin"]);
    res.header("Access-Control-Allow-Headers", req.headers["access-control-request-headers"] ||
        "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name");
    res.header("Access-Control-Allow-Methods", req.headers["access-control-request-method"] || "POST, GET, PUT, DELETE, OPTIONS");
    if ("OPTIONS" === req.method) {
        res.send(200);
    }
    else {
        next();
    }
}
//# sourceMappingURL=easy-cors.js.map