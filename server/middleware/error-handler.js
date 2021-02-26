
// dibikin switch case

function errorHandler(err, res, res, next) {
  console.log(err)
  console.log('masuk masuk error handler')
  switch (err.name) {
    // error sequelize
    case 'SequelizeValidationError':
      const errors = []
      err.errors.forEach((el) => {
        errors.push(el.message)
      })
      res.status(400).json({ messages: errors })
      break
    //error unique constraint/email sudah terpakai
    case 'SequelizeUniqueConstraintError':
      res.status(400).json({ message: 'email already been used' })
      break
    // error authentication
    case 'JsonWebTokenError':
      res.status(401).json({ message: err.message })
      break
    // error authorization
    case 'Authorization':
      res.status(401).json({ message: err.message })
      break
    case 'customError':
      res.status(400).json({ message: err.message })
      break
    default:
      res.status(500).json({ message: err.message })
  }
}

module.exports = errorHandler