const { verify } = require("../helper/jwt")
const { Todo, User } = require('../models')

async function authenticate (req, res, next) {
  try {
    const access_token = req.headers.access_token
    const email = verify(access_token).email
    const find = await User.findOne({ where: { email }})
    
    if (!access_token || !find) {
      res.status(400).json({
        msg: 'Need login!'
      })
    } else {
      req.user = { id: find.id, email: find.email}
      next()
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}
async function authorized (req, res, next) {
  const UserId = +req.user.id
  const id = +req.params.id
  try {
    const find = await Todo.findOne({ where: { id }})
    if (find.UserId !== UserId) {
      res.status(403).json({
        msg: 'This account is not an authorized'
      })
    } else {
      next()
    }
  } catch (err) {
    res.status(500).json(err)
  }
}
module.exports = { authenticate, authorized }