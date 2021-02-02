const jwt = require("jsonwebtoken")

const authentic = (req, res, next) => {
  try{
    const token = req.headers.token
    const decode = jwt.verify(token, process.env.SECRET)
    req.dataUser = decode
    next()
  }
  catch {
    const err = {name: "custom", msg: "Invalid token", status: 401}
    next(err)
  }
}

module.exports = authentic