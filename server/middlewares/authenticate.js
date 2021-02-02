const jwt = require("jsonwebtoken");

const authenticate = function (req, res, next) {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.SECRET);
    
    // console.log(decoded);
    req.decoded = decoded;
    next();
  } catch (err) {
    console.log(err, 'ini yg dari authenticate');
    next(err)
  }
};

module.exports = authenticate;