const express = require('express')
const user = express.Router()
const Controller = require('../controller/userController')

user.post('/signup', Controller.signUp)
user.post('/signIn', Controller.signIn)

module.exports = user