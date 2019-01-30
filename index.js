const assert = require('assert')

/**
 * 
 * @param {Request} req Express request object
 * @param {Response} res Express Response object
 * @param {Function} next Express next function
 */
function middleware(req, res, next) {
    assert.equal(typeof next, 'function', 'next should be a function')
    assert.ok(res.send, 'Response should have a send function')
    assert.ok(res.header, 'Response should have a header function')
    assert.ok(req.headers, 'Request should have a headers object')
    assert.notEqual(req.headers.origin, undefined, 'Request should have a headers.origin value')
    res.header("Access-Control-Allow-Credentials", true)
    res.header("Access-Control-Allow-Origin", req.headers.origin)
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) || "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name")
    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) || "POST, GET, PUT, DELETE, OPTIONS")
    if ('OPTIONS' == req.method) {
        res.send(200)
    }
    else {
        next()
    }
}

/**
 * Calls the easyCors middleware function for all the requests. Also the example of the usage for middleware function.
 * @param {express app} app 
 */
function easyCors(app) {
    assert.ok(app.all, 'app should have all function')
    return (req, res, next) => app.all('*', middleware(req, res, next))
}

module.exports = {
    middleware,
    easyCors
}

/* l.easyCors({all: () => {}})({headers: {origin: 1}}, {send: 'send', header: () => {}}, () => {}) should be undefined for proper function call structuring */