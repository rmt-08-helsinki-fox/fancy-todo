const jwt = require('jsonwebtoken');

function generateToken (payload) {
  return jwt.sign(payload, 'done');
};

module.exports = { generateToken };