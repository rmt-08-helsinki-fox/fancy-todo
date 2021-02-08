const errHandler = (err, req, res, next) => {
  let error = err.error || 'Internal server error';
  let status = err.status || 500;
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    error = []
    err.errors.forEach(element => {
      error.push(element.message)
    });
    status = 400
  }
  if (err.name === 'JsonWebTokenError') {
    error = 'Invalid Token'
    status = 401
  }
  res.status(status).json({ error })
}

module.exports = errHandler