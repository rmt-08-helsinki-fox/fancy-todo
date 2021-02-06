module.exports = (err,req,res,next) => {
  if (err.name == "SequelizeUniqueConstraintError") {
    const error = err.errors.map(e => e.message)
    res.status(400).json({error})
  } else if (err.name == "SequelizeValidationError") {
    const error = err.errors.map(e => e.message)
    res.status(400).json({error})
  } else if (err.error == "not found") {
    res.status(404).json({error: err.error})
  } else {
    const error = err || "Internal server error"
    res.status(500).json({error})
  }
}