const express = require('express')
const router = express.Router()
const UserController = require('../controller/users-controller')

// ============= register ===============
router.post('/register', UserController.register)

// ============= login ===============
router.post('/login', UserController.login)

// ========== google login ========
router.post('/googlelogin', UserController.googleLogin)

module.exports = router