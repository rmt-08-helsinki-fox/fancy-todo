module.exports = (err, req, res, next) => {
  console.log(err, 'dari error handler ==========')
  let message = []

  if (err.name == "SequelizeValidationError") {
    const errors = err.errors.map((el) => el.message)
    res.status(400).json({ message: errors})

  } else if (err.name == "SequelizeUniqueConstraintError") {
    const errors = err.errors.map((el) => el.message)
    res.status(400).json({ message: errors})

  } else if (err.name == "invalidLogin") {
    const msg = 'Email or password is undefined'
    message.push(msg)
    res.status(400).json({message})

  } else if (err.name == "authorized") {
    const msg = 'Your account Unauthorized'
    message.push(msg)
    res.status(400).json({message})

  } else if (err.name == "authenticate") {
    const msg = 'You need to login'
    message.push(msg)
    res.status(400).json({message})

  } else if (err.name == "JsonWebTokenError") {
    const msg = 'You need to login'
    message.push(msg)
    res.status(400).json({message})
  
  } else if (err.name == "notDataYet") {
    const msg = 'Please add your todo'
    message.push(msg)
    res.status(400).json({message})
  
  } else if (err.name == "undefined") {
    const msg = 'Todo is undefined'
    message.push(msg)
    res.status(400).json({message})
  }
}