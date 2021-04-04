const express = require('express')
const {UserController} = require('../controllers')

const RouterUser = express.Router()

RouterUser.post('/register', UserController.register)
RouterUser.post('/login', UserController.login)
RouterUser.get('/auth', UserController.auth)
RouterUser.post('/googlelogin', UserController.googleLogin)

module.exports={
    RouterUser
}