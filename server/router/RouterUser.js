const express = require('express')
const {UserController} = require('../controllers')
const {Error} = require('../middlewares/ErrorHandling')

const RouterUser = express.Router()

RouterUser.post('/register', UserController.register)
RouterUser.post('/login', UserController.login)

module.exports={
    RouterUser
}