module.exports = (err, req, res, next) => {
  console.log(err.name, 'dari error handler ==========')
  if (err.name == "SequelizeValidationError") {
    const errors = err.errors.map((el) => el.message)
    res.status(400).json({ message: errors[0]})
  } else if (err.name == "SequelizeUniqueConstraintError") {
    const errors = err.errors.map((el) => el.message)
    res.status(400).json({ message: errors[0]})
  } else if (err.name = 'invalidLogin') {
    res.status(400).json({ message: 'Email or password is undefined'})
  }
}