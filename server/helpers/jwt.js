const jwt = require('jsonwebtoken')

function getToken(payloads) {
    return jwt.sign(payloads,process.env.SECRET)
}

function verify(token){
    return jwt.verify(token,process.env.SECRET)
}

module.exports = {
    getToken,
    verify
}