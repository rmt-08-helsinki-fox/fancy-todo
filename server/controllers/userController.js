const { User } = require("../models");
const { signToken } = require("../helper/jwt");
const { compare } = require("../helper/bcrypt");
const { OAuth2Client } = require("google-auth-library");

class UserController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.create({
        email,
        password,
      });

      res.status(200).json({ message: "User created", user: user });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user)
        throw {
          name: "customError",
          status: 400,
          message: "Invalid Email or password",
        };

      const checkPassword = compare(password, user.password);

      if (!checkPassword)
        throw {
          name: "customError",
          status: 400,
          message: "Invalid Email or password",
        };

      const token = signToken({
        id: user.id,
        email: user.email,
      });

      res.status(200).json({ access_token: token });
    } catch (err) {
      next(err);
    }
  }

  static async googleSignIn(req, res, next) {
    try {
      const client = new OAuth2Client(process.env.GOOGLEOAuth_API);
      const ticket = await client.verifyIdToken({
        idToken: req.body.id_token,
        audience: process.env.GOOGLEOAuth_API,
      });
      const payload = ticket.getPayload();
      let email = payload.email;

      const user = await User.findOne({ where: { email: email } });
      if (user) {
        const access_token = signToken({
          id: user.id,
          email: user.email,
        });
        res.status(200).json({ access_token: access_token });
      } else {
        const createUser = await User.create({
          email: email,
          password: process.env.USER_PW_GOOGLE,
        });

        const access_token = signToken({
          id: createUser.id,
          email: createUser.email,
        });

        res.status(201).json({ access_token: access_token });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
