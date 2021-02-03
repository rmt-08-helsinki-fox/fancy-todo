const { User } = require("../models");
const { compare } = require("../helper/bcrypt");
const { generateToken } = require("../helper/jwt");
const axios = require("axios");
const API_KEY = process.env.API_KEY;

class UserController {
  static postRegister(req, res, next) {
    const { email, password, location } = req.body;

    User.create({ email, password, location })

      .then((user) => {
        console.log(user.location);
        axios
          .get(
            `http://api.quotable.io/random?tags=love`
          )
          .then((wheater) => {
            res.status(201).json({
              msg: "registrasi berhasil",
              user,
              LoveQuotesForYou: wheater.data.content,
            });
          });
      })

      .catch((err) => {
        next(err);
      });
  }

  static postLogin(req, res, next) {
    const { email, password } = req.body;

    User.findOne({ where: { email } })

      .then((data) => {
        // console.log(data)
        if (data && compare(password, data.password)) {
          // console.log('ok')
          let payload = {
            id: data.id,
            email: data.email,
          };
          const access_token = generateToken(payload);
          // console.log(access_token)
          res.status(200).json({
            access_token,
          });
        } else {
          next({ name: "invalid" });
        }
      })

      .catch((err) => {
        next(err);
        //console.log(err)
        //const error = err.msg || "internal server error"
        //res.status(500).json({error})
      });
  }
}

module.exports = UserController;
