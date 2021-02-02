module.exports = (err, req, res, next) => {
  if (err.name == "SequelizeValidationError") {
    const error = err.errors[0].message 
    res.status(400).json({error})
  } else if (err.name == "SequelizeUniqueConstraintError") {
    const error = err.errors[0].message 
    res.status(400).json({error})
  }else if (err.msg === "invalid email or password!") {
    const error = err.msg 
		res.status(400).json({error})
  } else if (err.msg == "404 not found!") {
    res.status(404).json(err)
  } else if (err.msg == 'Not Authorized') {
    res.status(401).json({err})
  } else {
    res.status(500).json({msg: 'Internal server error'})
  }
}