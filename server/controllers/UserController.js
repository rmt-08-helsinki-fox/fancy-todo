const User = require('../models/index').User
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController{
  static register (req,res){
    let { email , password } = req.body 
    User.create({email, password})
    .then(newUser => {
      console.log(newUser)
      let {email, id} = newUser
      res.status(201).json({email, id})
    })
    .catch(err => {
      console.log(err.name)
      if(err.name == "SequelizeValidationError"){
        res.status(400).json(err.message)
      } else if(err.name == "SequelizeUniqueConstraintError"){
        res.status(400).json({msg: 'Email already exists'})
      }
      res.status(500).json({msg : 'internal server error'})
    })
  }
  static async login(req, res){
    try {
      let {email, password} = req.body
      let user = await User.findOne({
        where: {email}
      })
      if(!user){
        res.status(401).json({msg: 'Invalid email'})
      }
      let isMatch = comparePassword(password, user.password)
      if(!isMatch){
        res.status(401).json({msg: 'Invalid password'})
      }
      const payload = {
        id: user.id,
        email: user.email
      }
      const access_token = generateToken(payload)
      res.status(200).json(access_token)

    } catch (err) {
      console.log(err)
      res.status(500).json({msg: 'Internal Server Error'})
    }
  }
}

module.exports = UserController