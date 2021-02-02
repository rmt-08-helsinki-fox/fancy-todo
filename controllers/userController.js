const {User} = require('../models/')
const {comparePassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')

class userController {
  static register(req, res) {
    let newUser = {
      email: req.body.email,
      password: req.body.password
    }
    User.create(newUser)
    .then(user => {
      res.status(201).json({
        msg: "Register complete",
        email: user.email
      })
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({msg: "Invalid input"})
    })
  }

  static login(req, res) {
    const {email, password} = req.body
    User.findOne({where:{
      email
    }})
    .then(user => {
      console.log(user)
      if(!user) throw { msg: "User not found"}
      const comparePass = comparePassword(password, user.password)
      if(!comparePass) throw { msg: "Invalid email or password"}

      const token_key = generateToken({
        id: user.id,
        email: user.email
      })
      console.log(token_key)
      res.status(200).json({token_key})
    })
    .catch(err =>{
      console.log(err)
      const error = err.msg || "Internal server error"
      res.status(400).json({error})
    })
  }
}

module.exports = userController;
