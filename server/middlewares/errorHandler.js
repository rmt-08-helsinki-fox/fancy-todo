module.exports = function (err, req, res, next) {
  console.log(err)
  if (err.name === "customError") {
    res.status(err.status).json({ message: err.msg })
  } else if (err.name === "SequelizeValidationError") {
    let errors = err.errors.map(el => el.message)
    res.status(400).json({ errors: errors })
  } else {
    res.status(500).json(err)
  }
}