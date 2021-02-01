//@ts-check
const jwt = require("jsonwebtoken")

function generateToken(payload) {
    return jwt.sign(payload, process.env.SECRET_JWT)
}

function decoded(payload) {
    return jwt.decode(payload, { complete: true })
}

module.exports = {
    generateToken,
    decoded,
}
