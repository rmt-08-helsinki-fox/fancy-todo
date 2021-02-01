const { User } = require('../models/index.js')
const { compare } = require('../helpers/bcrypt')
// const { generateToken } = require('../helpers/jwt')

class UserController {
  static register(req, res) {
    // res.send('tes register')

    const { email, password } = req.body

    User.create({ email, password })
      .then(user => {
        res.status(201).json({
          msg: 'Register sukses',
          id: user.id,
          email: user.email,
          password: user.password
        })
      })
      .catch(err => {
        const error = err.errors[0].message || 'internal server error'
        res.status(500).json({ error })
      })
  }

  static login(req, res) {
    // res.send('ini login')
    const { email, password } = req.body

    User.findOne({
      where: {
        email
      }
    })
      .then(user => {
        // console.log(user);
        if (!user) throw { msg: 'Invalid email or password' }
        const comparedPassword = compare(password, user.password)
        console.log('ini berhasil compare');
        if (!comparedPassword) throw { msg: 'Invalid email or password' }

      })
      .catch(err => {
        console.log(err, 'dari catch error');
      })

  }
}

module.exports = UserController