const express = require('express')
const router = express.Router()
const ControllerUser = require('../controller/controllerUser')

router.post('/register', ControllerUser.register)
router.post('/login', ControllerUser.login)


module.exports = router