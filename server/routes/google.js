const router = require('express').Router()
const UserController = require('../controller/userController')

router.post('/',UserController.googleSignIn)

module.exports= router