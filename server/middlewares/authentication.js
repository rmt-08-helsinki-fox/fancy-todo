const jwt = require("jsonwebtoken")

const authentic = (req, res, next) => {
  try{
    const token = req.headers.token
    const decode = jwt.verify(token, process.env.SECRET)
    req.dataUser = decode
    next()
  }
  catch {
    res.status(401).json({msg: "Invalid token"})
  }
}

module.exports = authentic