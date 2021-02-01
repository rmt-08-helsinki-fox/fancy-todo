const jwt = require('jsonwebtoken')

function get_token(payload) {
  return jwt.sign(payload, process.env.SECRET)
}


module.exports = {
  get_token
}