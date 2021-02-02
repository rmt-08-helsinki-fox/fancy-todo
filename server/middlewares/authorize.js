// const jwt = require('jsonwebtoken')
const { ToDo } = require('../models/')

const authorize = function (req, res, next) {
    ToDo.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(user => {
            if (req.decoded.id === user.user_id) {
                next()
            } else {
                res.status(401).json({ message: "Unauthorized user" })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
}

module.exports = authorize