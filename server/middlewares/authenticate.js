//@ts-check
const jwt = require("jsonwebtoken")

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
function authenticate(req, res, next) {
    try {
        const token = req.headers.token
        // @ts-ignore
        const decoded = jwt.verify(token, process.env.SECRET_JWT)
        // @ts-ignore
        req.decoded = decoded
        next()
    } catch (err) {
        res.status(401).json({
            msg: `Invalid token`,
        })
    }
}

module.exports = {
    authenticate,
}
