const express = require('express')
const user = express.Router()
const Controller = require('../controller/userController')

user.post('/signup', Controller.signUp)
user.post('/signin', Controller.signIn)
user.post('/googlesignin', Controller.googleSignIn)
// user.post('/googlesignup', Controller.googleSignUp)

module.exports = user