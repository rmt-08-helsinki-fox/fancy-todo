module.exports = (err, req, res, next) => {
  if (err.name === 'SequelizeUniqueConstraintError' || err.name === 'SequelizeValidationError') {
    const errorValidations = err.errors.map(err => err.message);
    res.status(400).json({ errors: errorValidations });
  } else if (err.name === 'CustomError') {
    res.status(err.status).json({ errors: err.msg });
  } else {
    res.status(500).json({ errors: 'Internal Server Error' });
  }
}