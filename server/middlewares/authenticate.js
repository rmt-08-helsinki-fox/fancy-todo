const { verifyToken } = require("../helpers/jwt")

module.exports = (req, _, next) => {
  try {
    const access_token = req.headers.access_token
    req.decoded = verifyToken(access_token)

    next();
  } catch (err) {
    next({ name: "error_401_invalid_token" })
  }
}