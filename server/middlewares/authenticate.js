const jwt = require('jsonwebtoken')
const { User } = require('../models')

const authenticate = function (req, res, next) {
  try {
    const token = req.headers.token
    const decoded = jwt.verify(token, process.env.SECRET)
    User.findOne({
      where: {
        id: decoded.id
      }
    })
      .then(result => {
        if (!result) {
          throw { name: 'DATA_NOT_FOUND' }
        } else {
          req.decoded = decoded
          next()
        }
      })
  } catch (err) {
    next(err)
  }
}

module.exports = { authenticate }