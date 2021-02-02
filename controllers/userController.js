const {User} = require('../models/')
const {comparePasswords} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')

class userController {
  static register(req, res) {
    let {email, password} = req.body
    User.create({email, password})
    .then(user => {
      res.status(201).json({
        msg: "Register complete",
        email: user.email
      })
    })
    .catch(err => {
      const error = err.errors[0].message || "Internal server Error"
      res.status(400).json({ error })
    })
  }

  static login(req, res) {
    const {email, password} = req.body
    User.findOne({where:{
      email
    }})
    .then(user => {
      if(!user) throw { msg: "User not found"}
      const comparePass = comparePasswords(password, user.password)
      if(!comparePass) throw { msg: "Invalid email or password"}

      const token_key = generateToken({
        id: user.id,
        email: user.email
      })
      res.status(200).json({token_key})
    })
    .catch(err =>{
      const error = err.msg || "Internal server error"
      res.status(400).json({error})
    })
  }
}

module.exports = userController;
