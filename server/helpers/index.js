const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createHash = password => {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);

  return hash;
};

const checkHash = (password, hash) => {
  const result = bcrypt.compareSync(password, hash);

  return result;
};

const errorHandler = (err, req, res, next) => {
  if (err.name == 'SequelizeValidationError' || err.name == 'SequelizeUniqueConstraintError') {
    let msg = [];

    err.errors.forEach(el => {
      msg.push(el.message);
    })

    res.status(400).json({ msg, response: false })
  } else if (err == 'Invalid email or password') res.status(401).json({ err, response: false });
  else res.status(500).json({ msg: `Internal Server Error`, response: false });
};

const createToken = payload => {
  return jwt.sign(payload, process.env.SECRET);
};

const checkToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    return decoded;
  } catch {
    return false;
  }
}

module.exports = { 
  createHash, 
  checkHash, 
  errorHandler, 
  createToken,
  checkToken
};