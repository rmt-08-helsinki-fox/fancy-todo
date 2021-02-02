const errorHandlers = function(err, res, req, next) {
  if(err.name == "SequelizeUniqueConstraintError" || "SequelizeValidationError") {
    const errors = err.errors.map(el => el.message)
    res.status(400).json({
      errors
    })
  } else {
    let error = err.errors[0].message
    res.status(500).json({error})
  }
}

module.exports = errorHandlers
