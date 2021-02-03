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
        const data = await ToDo.findByPk(+req.params.id, {
            where: {
                UserId: req.decoded.id,
            },
        })
        if (data.UserId !== req.decoded.id) {
            throw err
        }
        next()
    } catch (err) {
        console.log("Authorize error")
        res.status(401).json({
            msg: `Not authorized`,
        })
    }
}

module.exports = {
    authorize,
}
