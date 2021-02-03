const { OAuth2Client } = require('google-auth-library')
const { User } = require('../models')
const { generateToken } = require('../helper/jwt')
const { comparePassword } = require('../helper/bcrypt')

class userController {
  static async register (req, res, next) {
    const { email, password } = req.body
    try {
      const create = await User.create({ email, password })
      res.status(201).json({
        id: create.id,
        email: create.email,
      })
    } catch (err) {
      next(err)
    }
  }
  static async login (req, res, next) {
    const { email, password } = req.body
    try {
      const find = await User.findOne({ where: { email }})
      // console.log(password)
      if (!find) {
        throw {
          name: 'invalidLogin'
        }
      } else {
        const comparePass = comparePassword(password, find.password)
        if (comparePass) {

          const token = {
            id: find.id,
            email: find.email,
          }
          const access_token = generateToken(token)
          res.status(200).json({ access_token })
        } else {
          throw {
            name: 'invalidLogin'
          }
        }
      }
    } catch (err) {
      next(err)
    }
  }
  static async googleLogin(req, res, next) {
    try {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        // console.log(process.env.GOOGLE_CLIENT_ID)
        const ticket = await client.verifyIdToken({
          idToken: req.body.googleToken,
          audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        
        console.log(payload, '=============')
      //   const email = payload.email;
      //   const data = await User.findOne({ 
      //     where: {
      //       email
      //     }
      //   });
      // if (data) {
      //     const access_token = generateToken({
      //       id: data.id,
      //       email: data.email,
      //     });
      //     res.status(200).json({
      //       access_token
      //     });
      // } else {
      //   const createAcc = { 
      //     email,
      //     password: new Date().toLocaleDateString().toString(),
      //   };
      //   const account = await User.create(createAcc);
      //   const access_token = generateToken({
      //     id: account.id,
      //     email: account.email,
      //   });
      //   res.status(201).json({
      //     access_token
      //   });
      // }
    } catch (err) {
      console.log(err, 'dari controller google');
      next(err)
    }
  }
}

module.exports = userController