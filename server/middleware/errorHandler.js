module.exports = (err, req, res, next) => {
  if(err.name === 'SequelizeUniqueConstraintError' || err.name === 'SequelizeValidationError') {
    const errors = err.errors.map(error => error.message)
    res.status(400).json({errors})

  } else if( err.name === 'customError') {
    const errors = err.msg
    res.status(400).json({errors})

  } else {
    const errors = err.name || 'Internal server error'
    res.status(500).json({errors})
  }
}