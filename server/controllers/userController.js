const { compare } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { User } = require('../models')
const {OAuth2Client} = require('google-auth-library');

class UserController {
  static signUp(req,res,next){
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
        next(err)
      })
  }
  static signIn(req,res,next){
    const { email,password } = req.body
    User
      .findOne({
        where: {
          email
        }
      })
      .then(user => {
        if(!user) throw {name:'signInError', msg: 'Invalid email or password', status:400}
        const comparedPass = compare(password,user.password)
        if(!comparedPass) throw {name:'signInError', msg: 'Invalid email or password', status:400}
        const access_token = generateToken({
          id: user.id,
          email: user.email
        })
        res.status(200).json({
          access_token
        })
      })
      .catch(err => {
        next(err)
      })
  }
  static googleLogin(req,res,next){
    const client = new OAuth2Client(process.env.CLIENT_ID);
    let email
    client.verifyIdToken({
      idToken: req.body.googleToken,
      audience: process.env.CLIENT_ID
    })
    .then(ticket => {
      const payload = ticket.getPayload()
      email = payload.email
      return User.findOne({
        where:{
          email
        }
      })
    })
    .then(user => {
      if (user) {
        // console.log('masuk IF >>>>>>>');
        const token = generateToken({
          id:registeredUser.id,
          email: registeredUser.email
        })
        res.status(200).json({access_token:token})
      } else {
        // console.log('masuk ELSE >>>>>>>');
        // console.log(email);
        console.log(process.env.GPASS);
        return User.create({
          email,
          password: process.env.GPASS
        })
      }
    })
    .then(registeredUser => {
      const token = generateToken({
        id:registeredUser.id,
        email: registeredUser.email
      })
      res.status(201).json({access_token:token})
    })
    .catch(err => {
      console.log(err);
      next(err)
    })
  }
}

module.exports = UserController