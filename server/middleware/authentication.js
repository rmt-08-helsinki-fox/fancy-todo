const jwt = require('jsonwebtoken')

function authentication(req, res, next) {
  
  try {
    const token = req.headers.token
    const decoded = jwt.verify(token, process.env.SECRET)
    
    req.userData = decoded
    
    next()
  }
  catch(err) {
    res.status(401).json({ message: 'Invalid Token' })
  }

}

module.exports = authentication