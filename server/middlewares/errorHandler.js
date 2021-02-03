const errorHandler = (err, req, res, next) => {
  
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    const errors = err.errors.map(el => el.message)
    res.status(400).json({ error : errors })
  } else {
    const error = err.msg || 'Internal Server Error'
    const status = err.status || 500
    res.status(status).json({ error })
  }
}

module.exports = errorHandler