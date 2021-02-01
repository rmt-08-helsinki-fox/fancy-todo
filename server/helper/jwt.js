const jwt = require('jsonwebtoken')

function generateToken(payload) {
  return jwt.sign(payload, 'wow' ) //process.env.SECRET
}

module.exports = {generateToken}