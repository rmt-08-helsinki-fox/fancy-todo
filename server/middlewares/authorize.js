const authorize = function (req, res, next) {
  if (req.decoded.email === 'rio@gmail.com') {
    next()
  } else {
    res.status(401).json({
      msg: 'Not authorized'
    })
  }
}

module.exports = { authorize }