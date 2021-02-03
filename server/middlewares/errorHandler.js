module.exports = (err, req, res, next) => {
  console.log(err , `<<<<<<< ini dari error handler`)
  console.log(err.name , `<<<<<<< ini dari error handler`)
  let error = []
  let status = 500
  if (err.name == 'ReferenceError') {
    error.push(`Internal Server Error`)
  } else if (err.name == 'SequelizeValidationError') {
    error = error.concat(err.msg)
    status = err.statusCode
  } else if (err.name == `Not Found`) {
    error.push(err.msg)
    status = err.statusCode
  } else if (err.name == `SequelizeDatabaseError`) {
    error.push(`Internal server errors`)
  } else if (err.name == 'Invalid Data') {
    error = error.concat(err.msg)
    status = err.statusCode
  } else if (err.name == `SequelizeUniqueConstraintError`) {
    error = error.concat(err.msg)
    status = err.statusCode
  }
  res.status(status).json({ error })
}