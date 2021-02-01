const jwt = require('jsonwebtoken')

function generateToken(payload) {
    return jwt.sign(payload, 'rahasiakan')
}

module.exports = { generateToken }