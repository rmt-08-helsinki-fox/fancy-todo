const jwt = require("jsonwebtoken")
const {User} = require("../models")

const authentic = (req, res, next) => {
  try{
    const token = req.headers.token
    const decode = jwt.verify(token, process.env.SECRET)

    User.findOne({
      where: {id: decode.id}
    })
    .then(data => {
      if(!data){
        const err = {name: "custom", msg: "Invalid token", status: 401}
        next(err)
      }
      else{
        req.dataUser = decode
        next()
      }
    })
    .catch(err => {
      next(err)
    })
  }
  catch {
    const err = {name: "custom", msg: "Invalid token", status: 401}
    next(err)
  }
}

module.exports = authentic