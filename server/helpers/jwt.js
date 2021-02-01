const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY

class HelperJWT {
  static generateToken (payload) {
    return jwt.sign(payload, SECRET_KEY)
  }

  static checkToken (token) {
    return jwt.verify(token, SECRET_KEY)
  }
}

module.exports = HelperJWT