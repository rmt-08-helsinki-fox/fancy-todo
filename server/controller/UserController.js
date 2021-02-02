const { User } = require('../models/index.js');
const { comparePassword } = require('../helper/bcrypt.js');
const { generateToken } = require('../helper/jwt.js');

class UserController {
    static register (req, res, next){ 
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
          next(err)
        })
    }

    static login (req, res, next) {
      const { email, username, password } = req.body
      User.findOne({where : {email}})
      .then(user => {
        if(!user) throw { name : 'login'}
        const comparedPass = comparePassword(password, user.password)
        if(!comparedPass) throw {name : 'login'}
        const acces_token = generateToken({
          id : user.id,
          email : user.email
        })
        res.status(200).json({ acces_token })
      })
      .catch(err => {
        next(err)
        // const error = err.msg || 'Internal server error'
        // res.status(500).json({ error })
      })
    }

}

module.exports = UserController;