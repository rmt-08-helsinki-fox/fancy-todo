const e = require("express")
const { reset } = require("nodemon")

const { User } = require('../models')
const { comparePass } = require('../helper/enkrip')
const { generateToken } = require('../helper/jwt')

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
    const { username, email, password } = req.body
    const dataUser = { username, email, password }
    User.findOne({
      where: {
        username: dataUser.username
      }
    }).then(data => {
      if (!data) throw data
      const hasil = comparePass(dataUser.password, data.password)
      if (hasil === false) throw hasil
      const access_token = generateToken({
        username: data.username,
        email: data.email,
        password: data.password
      })
      res.status(200).json(access_token)
    }).catch(err => {
      if (err === null) {
        res.status(404).json({ msg: 'Data not found' })
      }
      if (err === false) {
        res.status(400).json({ msg: 'Email or password is wrong' })
      }
      res.status(500).json(err)
    })
  }
}
module.exports = Controller