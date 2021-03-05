const express = require('express')
const router = express.Router()
const ControllerUser = require('../controller/controllerUser')

router.post('/register', ControllerUser.register)
router.post('/login', ControllerUser.login)
router.post('/googlelogin', ControllerUser.googleLogin)


module.exports = router