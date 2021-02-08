const { User } = require("../models/")
const { comparePass } = require("../helpers/bcrypt")
const { newToken } = require("../helpers/jwt")
const {OAuth2Client} = require('google-auth-library');

class UserControll {
  static register(req, res, next){
    let newUser = {
      email: req.body.email,
      password: req.body.password
    }

    User.create(newUser)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static login(req, res, next){
    const email = req.body.email
    const password = req.body.password

    User.findOne({
      where: {
        email: email
      }
    })
    .then(data => {
      if(!data) throw ({name: "custom", msg: "Wrong Email or Password", status: 400})

      const pass = comparePass(password, data.password)
      if(!pass) throw ({name: "custom", msg: "Wrong Email or Password", status: 400})

      let token = newToken({
        id: data.id,
        email: data.email
      })

      res.status(200).json({ token })
    })
    .catch(err => {
      next(err)
    })
  }

  static loginGoogle(req, res, next){
    const client = new OAuth2Client(process.env.USER_ID);
    let emailGoogle

    client.verifyIdToken({
      idToken: req.body.googleToken,
      audience: process.env.USER_ID
    })
    .then(ticket => {
      const payload = ticket.getPayload()
      emailGoogle = payload.email

      return User.findOne({
        where: {
          email: emailGoogle
        }
      })
    })
    .then(data=> {
      if(!data){
        return User.create({
          email: emailGoogle, 
          password: "googlePass"
        })
        .then(data => {
          let token = newToken({
            id: data.id,
            email: data.email
          })
          res.status(200).json({token})
        })
      }
      else{
        let token = newToken({
          id: data.id,
          email: data.email
        })
        
        res.status(200).json({token})
      }
    })
    
    .catch(err => {
      next(err)
    })
  }
}

module.exports = UserControll