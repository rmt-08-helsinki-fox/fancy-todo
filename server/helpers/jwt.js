const jwt = require('jsonwebtoken');

function getAccessToken(payload){
    return accessToken = jwt.sign(payload, process.env.SECRET_KEY);
}

module.exports = {getAccessToken}