const { user } = require('../models');
const { checkPassword } = require('../helpers')
const { checkPass } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class UserController {
  static register (req, res) {
    console.log(`URL: ${req.originalUrl}`);
    const check = checkPassword(req.body.password);

    if (check) res.status(400).json({ check });
    else {
      user.create(req.body)
        .then(() => {
          res.status(201).json({
            msg: `Welcome ${req.body.email}`
          });
        })
        .catch(err => {
          if (err.errors) {
            const message = [];
  
            err.errors.forEach(el => {
              message.push(el.message);
            })
  
            res.status(400).json(message);
          }
          else res.status(500).json({ msg: "Internal Server Error" });
        })
    }
  };
  
  static login (req, res) {
    console.log(`URL: ${req.originalUrl}`);

    user.findOne({ where: { email: req.body.email } })
      .then(data => {
        if (!data) throw { msg: `Invalid email or password` };
      
        const compare = checkPass(req.body.password, data.password);
        if (!compare) throw { msg: `Invalid email or password` };

        const access_token = generateToken({ id: data.id, email: data.email });
        res.status(200).json({ access_token });
      })
      .catch(err => {
        const error = err.msg
      })
  };
};

module.exports = UserController;