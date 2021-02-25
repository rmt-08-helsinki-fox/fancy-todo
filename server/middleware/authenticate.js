const {verify} = require('../helpers/jwt')
const {User} = require('../models')

module.exports = async (req, res, next) => {
  const access_token = req.headers.token
  if(!access_token) {
    return next({
      name: 'jwt is required',
      message: 'jwt is required'
    })
  }
  try {
    const payload =  verify(access_token)
    if(!payload) {
      return next({
        name: 'jwt is required',
        message: 'jwt is required'
      })
    }

    const user = await User.findByPk(payload.id)
    if(!user) {
      return next({
        name: 'invalid jwt',
        message: 'invalid jwt'
      })
    }

    req.decode = payload
    next()
  }
  catch (err) {
    next(err)
  }
}