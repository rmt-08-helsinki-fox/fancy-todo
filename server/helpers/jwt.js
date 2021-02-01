const jwt = require("jsonwebtoken")

function generateToken(payload) {
    return jwt.sign(payload, "joko")
}

module.exports = {generateToken}