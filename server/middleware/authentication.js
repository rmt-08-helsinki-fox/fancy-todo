const jwt = require('jsonwebtoken')

function authentication(req,res,next){
  try{
    const token = req.headers.token
    const decoded = jwt.verify(token, process.env.SECRET)
    req.decoded = decoded
    next()
  } catch(err){
    const error = {name:'customError', msg: 'Invalid Token', status: 401}
    next(error)
  }
}

module.exports = authentication