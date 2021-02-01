const express = require('express')
const router = express.Router()
const UserController = require('../controller/UserController')


router.post('/register', UserController.postRegister)

router.post('/login', UserController.postLogin)


module.exports = router