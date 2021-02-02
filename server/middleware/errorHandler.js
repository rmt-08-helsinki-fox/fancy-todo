const errorHandler = function (err, req, res, next) {
  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map(el => el.message)
    res.status(400).json({
      errors
    })
  } else {
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}

module.exports = {
  errorHandler
}