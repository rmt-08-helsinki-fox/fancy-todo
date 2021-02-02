const jwt = require('jsonwebtoken')

function getToken(payload) {
  return jwt.sign(payload, process.env.SECRET)
}


module.exports = {
  getToken
}