const jwt = require('jsonwebtoken');

function getToken(payload){
    return token = jwt.sign(payload, process.env.SECRET_KEY);
}

module.exports = {getToken}