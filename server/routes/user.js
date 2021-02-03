const user = require('express').Router()
const userController = require('../controller/user')

user.post('/register', userController.register)
user.post('/login', userController.login)
user.post('/googleLogin', userController.googleLogin)

module.exports = user