const { User } = require("../models");

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
}

module.exports = UserController;
