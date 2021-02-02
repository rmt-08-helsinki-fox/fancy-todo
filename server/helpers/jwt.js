const jwt = require("jsonwebtoken");

function generateToken(payload) {
  return jwt.sign(payload, process.env.SECRET_KEY)
}

function decodeToken(token) {
  return jwt.verify(token, process.env.SECRET_KEY)
}


module.exports = { generateToken, decodeToken }