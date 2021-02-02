const jwt = require('jsonwebtoken')

const generateToken = (payload) => jwt.sign(payload,process.env.SECRET)

module.exports = {
    generateToken
}