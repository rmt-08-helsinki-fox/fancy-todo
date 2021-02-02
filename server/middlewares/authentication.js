const { checkToken } = require('../helpers/jwt')
const { User } = require('../models')

function authentication (req, res, next) {
  try {
    const decoded = checkToken(req.headers.access_token)

    User.findOne({
      where: {
        email: decoded.email
      }
    })
      .then(user => {
        if (user) {
          req.user = user
          next()
        } else {
          res.status(401).json({
            message: 'Please login first'
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          message: err
        })
      })
  } catch (err) {
    res.status(400).json({
      message: err
    })
  }
}

module.exports = authentication