const jwt = require('jsonwebtoken')

function authentication(req, res, next) {
  console.log('masuk authentication')
  try {
    const token = req.headers.access_token
    const decoded = jwt.verify(token, process.env.SECRET)
    req.userData = decoded
    
    next()
  }
  catch(err) {
    console.log('masuk catch authentication')
    next(err, err.message = 'Invalid Token')
  }

}

module.exports = authentication