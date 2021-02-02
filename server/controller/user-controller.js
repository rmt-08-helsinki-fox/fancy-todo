const { User } = require("../models")
const { compare } = require("../helpers/hasher")
const { generateToken } = require("../helpers/jwt")

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
}

module.exports = UserController