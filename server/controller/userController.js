const { User } = require("../models/index");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

/**
 * PROSES REGISTER
 * 1. HTTP request dengan data req body email dan password
 * 2. hash password melalui hooks
 * 3. create user dijalankan dan data user tersimpan di database
 */

/**
 * PROSES LOGIN
 * 1. cek user ada apa nggak di database (berdasarkan email)
 * 2. kalau tidak ada, lempar error
 * 3. kalau ada, bandingkan password pakai bcrypt
 * 4. kalau password salah, lempar error
 * 5. kalau password sama, berarti user berhasil login dan return access_token (jwt)
 */

class UserController {
  static postRegister(req, res, next) {
    let { email, password } = req.body;
    User.create({ email, password })
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        next(err)
        // res.status(400).json(err); //nanti diganti dengan next
      });
  }

  static postLogin(req, res, next) {
    const { email, password } = req.body;
    User.findOne({
      where: {
        email
      },
    })
      .then((user) => {
        if (!user)
          throw { 
            name: "customError",
            msg: "Invalid email or password",
            status: 400
          };
        const comparedPassword = comparePassword(password, user.password);
        if (!comparedPassword) 
          throw {
            name: "customError",
            msg: "Invalid email or password",
            status: 400 
          };
        const access_token = generateToken({
          id: user.id,
          email: user.email,
        });
        res.status(200).json({ access_token });
      })
      .catch((err) => {
        next(err);
      });
  }

  // contoh async

  // static async postLogin(req, res) {
  //   try{
  //     const { email, password } = req.body;
  //     const user = await User.findOne({
  //       where: {
  //         email
  //       }
  //     })
  //     if (!user) throw { msg: 'Invalid email or password' };
  //     const comparedPassword = comparePassword(password, user.password);
  //       if (!comparedPassword) throw ('ini pesan error');
  //       const access_token = generateToken({
  //         id: user.id,
  //         email: user.email
  //       })
  //       res.status(200).json({access_token})
  //   } catch(err) {
  //     const error = err.msg || 'Internal server error';
  //     res.status(500).json({ error })
  //   }
  // }
}

module.exports = UserController;
