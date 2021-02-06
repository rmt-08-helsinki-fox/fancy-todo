const {User} = require('../models')
const {comparePass} = require('../helpers/bcrypt')
const generateToken = require('../helpers/generateToken')
const {OAuth2Client} = require('google-auth-library');

class ControllerUser {
  static register(req,res, next) {
    let {email , password} = req.body
    User.create({email, password})

    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      next(err)
    })
  }

  static login(req, res, next){
    let {email, password} = req.body
    User.findOne({where: {email}})
    .then(user => {
      if(!user){
        throw {
          name: 'customError',
          status: 400,
          message: 'Email / Password is Invalid'
        }
      }
      let compare = comparePass(password, user.password)
      if(compare){
        let accessToken = generateToken({id: user.id, email: user.email})
        res.status(200).json({accessToken})
      }else{
        throw {
          name: 'customError',
          status: 400,
          message: 'Email / Password is Invalid'
        }
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static googleLogin(req, res, next) {
    const client = new OAuth2Client(process.env.CLIENT_ID)
    let email = ""
    client.verifyIdToken({
      idToken: req.body.googleToken,
      audience: process.env.CLIENT_ID
    })
      .then(ticket => {
        const payload = ticket.getPayload()
        email = payload.email
        return User.findOne({where: {email}}) 
      })
        .then(user => {
          if(user) {
            const accessToken = generateToken({
              id: user.id,
              email: user.email
            })
            res.status(200).json({accessToken})
          }else{
            return User.create({email, password: "mujib"})
          }
        })
          .then(registeredUser => {
            const accessToken = generateToken({
              id: registeredUser.id,
              email: registeredUser.email
            })
            res.status(201).json({accessToken})
          })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = ControllerUser