module.exports = (err, req, res, next) => {
  // console.log(err);
  let statusCode = 500
  let errorCode = "UNKNOWN_ERROR"
  let message = "Internal server error"

  switch (true) {
    case (err.name === "SequelizeValidationError"):
      statusCode = 400
      errorCode = "VALIDATION_ERROR"
      message = err.errors.map(el => el.message)
      break;

    case (err.name === "customError"):
      statusCode = 404
      errorCode = "DATA_NOT_FOUND"
      message = err.message
      break;
    
    case (err.name === "SequelizeUniqueConstraintError"):
      statusCode = 400
      errorCode = "INVALID_EMAIL"
      message = err.message
      break;

    case (err.name === "invalidError"):
      statusCode = 404
      errorCode = "INVALID_DATA"
      message = err.message
      break;

    case (err.name === "Not allowed"):
      statusCode = 401
      errorCode = "USER_NOT_AUTHENTICATED"
      message = err.message
      break;

    case (err.name === "NotAuthorized"):
      statusCode = 403
      errorCode = "FORBIDDEN_ACCESS"
      message = err.message
      break;
  
    default:
      break;
  }

  res.status(statusCode).json({
    error: errorCode, message: message
  })
}