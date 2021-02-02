const { User } = require("../models");
const { signToken } = require("../helper/jwt");
const { compare } = require("../helper/bcrypt");

class UserController {
  static async register(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.create({
        email,
        password,
      });

      res.status(200).json({ message: "User created", user: user });
    } catch (err) {
      const error = err.errors[0].message || "Internal Server Error";
      res.status(400).json(error);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) throw { msg: "Invalid Email or password" };
      const checkPassword = compare(password, user.password);
      if (!checkPassword) throw { msg: "Invalid Email or password" };

      const token = signToken({
        id: user.id,
        email: user.email,
      });

      res.status(200).json({ token });
    } catch (err) {
      const error = err.msg || "Internal server error";
      res.status(400).json({ error });
    }
  }
}

module.exports = UserController;
