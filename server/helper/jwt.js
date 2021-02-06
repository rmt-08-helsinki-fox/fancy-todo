const jwt = require("jsonwebtoken");

function generateToken(payload) {
  return (token = jwt.sign(payload, process.env.SECRET_KEY));
}

function checkToken(token) {
  return jwt.verify(token, process.env.SECRET_KEY);
}

module.exports = {
  generateToken,
  checkToken,
};
