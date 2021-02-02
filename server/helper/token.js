const jwt = require('jsonwebtoken')
const secret = process.env.secret

function generate(token) {
    // console.log(secret);
    return jwt.sign(token, secret);
}

module.exports = generate