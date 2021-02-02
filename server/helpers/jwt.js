const jwt = require('jsonwebtoken');

const genToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY);
}

const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
}

module.exports = { genToken, verifyToken };