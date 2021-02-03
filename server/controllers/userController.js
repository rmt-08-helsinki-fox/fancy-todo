const {User} = require('../models/index')
const {comparePass} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');

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

  static loginGoogle(req,res,next){
    const client = new OAuth2Client(process.env.CLIENT_ID);
    let username = ''
    let email = ''
    client.verifyIdToken({
      idToken: req.body.googleToken,
      audience: process.env.CLIENT_ID
    })
      .then(ticket => {
        const payload = ticket.getPayload();
        username = payload.name
        email = payload.email
        return User.findOne({where:{username}})
      })
      .then(user => {
        if(user){
          const access_token = generateToken({
            id: user.id,
            username: user.username,
            email: user.email
          })
          res.status(200).json({access_token})
        }else{
          return User.create({
            username, 
            email,
            password: process.env.PASS_GOOGLE
          })
        }
      })
      .then(register => {
        const access_token = generateToken({
          id: register.id,
          username: register.username,
          email: register.email
        })
        res.status(201).json({access_token})
      })
      .catch(err => {
        console.log(err);
      })
  }
}

module.exports = UserController