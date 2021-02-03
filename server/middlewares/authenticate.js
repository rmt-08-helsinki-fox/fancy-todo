const jwt = require("jsonwebtoken")

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.token
    const decoded = jwt.verify(token, process.env.SECRET)
    req.decoded = decoded
    next()
  } catch (err) {
    next({name: "Not allowed",message: "Invalid User"})
  }
}

module.exports = authenticate