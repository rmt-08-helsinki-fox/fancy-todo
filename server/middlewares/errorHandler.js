module.exports = function (err, req, res, next) {
  console.log(err)
  let errors = []
  if (err.name === "customError") {
    errors.push(err.msg)
    res.status(err.status).json({ errors: errors })
  } else if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
    errors = err.errors.map(el => el.message)
    res.status(400).json({ errors: errors })
  } else if (err.name === "JsonWebTokenError") {
    res.status(401).json({ errors: ["Invalid Token"] })
  } else {
    res.status(500).json({ error: [err.errors.message] })
  }
}