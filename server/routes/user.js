const router = require('express').Router()
const UserController = require('../controllers/userController')

router.post('/signup', UserController.userSignup)
router.post('/signin', UserController.userSignin)
router.post('/googlelogin', UserController.googleLogin)


module.exports = router