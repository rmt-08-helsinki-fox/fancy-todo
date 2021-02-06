function errorHandler(err, req, res, next){
  console.log('masuk error handler')
  console.log(err, 'ini err dalem error handler')
  switch (err.name) {
    case 'SequelizeValidationError':
      console.log(err)
      res.status(400).json(err.message)
      break;
    case 'DataNotFound':
      res.status(err.status).json(err.msg)
      break;
    case 'SequelizeDatabaseError':
      res.status(400).json(err.message)
      break;
    case 'SequelizeUniqueConstraintError':
      console.log(err.errors[0].message)
      res.status(400).json(err.message)
      break;
    case 'InvalidEmail':
      console.log(err, 'ini err')
      res.status(err.status).json(err.msg)
      break;
    case 'InvalidPassword':
      res.status(err.status).json(err.msg)
      break;
    default:
      res.status(500).json({msg: 'Internal Server Error'})
      break;
  }
}

module.exports = { errorHandler }