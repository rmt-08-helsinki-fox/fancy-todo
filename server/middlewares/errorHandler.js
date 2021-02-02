const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError' && err.errors.length > 0) {
    let errMsg = err.errors.map(err => err.message);
    let error = {errors: errMsg}

    res.status(400).json(error);
  } else {
    let errMsg = err.error || 'Internal server error';
    let status = err.status || 500;

    res.status(status).json({ error: errMsg});
  }
}

module.exports = errorHandler;