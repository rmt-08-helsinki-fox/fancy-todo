module.exports = (err, req, res, next) => {
  let statusCode;
  let errors = [];
  switch (err.name) {
    case 'SequelizeUniqueConstraintError':
      errors = err.errors.map(element => element.message)
      statusCode = 400
      break;
    
    case 'SequelizeValidationError':
      errors = err.errors.map(element => element.message)
      statusCode = 400
      break;

    case 'InvalidUserPass':
      errors[0] = err.message
      statusCode = 400
      break;  

      case 'DataNotFound':
      errors[0] = err.message
      statusCode = 404
      break;

    default:
      statusCode = 500
      errors[0].message = 'Internal Server Error'
      break;
  }

  res.status(statusCode).json({
    errors
  })

}
  

  