const express = require('express')
const router = express.Router()
const UserController = require('../controller/users-controller')
const authenticate = require('../middleware/authenticate')

// ============= register ===============
router.post('/register', UserController.register)

// ============= login ===============
router.post('/login', UserController.login)

// ========== google login ========
router.post('/googlelogin', UserController.googleLogin)

// ============= get weather (3rd party api) =========
router.get('/location', authenticate, UserController.getWeather)

module.exports = router