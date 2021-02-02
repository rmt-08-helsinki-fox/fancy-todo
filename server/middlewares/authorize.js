//@ts-check
// @ts-ignore
const { User } = require("../models")

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
function authorize(req, res, next) {
    try {
        User.findOne({
            // @ts-ignore
            where: { email: req.decoded.email },
        })
        next()
    } catch (err) {
        res.status(401).json({
            msg: `Not authorized`,
        })
    }
}

module.exports = {
    authorize,
}
