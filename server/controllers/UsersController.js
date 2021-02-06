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

  static googleLogin(req, res, next) {
    const client = new OAuth2Client(process.env.CLIENT_ID)
    let email = ""
    client.verifyIdToken({
      idToken: req.body.google_token,
      audience: process.env.CLIENT_ID,
    })
      .then((ticket) => {
        const payload = ticket.getPayload()
        email = payload.email
        console.log(payload, "ini payload")
        return User.findOne({ where: { email } })
      })
      .then((user) => {
        if (!user) {
          console.log("Registering with google")
          return User.create({ email, password: process.env.SECRET_GOOGLE })
        } else {
          const access_token = generateToken({
            id: user.id,
            email: user.email,
          })
          res.status(200).json({ access_token: access_token })
        }
      })
      .then((registeredUser) => {
        console.log("Logining with google")
        const access_token = generateToken({
          id: registeredUser.id,
          email: registeredUser.email,
        })
        res.status(201).json({ access_token: access_token })
      })
      .catch((err) => {
        next(err)
      })
  }
}

module.exports = UsersController