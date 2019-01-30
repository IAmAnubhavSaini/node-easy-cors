/**
 * 
 * @param {Request} req Express request object
 * @param {Response} res Express Response object
 * @param {Function} next Express next function
 */
function middleware(req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) || "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name");
    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) || "POST, GET, PUT, DELETE, OPTIONS");
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
}

/**
 * Calls the easyCors middleware function for all the requests. Also the example of the usage for middleware function.
 * @param {express app} app 
 */
function easyCors(app) {
    app.all('*', middleware)
}

module.exports = {
    middleware,
    easyCors
}
