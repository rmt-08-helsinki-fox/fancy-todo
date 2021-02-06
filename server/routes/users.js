const express = require('express')
const router = express.Router()
const UsersController = require('../controllers/UsersController')

router.post("/register", UsersController.register)

router.post("/login", UsersController.login)

router.post("/googlelogin", UsersController.googleLogin)

module.exports = router