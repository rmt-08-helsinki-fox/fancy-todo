const authorize = (req, res, next) => {
  req.decoded
  next();
}

module.exports = authorize;