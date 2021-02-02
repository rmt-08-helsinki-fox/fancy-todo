const { User } = require("../models");
const { signToken } = require("../helper/jwt");
const { compare } = require("../helper/bcrypt");

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

      res.status(200).json({ token });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
