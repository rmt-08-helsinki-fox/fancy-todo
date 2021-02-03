const { User } = require('../models')
const { comparePass } = require('../helpers/bcrypt.js');
const { generateToken } = require('../helpers/jwt.js');

class UsersController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body
      const newUser = {
        email,
        password
      }

      const data = await User.create(newUser)

      if(!data) throw (error)

      res.status(201).json({
        msg: 'Register success',
        id: data.id,
        email: data.email,
      })
    } 
    catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body

      const data = await User.findOne({
        where: { email }
      })

      if(!data) throw ({ 
        name: "CustomError",
        msg: "Invalid email or password",
        status: 400 
      })

      const comparePassword = await comparePass(password, data.password)

      if (!comparePassword) throw ({ 
        name: "CustomError",
        msg: "Invalid email or password",
        status: 400 
      })

      const accessToken = generateToken({
        id: data.id,
        email: data.email
      })

      res.status(200).json({ accessToken })
    } 
    catch (error) {
      next(error)
    }
  }
}

module.exports = UsersController