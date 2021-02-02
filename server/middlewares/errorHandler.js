const errorHandler = (err, req, res, next) => {
  console.log(err);

  let errMsg = [];
  let status = 500;

  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError' && err.errors.length > 0) {
    err.errors.forEach(err => errMsg.push(err.message));
    status = 400;

  } else if(err.name === 'JsonWebTokenError') {
    errMsg.push(err.message);

  } else if (err.name === 'CustomError') {
    errMsg.push(err.error);
    status = err.status;
  } 
  res.status(status).json({ errors: errMsg});
}

module.exports = errorHandler;