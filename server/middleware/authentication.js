const {accessToken} = require('../helpers/jwt')

function authentication(req,res,next){
  try{
    const decoded = accessToken(req.headers.token)
    req.decoded = decoded
    next()
  } catch(err){
    const error = {name:'customError', msg: 'Invalid Token', status: 401}
    next(error)
  }
}

module.exports = authentication