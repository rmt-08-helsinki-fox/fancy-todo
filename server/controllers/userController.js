const { User } = require("../models");
const { compare } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class UserController {
  static register(req, res) {
    const { email, password } = req.body;
    console.log(req.body);
    User.create({ email, password })
      .then((user) => {
        res.status(201).json({
          msg: "Succes create a user",
          id: user.id,
          email: user.email,
          password: user.password,
        });
      })
      .catch((err) => {
        const error = err.errors[0].message;
        res.status(500).json(error);
      });
  }
  static login(req, res) {
    const { email, password } = req.body;
    User.findOne({
      where: { email },
    })
      .then((user) => {
        if (!user) {
          throw { msg: "Wrong Email or Password" };
        }
        const compared = compare(password, user.password);
        if (!compared) {
          throw { msg: "Wrong Email or Password" };
        }
        const access_token = generateToken({
          id: user.id,
          email: user.email,
        });
        res.status(200).json({ access_token });
      })
      .catch((err) => {
        const error = err.msg;
        res.status(500).json({ error });
      });
  }
}

module.exports = UserController;
