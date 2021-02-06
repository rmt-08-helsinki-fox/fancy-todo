const {Todo} = require("../models/")

const authorize = function (req, res, next) {
    Todo.findOne({
        where: {
            id : req.decoded.id
        },
        returning: true
    })
    .then(data => {
        if (req.decoded.id !== data.id) {
            throw {
                name: "customError",
                message: `You are not authorized to do this`,
                status : 401
            }
        }
        next()
    })
    .catch(err => {
        next(err)
    })
}

module.exports = authorize