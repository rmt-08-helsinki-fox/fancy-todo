const user = require('express').Router()
const userController = require('../controller/user')

user.post('/register', userController.register)
user.post('/login', userController.login)

module.exports = user