const jwt = require('jsonwebtoken')

const authenticate = function (req, res, next) {
  try {
      const token = req.headers.token
      const currentUser = jwt.verify(token, process.env.SECRET)
      req.currentUser = currentUser
      next()
  } catch(err) {
      res.status(401).json({
        message: 'Invalid key'
      })
  }
}

module.exports = {
  authenticate
};