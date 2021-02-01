const { User } = require('../models/index.js');
const { comparePassword } = require('../helper/bcrypt.js');
const { generateToken } = require('../helper/jwt.js');

class UserController {
    static register (req, res){ 
        const { email, username, password } = req.body
        User.create({email, username, password})
        .then(user => {
          res.status(201).json({
            msg : "register berhasil",
            id : user.id,
            username : user.username
          })
        })
        .catch(err => {
          const error = err.errors[0].message || 'Internal Server Error'
          res.status(500).json({error : error})
        })
    }

    static login (req, res) {
      const { email, username, password } = req.body
      User.findOne({where : {email}})
      .then(user => {
        if(!user) throw { msg : 'invalid email or password'}
        const comparedPass = comparePassword(password, user.password)
        if(!comparedPass) throw {msg : 'invalid email or password'}
        const acces_token = generateToken({
          id : user.id,
          email : user.email
        })
        res.status(200).json({ acces_token })
      })
      .catch(err => {
        const error = err.msg || 'Internal server error'
        res.status(500).json({ error })
      })
    }

}

module.exports = UserController;