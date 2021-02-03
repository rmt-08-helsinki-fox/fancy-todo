const jwt = require("jsonwebtoken")

function generateToken (payload) {
    return jwt.sign(payload, process.env.SECRET)
}

function decoder (access_token) {
    return jwt.verify(access_token, process.env.SECRET)
}

module.exports = {
    generateToken,
    decoder
}