let jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    let token = jwt.sign(payload, 'secret');
    return token;
}

module.exports = { generateToken }