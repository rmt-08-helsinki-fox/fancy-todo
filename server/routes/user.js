const router = require('express').Router()
const UserController = require('../controllers/userController')

router.post('/googlelogin', UserController.googleLogin)
router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports = router