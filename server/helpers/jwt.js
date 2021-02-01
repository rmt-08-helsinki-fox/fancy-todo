const jwt = require('jsonwebtoken')

function tokenize (payload) {
    console.log(process.env.SECRET);
    return jwt.sign(payload, process.env.SECRET);
}

module.exports = { tokenize };