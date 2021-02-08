const jwt = require("jsonwebtoken");
const authenticate = function (req, res, next) {
  try {
    const token = req.headers.access_token;
    const decoded = jwt.verify(token, process.env.SECRET);
    req.decoded = decoded;
    next();
  } catch (err) {
    next({
      message: "Invalid Token",
      status: 401,
      name: "Custom",
    });
  }
};

module.exports = authenticate;
