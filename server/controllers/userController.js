const { User } = require('../models/')
const { hash, compare } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
  static register(req, res, next) {
    //tes,berhasil
    // res.send('tes register')

    const { email, password } = req.body

    User.create({ email, password })
      .then(user => {
        res.status(201).json({

          id: user.id,
          email: user.email,

        })
      })
      .catch(err => {
        // console.log(err);
        // const error = err.errors[0].message || 'internal server error'
        // res.status(500).json({ error })
        next(err)
      })
  }

  static login(req, res, next) {
    //tes,berhasil
    // res.send('ini login')

    const { email, password } = req.body

    User.findOne({
      where: {
        email
      }
    })
      .then(user => {
        // tes,user
        // console.log(user);
        if (!user) throw { msg: 'Invalid email or password' }
        const comparedPassword = compare(password, user.password)

        if (!comparedPassword)
          throw { msg: 'Invalid email or password' }
        // throw {
        //   name: 'customError',
        //   msg: 'Invalid email or password',
        //   status: 400
        // }

        const accessToken = generateToken({
          id: user.id,
          email: user.email
        })
        res.status(200).json({ accessToken })
      })
      .catch(err => {
        // console.log(err, 'dari catch error');
        const error = err.msg || 'internal server error'
        res.status(500).json({ error })
        // next(err)
      })

  }
}

module.exports = UserController