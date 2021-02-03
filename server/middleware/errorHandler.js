module.exports = (err, req, res, next) => {
  if(err.name === 'SequelizeUniqueConstraintError') {
    const errors = err.errors.map(error => error.message)
    res.status(400).json({errors})

  } else if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map(error => error.message)
    res.status(400).json({errors})

  } else if( err.name === 'customError') {

    const errors = err.msg
    res.status(400).json({errors})
  } else {
    res.status(500).json(err)
  }
}