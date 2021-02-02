const {Todo} = require("../models/")

const authorize = function (req, res, next) {
    Todo.findAll({
        where: {
            id : req.decoded.id
        }
    })
    .then(data => {
        console.log(data, req.decoded)
        if (req.decoded.id !== data.id) {
            let errorMsg = {
                message: `You are not authorized to do this`
            }
            throw errorMsg
        }
    })
    .catch(err => {
        console.log(err)
    })
}

module.exports = authorize