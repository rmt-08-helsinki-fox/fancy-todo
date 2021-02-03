const { User } = require('../models/')
const { comparePassword } = require('../helpers/bcrypt') 
const { getToken } = require('../helpers/jwt')

class ControllerUser {
  
  static register(req, res, next) {
    const { email, password } = req.body
    let obj = { email, password }
    User.create(obj)
    .then(user => {
      const { id, email } = user
      let obj = {id, email}
      res.status(201).json(obj)
    })
    .catch(err => {

      next(err)
    })
  }

  static login(req, res, next) {
    const { email, password } = req.body

    User.findOne({
      where: {
        email
      }
    })
    .then(user => {
      if(!user) throw new Error('invalid email or password')
      if(!comparePassword(password, user.password)) throw new Error('invalid email or password')
      //jika berhasil login
      const access_token = getToken({
        id: user.id,
        email: user.email
        //pada saat authentication akan ada proses decoded
      })
      res.status(201).json({ access_token })
    })
    .catch(err => {
      
      next(err)
    })
  }

}

module.exports = ControllerUser