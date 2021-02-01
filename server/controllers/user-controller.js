const { User } = require('../models/')
const { compare_password } = require('../helpers/bcrypt') 
const { get_token } = require('../helpers/jwt')

class ControllerUser {
  
  static register(req, res) {
    const { email, password } = req.body
    let obj = { email, password }
    User.create(obj)
    .then(user => {
      const { id, email } = user
      let obj = {id, email}
      res.status(201).json(obj)
    })
    .catch(err => {
      if(err.errors[0].type === 'unique violation') {
        res.status(403).json({ message: 'email already been used by another user' })
      }
      else {
        res.status(400).json({ message: err.message })
      }
    })
  }

  static login(req, res) {
    const { email, password } = req.body

    User.findOne({
      where: {
        email
      }
    })
    .then(user => {
      if(!user) throw new Error('invalid email or password')
      if(!compare_password(password, user.password)) throw new Error('invalid email or password')
      const access_token = get_token({
        id: user.id,
        email: user.email
      })
      res.status(201).json({ access_token })
    })
    .catch(err => {
      res.status(400).json({ message: err.message })
    })
  }

}

module.exports = ControllerUser