module.exports = (err,req,res,next) => {
  let errors = []
  let status = 500
  if (err.name === 'signInError') {
    errors.push(err.msg)
    status = err.status
  } else if (err.name === 'SequelizeValidationError'){
    err.errors.forEach(element => {
      errors.push(element.message)
    });
    status = 400
  } else if (err.name === 'notFound'){
    errors.push(err.msg)
    status = err.status
  } else {
    errors.push(`Internal Server Error`)
  }
  
  res.status(status).json(errors)
}