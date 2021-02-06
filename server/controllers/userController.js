const { Todo, User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

module.exports = class UserController {

  static async getUser(req, res, next) {
    try {
      const user = await User.findOne({ where: { email: req.payload.email } })
      res.status(200).json(user)
    } catch (err) {
      next(err);
    }
  }

  static async getUsers(req, res, next) {
    try {
      const users = await User.findAll()
      res.status(200).json(users)
    } catch (err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    try {
      let { email, password } = req.body;
      const isEmail = await User.findOne({ where: { email } })
      if(isEmail) { throw { name: "Bad Request", message: "email has been taken", status: 400 } }
      const registeredUser = await User.create({ email, password }, { returning: true })
      let { id } = registeredUser;
      res.status(201).json({ id, email })
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      let { email, password } = req.body;
      const user = await User.findOne({ where: { email } })
      if(!user) { throw { name: "Bad Request", message: "email or password incorrect", status: 400 } }
      let isPassword = comparePassword(password, user.password)
      if(!isPassword) { throw { name: "Bad Request", message: "email or password incorrect", status: 400 } }
      const access_token = generateToken({
        id: user.id,
        email: user.email
      })
      res.status(200).json({ access_token })
    } catch (err) {
      next(err)
    }
  }

  static async loginGoogle(req, res, next) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.body.id_token,
        audience: process.env.GOOGLE_CLIENT_ID
      });
      const payload = ticket.getPayload();
      const { email, picture, name } = payload;
      let user = await User.findOne({ where: { email } });
      if(!user) {
        const password = process.env.PASSWORD_USER;
        user = await User.create({ email, password })
      }
      const access_token = generateToken({
        id: user.id,
        email: user.email
      })
      res.status(200).json({ access_token })
    } catch(err) {
      next(err)
    }
  }
}