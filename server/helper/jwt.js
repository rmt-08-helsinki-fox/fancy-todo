const jwt = require('jsonwebtoken')

function generateToken(payload) {
    return jwt.sign(payload, process.env.secretkey)
}

module.exports = { generateToken }