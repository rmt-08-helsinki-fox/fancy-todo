function errorHandler(err, req, res, next) {
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError'){
    const errors = err.errors.map(e => e.message)
    return res.status(400).json(errors)
  } else if (err.status == 400){
    return res.status(400).json(err.msg)
  } else if (err.status == 404){
    return res.status(404).json("error not found")
  } else {
    return res.status(500).json(err)  
  }
}

module.exports = errorHandler