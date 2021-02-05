const jwt = require("jsonwebtoken");
const authenticate = function (req, res, next) {
  try {
    const token = req.headers.access_token;
    const decoded = jwt.verify(token, process.env.SECRET);
    req.decoded = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      msg: "Invalid Token",
    });
  }
};

module.exports = authenticate;
const { User } = require("../models");

const authorize = function (req, res, next) {
  const userId = req.decoded.id;
  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        throw { message: "data not found", status: 404, name: "custom" };
      }
      if (user) {
        next();
      } else {
        throw { message: "not authorized", status: 400, name: "custom" };
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = authorize;
