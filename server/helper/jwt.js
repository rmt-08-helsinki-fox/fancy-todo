let jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    let token = jwt.sign(payload, process.env.SECRET);
    return token;
}

const verifyToken = (token, secret) => {
    try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (err) {
        return false;
    }
}

module.exports = { generateToken, verifyToken }