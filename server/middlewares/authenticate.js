const jwt = require('jsonwebtoken');
const { User } = require('../models')

const authenticate = async (req,res,next) => {
  try{
    const access_token = req.headers.access_token
    if (!access_token) {
      res.status(401).json({
        msg: 'Invalid token'
      })
    }
    const decoded = jwt.verify(access_token, process.env.SECRET)
    if (!decoded) {
      res.status(401).json({
        msg: 'Invalid token'
      })
    }
    const user = await User.findByPk(decoded.id)
    if (!user) {
      res.status(401).json({
        msg: 'Invalid token'
      })
    }
    req.decoded = decoded
    next()
  } catch (err){
    res.status(401).json({
      msg: 'Invalid token'
    })
  }
}

module.exports = authenticate