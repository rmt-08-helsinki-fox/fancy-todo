const jwt = require('jsonwebtoken')

function generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_KEY)
}
function decoded(payload) {
    return jwt.verify(payload, process.env.JWT_KEY)
}

module.exports = {
    generateToken,
    decoded
}