function errorHandler(err, req, res, next) {
  switch(err.name) {
    case 'SequelizeValidationError':
      res.status(400).json(err.errors.map(e => e.message))
      break
    case 'resourceNotFound':
      res.status(404).json({ 
        message: 'Resource not Found' 
      })
      break
    case 'accessDenied':
      res.status(401).json({ 
        message: 'Access Denied'
      })
      break
    case 'internalServerError':
      res.status(500).json({ 
        message: 'Internal Server Error'
      })
      break
    case 'passEmailNotMatched':
      res.status(404).json({ 
        message: 'Make Sure Your Email/Password is Correct' 
      })
      break
    case 'SequelizeUniqueConstraintError':
      res.status(400).json(err.errors.map(e => e.message))
      break
    case 'JsonWebTokenError':
      res.status(401).json({ 
        message: 'Access Denied'
      })
      break
  }
}

module.exports = { 
  errorHandler 
}