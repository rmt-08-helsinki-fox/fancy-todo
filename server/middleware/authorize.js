const authorize = function(req, res, next) {
  if (req.decode) {
    console.log(req.decode);
    next()
  } else {
    res.status(401).json({
      message: 'Not authorize'
    })
  }
}

module.exports = authorize