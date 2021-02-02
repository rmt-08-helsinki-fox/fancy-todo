const jwtHelper = require('../helpers/jsonwebtoken')

function auth(token) {
  const result = jwtHelper.verifyToken(token)
  return result
}

module.exports = auth