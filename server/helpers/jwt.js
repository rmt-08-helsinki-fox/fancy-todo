const jwt = require('jsonwebtoken')

function tokenize (payload) {
    return jwt.sign(payload, process.env.SECRET);
}

module.exports = { tokenize };