module.exports = (err, req, res, next) => {
  if(err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    const errors = err.errors.map(e => e.message)
    res.status(400).json(errors)
  } else if(err.name === 'id not found') {
    res.status(404).json({
      message: err.msg
    })
  } else if(err.name === 'invalid email or password') {
    res.status(400).json({
      message: err.msg
    })
  } else if(err.name === 'JsonWebTokenError') {
    res.status(400).json({
      message: err.message
    })
  } else if(err.name === 'cannot acces') {
    res.status(401).json({
      message: err.msg
    })
  } else {
    res.status(500).json(err)
  }
}