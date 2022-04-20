module.exports = (err, req, res, next) => {
  let errorMessage = [];
  let status;
  if (err.name === "SequelizeValidationError") {
    errorMessage = err.errors.map((el) => el.message);
    status = 500;
  } else if (err.name === "Custom") {
    errorMessage = err.message;
    status = err.status;
  } else if (err.name === "SequelizeUniqueConstraintError") {
    errorMessage = err.errors.map((el) => el.message);
    status = 500;
  } else if (err.name === "Server") {
    errorMessage = err.message;
    status = err.status;
  }
  res.status(status || 500).json({ errorMessage });
};
