const jwt = require('jsonwebtoken')

function generateToken(payload) {
    console.log(process.env.SECRET);
    return jwt.sign(payload, process.env.SECRET)
}

module.exports = { generateToken }