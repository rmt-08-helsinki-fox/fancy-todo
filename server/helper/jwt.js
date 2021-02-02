const jwt = require("jsonwebtoken");

function signToken(obj) {
  return jwt.sign(obj, process.env.SECRET_KEY);
}

module.exports = { signToken };
