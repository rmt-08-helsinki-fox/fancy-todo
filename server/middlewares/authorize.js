const {Todo} = require("../models/")

const authorize = function (req, res, next) {
    Todo.findAll({
        where: {
            id : req.decoded.id
        }
    })
    .then(data => {
        let userData
        for (let i = 0; i < data.length; i++) {
            userData = data[i].UserId
        }
        if (req.decoded.id !== userData) {
            let errorMsg = {
                message: `You are not authorized to do this`
            }
            throw errorMsg
        }
    })
    .catch(err => {
        res.status(401).json(err)
    })
}

module.exports = authorize