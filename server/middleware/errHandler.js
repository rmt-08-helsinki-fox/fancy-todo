const errorHandler = (err, req, res, next) => {
  //   res.json(err);

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    let message = err.errors.map((el) => el.message);
    res.status(400).json({ errors: message });
  } else if (err.name === "customError") {
    res.status(err.status).json({ error: err.message });
  } else if (err.name === "JsonWebTokenError") {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = errorHandler;
