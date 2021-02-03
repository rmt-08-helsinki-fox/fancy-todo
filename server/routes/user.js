const router = require('express').Router()
const UserController = require('../controllers/userController')

router.post('/register', UserController.createUser)
router.post('/login', UserController.loginUser)
router.post('/googleLogin', UserController.loginGoogle)

module.exports = router