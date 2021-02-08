const jwt = require('jsonwebtoken')
require('dotenv').config()

function generateToken(payload) {
    return jwt.sign(payload, process.env.SECRET_JWT)
}

function verifyToken(payload) {
    try {
        return jwt.verify(payload, process.env.SECRET_JWT);
    } catch(err) {
        console.log(err);
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken,
}