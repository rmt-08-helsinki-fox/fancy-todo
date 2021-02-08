const errorHandler = (err, req, res, next) => {
  if (err) {
    console.log(err.name)
    switch (err.name) {
      case 'SequelizeValidationError':
        const outputErr = []
        err.errors.forEach(errors => {
          outputErr.push(errors.message)
        })
        res.status(400).json({
          message: outputErr.join(', ')
        })
        break;
      case 'SequelizeUniqueConstraintError':
        res.status(400).json({
          message: 'Email already registered, try different email'
        })
        break;
      case 'Username / Password wrong':
        res.status(401).json({
          message: 'Username or Password incorrect, Please login again'
        })
      case 'JsonWebTokenError':
        res.status(400).json({
          message: 'Please provide a JWT token, or login again'
        })
      case 'Data not found':
        res.status(404).json({
          message: 'Data not found'
        })
        break;
      default:
        res.status(500).json({
          message: 'Internal Server Error'
        })
        break;
    }
  }
}

module.exports = errorHandler