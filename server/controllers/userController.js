const {User} = require('../models/index')
const {comparePass} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')

class UserController{
  static createUser(req,res, next){
    const {username, email, password} = req.body
    const user = {username, email, password}
    User.create(user)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static loginUser(req,res, next){
    const {email, password} = req.body
    User.findOne({
      where: {
        email
      }
    })
      .then(user => {
        if(!user) throw {name: 'customError',msg: 'Invalid username or password', status: 400}
        const comparedPass = comparePass(password, user.password)
        if(!comparedPass) throw {name: 'customError',msg: 'Invalid username or password', status: 400}
        const access_token = generateToken({
          id: user.id,
          username: user.username,
          email: user.email
        })
        res.status(200).json({access_token})
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = UserController