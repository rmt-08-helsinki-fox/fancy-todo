const app = require('express').Router()
const UserController = require('../controller/userController')

app.post('/register', UserController.register)
app.post('/login', UserController.login)
app.post('/loginGoogle', UserController.loginGoogle)

module.exports = app