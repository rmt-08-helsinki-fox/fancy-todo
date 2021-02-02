const authorize = function (req, res, next) {
  console.log(req.currentUser);
  if (req.currentUser.role === 'admin') {
    next()
  } else {
    res.status(401).json({
      message: 'Not authorize this site'
    })
  }
}

module.exports = {
  authorize
}