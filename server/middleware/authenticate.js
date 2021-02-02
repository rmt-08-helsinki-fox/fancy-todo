const jwt = require('jsonwebtoken')
const {User} = require('../models')

const authenticate = function (req, res, next) {
    try {
        // console.log(req.body)
        const token = req.headers.token
        const decoded = jwt.verify(token, process.env.SECRET)
        // console.log(decoded)
        User.findOne({
            where : {
                email : decoded.email
            }
        })
            .then(data => {
                req.data = data
                next()
            })
    } catch (err) {
        res.status(401).json({
            message :"Invalid Token"
        })
    }

}
module.exports = authenticate