const { User } = require('../models/');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class UserController {
  static register(req, res) {
    const { email, password } = req.body;
    User.create({ email, password })
      .then(user => {
        res.status(201).json({
          id: user.id,
          email: user.email
        })
      })
      .catch(err => {
        console.log(err);
        if (err.errors) {
          const errorValidations = err.errors.map(err => err.message);
          res.status(400).json({ errors: errorValidations });
        } else {
          res.status(500).json({ errors: 'Internal Server Error' });
        }
      })
  }

  static login(req, res) {
    const { email, password } = req.body;
    User.findOne({ 
      where: { email }
    })
      .then(user => {
        if (!user) throw { msg: 'Invalid email or password', status: 400 };
        
        const resultCompare = comparePassword(password, user.password);

        if (!resultCompare) throw { msg: 'Invalid email or password', status: 400 };

        const accessToken = generateToken({
            id: user.id,
            email: user.email
        })

        res.status(200).json({ accessToken })
      })
      .catch(err => {
        console.log(err);
        const error = err.msg || 'Internal Server Error';
        const status = err.status || 500;
        res.status(status).json({ errors: error });
      })
  }
}

module.exports = UserController;