const {Todo} = require("../models/")

const authorize = function (req, res, next) {
    Todo.findOne({
        where: {
            id : req.decoded.id
        }
    })
    .then(data => {
        console.log(data)
        let userData
        for (let i = 0; i < data.length; i++) {
            userData = data[i].id
        }
        if (req.decoded.id !== userData) {
            let errorMsg = {
                message: `You are not authorized to do this`
            }
            throw errorMsg
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = authorize