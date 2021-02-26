const jwt = require('jsonwebtoken')
const {User} = require('../models')

const authenticate = function (req, res, next) {
    try {
        const token = req.headers.token
        const decoded = jwt.verify(token, process.env.SECRET)
        User.findOne({
            where : {
                email : decoded.email
            }
        })
            .then(data => {
                // console.log(data)
                req.data = data
                next()
            })
    } catch (err) {
        next({name: "custom", msg: "Invalid Token", statusCode: 401})
    }
}
module.exports = authenticate