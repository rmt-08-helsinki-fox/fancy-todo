const errorHandler = (err, req, res, next) => {
    switch (err.name) {
      case 'SequelizeValidationError':
        let validationError = err.errors.map((error) => error.message)
        res.status(400).json({message: validationError})
        break;
      case 'JsonWebTokenError':
        res.status(400).json({message: 'Invalid Token'})
        break;
      case 'LoginError':
        res.status(400).json({message: err.message})
        break;
      case 'MissingDataError':
        res.status(404).json({message: err.message})
        break;
      case 'UnauthorizedError':
        res.status(403).json({message: err.message})
        break;
      default:
        res.status(500).json({message: 'Internal Server Error'})
        break;
    }
  }

module.exports = errorHandler