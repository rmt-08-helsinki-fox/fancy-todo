//@ts-check
const { Error, ValidationError } = require("sequelize")

/**
 *
 * @param {*} err
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
function errorHandler(err, req, res, next) {
    // ? Error Sequelize
    if (err instanceof Error) {
        switch (true) {
            case err instanceof ValidationError:
                let msg = err.errors.map((d) => d.message)
                //@ts-ignore
                res.status(400).json({ msg: msg })
                return
        }
        res.status(500).json({ msg: err.message })
        return
    }
    // ? Error Custom
    switch (err.status) {
        case 400:
            // * Bad Request
            res.status(400).json(err)
            return
        case 401:
            // * Unauthorized
            res.status(401).json(err)
            return
        case 403:
            // * Forbidden
            res.status(403).json(err)
            return
        case 404:
            // * Not Found
            res.status(404).json({ msg: `Error not found` })
            return
    }
    // ? Catch All Error
    res.status(500).json({
        msg: err.msg || "Internal Server Error",
        cause: err.message || err,
    })
}

module.exports = {
    errorHandler,
}
