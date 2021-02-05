module.exports = (err, req, res, next) => {
  console.log("error guys ==>", err);
  if (err.name == "SequelizeValidationError") {
    const errors = err.errors.map(error => error.message)
    res.status(400).json({ errors })
  } else if (err.name == "SequelizeUniqueConstraintError") {
    const errors = err.errors.map(error => error.message)
    res.status(400).json({ errors })
  }else if (err.error === "invalid email or password") {
    const error = err.msg 
		res.status(400).json({error})
  } else if (err.error == "404 not found!") {
    res.status(404).json(err)
  } else if (err.error == 'Not Authorized') {
    res.status(401).json({err})
  } else {
    res.status(500).json({ error : 'Internal server error' })
  }
} 