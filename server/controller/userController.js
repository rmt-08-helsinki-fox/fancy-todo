const { reset } = require("nodemon")

const { User } = require('../models')

class Controller {
  static signUp(req, res) {
    const { username, email, password } = req.body
    const data = { username, email, password }
    User.create(data)
      .then(success => {
        res.status(200).json({ success })
      })
      .catch(err => {
        res.status(500).json(err.errors)
      })
  }
  static signIn(req, res) {
    res.send('halaman login')
  }
}
module.exports = Controller