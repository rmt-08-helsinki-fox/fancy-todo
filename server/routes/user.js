const router = require('express').Router()
const UserController = require('../controllers/userController')

// User register
router.post('/register', UserController.register)
// User Login
router.post('/login', UserController.login)
// googleLogin
router.post('/googleLogin', UserController.googleLogin)

module.exports = router