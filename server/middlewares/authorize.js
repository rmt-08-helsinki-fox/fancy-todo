//@ts-check
// @ts-ignore
const { User, ToDo } = require("../models")

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
async function authorize(req, res, next) {
    try {
        // console.log(req.decoded, "<= req decoded authorize")
        const data = await ToDo.findByPk(+req.params.id, {
            // @ts-ignore
            where: { UserId: req.decoded.id },
        })
        // @ts-ignore
        if (data.UserId !== req.decoded.id) {
            // @ts-ignore
            throw err
        }
        next()
    } catch (err) {
        console.log("Authorize error", err.message)
        res.status(401).json({
            msg: `Not authorized`,
        })
    }
}

module.exports = {
    authorize,
}
