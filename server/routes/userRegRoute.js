const router = require('express').Router()
const UserController = require('../controller/userController')

router.post('/',UserController.register)

module.exports= router