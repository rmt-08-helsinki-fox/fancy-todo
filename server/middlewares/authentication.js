const jwt = require('jsonwebtoken')

function authenticate(req, res, next) {
    try {
        let decoded = jwt.verify(req.headers.access_token, process.env.SECRET);
        req.decoded = decoded;
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = authenticate