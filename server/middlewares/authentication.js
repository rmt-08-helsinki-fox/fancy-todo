const jwt = require("jsonwebtoken")

function authenticate (req, res, next) {
    try {
        const token = req.headers.token;
        const decoded = jwt.verify(token, process.env.SECRET)

        req.decoded = decoded

        next();
    }
    catch (err) {
        let error = {name: "invalid token", message: "invalid token"}
        next(error)
    }
}

module.exports = authenticate