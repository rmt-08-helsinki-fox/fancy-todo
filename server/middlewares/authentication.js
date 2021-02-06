const { decodeToken } = require('../helpers/jwt');

function authentication(req, res, next) {
    try {
        console.log("this is ayth", 123)
        if(req.headers.access_token) {
            req.payload = decodeToken(req.headers.access_token, process.env.SECRET_KEY);
            next();
        } else {
            throw { name: "Unauthorized", message: "please login", status: 401 }
        }
    } catch (err) {
        if(err.name === "JsonWebTokenError") {
            err = { name: "Unauthorized", message: "please login", status: 401 }
        }
        next(err)
    }
}

module.exports = authentication;