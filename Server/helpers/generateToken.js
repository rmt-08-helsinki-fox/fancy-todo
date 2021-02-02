let jwt = require('jsonwebtoken');

function generateToken(payLoad){
    return jwt.sign(payLoad, process.env.SECRET);
}

module.exports = generateToken