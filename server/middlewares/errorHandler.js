function errorHandler(err, req, res, next) {
  switch (err.name) {
    case "SequelizeValidationError":
      let errorMessage = [];
      err.errors.forEach((el) => {
        errorMessage.push({ message: el.message });
      });
      res.status(400).json(errorMessage);
      break;

    case "Not Found":
      res.status(404).json({ message: "Not Found" });
      break;

    case "SequelizeUniqueConstraintError":
      res.status(400).json({ message: "Email already used" });
      break;

    case "Email/Password Wrong":
      res.status(400).json({ message: "Email/Password Wrong" });
      break;

    case "Unautorized":
      res.status(401).json({ message: "Unautorized" });
      break;

    case "Login first":
      res.status(403).json({ message: "Login first" });

    default:
      res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = errorHandler;
