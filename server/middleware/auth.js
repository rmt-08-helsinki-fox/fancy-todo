const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.data = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticate;
