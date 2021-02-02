const jwt = require('jsonwebtoken')

function getToken(payloads) {
    return jwt.sign(payloads,process.env.SECRET)
}

module.exports = {
    getToken
}