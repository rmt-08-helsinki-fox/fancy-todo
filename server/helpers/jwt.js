const jwt = require('jsonwebtoken');

function generateToken(payload) {
    return jwt.sign(payload, process.env.SECRET_JWT);
}

function verify(token) {
    return jwt.verify(token, process.env.SECRET_JWT);
}

module.exports = {
    generateToken,
    verify
};