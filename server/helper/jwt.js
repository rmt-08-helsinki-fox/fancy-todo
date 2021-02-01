const jwt = require('jsonwebtoken')

function generateToken(payload){
    return jwt.sign(payload, "YEZKIGANTENG")
}


module.exports = {
    generateToken
}