const jwt = require('jsonwebtoken');

const authenticate = (req,res,next) => {
  try{
    const access_token = req.headers.access_token
    const decoded = jwt.verify(access_token, process.env.SECRET)
    req.decoded = decoded
    console.log(decoded.id);
    next()
  } catch (err){
    res.status(401).json({
      msg: 'Invalid token'
    })
  }
}

module.exports = authenticate