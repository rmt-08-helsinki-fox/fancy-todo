const router = require('express').Router()
const AuthController = require('../controller/authController')

router.use('/',AuthController.register)

module.exports= router