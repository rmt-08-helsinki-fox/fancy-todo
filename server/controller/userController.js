const e = require("express")
const { reset } = require("nodemon")

const { User } = require('../models')
const { comparePass } = require('../helper/enkrip')
const { generateToken } = require('../helper/jwt')
const { OAuth2Client } = require('google-auth-library');

class Controller {
  static signUp(req, res) {
    const { email, password } = req.body
    const data = { email, password }
    User.create(data)
      .then(success => {
        res.status(200).json({ success })
      })
      .catch(err => {
        res.status(500).json(err.errors)
      })
  }
  static signIn(req, res) {
    const { email, password } = req.body
    const dataUser = { email, password }
    User.findOne({
      where: {
        email: dataUser.email
      }
    }).then(data => {
      if (!data) throw data
      const hasil = comparePass(dataUser.password, data.password)
      if (hasil === false) throw hasil
      const access_token = generateToken({
        id: data.id,
        email: data.email,
        password: data.password
      })
      res.status(200).json({ 'access_token': access_token })
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

  static googleSignIn(req, res, next) {
    console.log('masuk google login')
    let dataGoogle = {}
    const client = new OAuth2Client(process.env.CLIENT_ID);
    client.verifyIdToken({
      idToken: req.body.googleToken,
      audience: process.env.CLIENT_ID
    })
      .then(ticket => {
        const payload = ticket.getPayload()
        dataGoogle.email = payload.email
        dataGoogle.password = process.env.password_google
        User.findOne({
          where: {
            email: dataGoogle.email
          }
        })
          .then(data => {
            if (!data) throw data
            const hasil = comparePass(dataGoogle.password, data.password)
            if (hasil === false) throw hasil
            const access_token = generateToken({
              id: data.id,
              email: data.email,
              password: data.password
            })
            res.status(200).json({ 'access_token': access_token })
          })
          .catch(err => {
            if (err === null) {
              res.status(404).json({ msg: 'Data not found' })
            }
            if (err === false) {
              res.status(400).json({ msg: 'Email or password is wrong' })
            }
            res.status(500).json(err)
          })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static googleSignUp(req, res) {
    let dataGoogle = {}
    const client = new OAuth2Client(process.env.CLIENT_ID);
    client.verifyIdToken({
      idToken: req.body.googleToken,
      audience: process.env.CLIENT_ID
    })
      .then(ticket => {
        const payload = ticket.getPayload()
        dataGoogle.email = payload.email
        dataGoogle.password = process.env.password_google
        User.create(dataGoogle)
          .then(success => {
            res.status(200).json({ success })
          })
          .catch(err => {
            res.status(500).json(err.errors)
          })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}
module.exports = Controller