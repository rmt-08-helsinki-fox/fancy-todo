const { compare } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { User } = require('../models')

class UserController {
  static signUp(req,res){
    const { email,password } = req.body
    User
      .create({
        email,
        password
      },{
        returning: true
      })
      .then(user => {
				res.status(201).json({
          msg: 'Sign Up success',
          id: user.id,
          email: user.email,
          password: user.password
        })
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err)
      })
  }
  static signIn(req,res){
    const { email,password } = req.body
    User
      .findOne({
        where: {
          email
        }
      })
      .then(user => {
        if(!user) throw {msg: 'Invalid email or password'}
        const comparedPass = compare(password,user.password)
        if(!comparedPass) throw {msg: 'Invalid email or password'}
        const access_token = generateToken({
          id: user.id,
          email: user.email
        })
        res.status(200).json({
          access_token
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err)
      })
  }
}

module.exports = UserController