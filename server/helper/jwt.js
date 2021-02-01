const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY

function generateToken (payload) {
  const token = jwt.sign(payload, SECRET_KEY)
  return token
}

function verifyToken (token) {
  const verifiedToken = jwt.verify(token, SECRET_KEY)
  return verifiedToken
}

module.exports = { generateToken, verifyToken }