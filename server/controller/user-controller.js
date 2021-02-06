const { User } = require("../models")
const { compare } = require("../helpers/hasher")
const { generateToken } = require("../helpers/jwt")
const {OAuth2Client} = require('google-auth-library');

class UserController {
    static postRegister (req, res, next) {
        const { email, password } = req.body
        const newUser = {
          email,
          password
        }
        User.create(newUser)
          .then(user=> {
            res.status(201).json({
              msg: "register succsess",
              id: user.id,
              email: user.email
            })
          })
          .catch(err => {
            next(err)
          })
    }
    static postLogin(req, res, next){
      const { email, password } = req.body
      User.findOne({where:{email}})
        .then(user => {
          if (!user) {
            let err = {name: "bad request", message: "invalid email or password"}
            next(err)
          } else {
            const comparedPassword = compare(password, user.password)
            if (!comparedPassword){
              let err = {name: "bad request", message: "invalid email or password"}
              next(err)
            } else {
              const access_token = generateToken({
                id: user.id,
                email: user.email
              })
              res.status(201).json({access_token})
            }
          }
        })
        .catch(err => {
          next(err)
        })
    }
    static googleLogin(req, res, next) {
      const client = new OAuth2Client(process.env.CLIENT_ID);
      let email = ""

      client.verifyIdToken({
        idToken: req.body.googleToken,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      })
      .then(ticket => {
        const payload = ticket.getPayload();
        email = payload.email

        return User.findOne({where: {email}})
      })
      .then(user => {
        if (user){
          const access_token = generateToken({
            id: user.id,
            email: user.email
          })
          res.status(200).json({access_token})
        } else {
          return User.create({
            email,
            password: process.env.USER_PASS
          })
        }
      })
      .then(registeredUser => {
        const access_token = generateToken({
          id: registeredUser.id,
          email: registeredUser.email
        })
        res.status(201).json({access_token})
      })
      .catch(err => {
        console.log(err);
      })
    }
}

module.exports = UserController