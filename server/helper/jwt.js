const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY || 'tapi'

function generateToken(payload){
    const token = jwt.sign(payload, SECRET_KEY)

    return token
}

function checkToken(token) {
    return jwt.verify(token, SECRET_KEY)
}

module.exports = {
    generateToken,
    checkToken
}