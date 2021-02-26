const errorHandler = function (err, req, res, next) {

  let errors;
  switch (err.name) {
    case 'SequelizeValidationError':
      errors = err.errors.map(el => el.message)
      res.status(400).json({
        errors
      })
      break;
    case 'SequelizeUniqueConstraintError':
      errors = err.errors.map(el => el.message)
      res.status(400).json({
        errors
      })
      break;
    case 'custom error':
      res.status(401).json({
        message: 'not authorize this site'
      })
      break;
  
    default:
      res.status(500).json({
        message: 'internal server error'
      })
      break;
  }

  // if (err.name === 'SequelizeValidationError') {
  //   const errors = err.errors.map(el => el.message)
  //   res.status(400).json({
  //     errors
  //   })
  // } else if(err.name === 'SequelizeUniqueConstraintError') {
  //   const errors = err.errors.map(el => el.message)
  //   res.status(400).json({
  //     errors
  //   })
  // } else if (err.name === 'custom error') {
  //   res.status(401).json({
  //     message: 'not authorize this site'
  //   })
  // } else [
  //   res.status(500).json({
  //     message: 'internal server error'
  //   })
  // ]
  
  
}

module.exports = {
  errorHandler
}