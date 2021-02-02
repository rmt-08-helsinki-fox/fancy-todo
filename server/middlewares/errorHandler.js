function errorHandler(err, req, res, next) {
  switch(err.name) {
    case "SequelizeValidationError":
      const errors = err.errors.map(error => error.message)
      res.status(400).json({ errors })
      break;

    case "Bad Request":
      res.status(err.status).json({ errors: [err.message] })
      break;

    case "Unauthorized":
      res.status(err.status).json({ errors: [err.message] })
      break;

    case "Forbidden":
      res.status(err.status).json({ errors: [err.message] })
      break;

    case "Not Found":
      res.status(err.status).json({ errors: [err.message] })
      break;
    
    default:
      res.status(500).json({ errors: ["internal server error"] })

  }
}

module.exports = errorHandler;