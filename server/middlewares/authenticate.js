const { verifyToken } = require("../helpers/jwt")

module.exports = (req, _, next) => {
  try {
    const token = req.headers.token
    req.decoded = verifyToken(token)

    next();
  } catch (err) {
    next({ name: "error_401_invalid_token" })
  }
}