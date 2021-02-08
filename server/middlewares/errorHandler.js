module.exports = (err, req, res, next) => {
  console.log(err);
  if (err.name === 'SequelizeUniqueConstraintError' || err.name === 'SequelizeValidationError') {
    const errorValidations = err.errors.map(err => err.message);
    res.status(400).json({ errors: errorValidations });
  } else if (err.name === 'Error400') {
    res.status(400).json({ errors: err.msg });
  } else if (err.name === 'Error401') {
    res.status(401).json({ errors: err.msg });
  } else if (err.name === 'Error404') {
    res.status(404).json({ errors: err. msg });
  } else {
    res.status(500).json({ errors: 'Internal Server Error' });
  }
}