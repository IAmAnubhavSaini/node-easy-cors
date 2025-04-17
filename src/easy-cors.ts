import { Request, Response } from "express";

import assert from "assert";

function easyCors(req: Request, res: Response, next: Function) {
    assert.strictEqual(typeof next, "function", "next should be a function");
    assert.ok(res.send, "Response should have a json function");
    assert.ok(res.header, "Response should have a header function");
    assert.ok(req.headers, "Request should have a headers object");
    assert.notStrictEqual(req.headers["origin"], undefined, "Request should have a headers.origin value");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", req.headers["origin"]);
    res.header(
        "Access-Control-Allow-Headers",
        req.headers["access-control-request-headers"] ||
        "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name"
    );
    res.header(
        "Access-Control-Allow-Methods",
        req.headers["access-control-request-method"] || "POST, GET, PUT, DELETE, OPTIONS"
    );
    if ("OPTIONS" === req.method) {
        res.send(200);
    } else {
        next();
    }
}

export {
    easyCors
}
