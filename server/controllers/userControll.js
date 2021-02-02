const { User } = require("../models/")
const { comparePass } = require("../helpers/bcrypt")
const { newToken } = require("../helpers/jwt")

class UserControll {
  static register(req, res){
    let newUser = {
      email: req.body.email,
      password: req.body.password
    }

    User.create(newUser)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      const error = err.errors[0].message
      res.status(500).json({error})
    })
  }

  static login(req, res){
    const email = req.body.email
    const password = req.body.password

    User.findOne({
      where: {
        email: email
      }
    })
    .then(data => {
      if(!data) throw ({msg: "Wrong Email or Password"})

      const pass = comparePass(password, data.password)
      if(!pass) throw ({msg: "Wrong Email or Password"})

      let token = newToken({
        id: data.id,
        email: data.email
      })
      
      res.status(200).json({ token })
    })
    .catch(err => {
      res.status(500).json({ msg: "Wrong Email or Password" })
    })
  }
}

module.exports = UserControll