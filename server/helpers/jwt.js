const jwt = require("jsonwebtoken")

function generateToken(payload) {
  return jwt.sign(payload, "dudun")
}

module.exports = { generateToken }