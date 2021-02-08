const router = require('express').Router()
const UserController = require('../controllers/userController')

router.post('/signup', UserController.signUp)
router.post('/signin', UserController.signIn)
router.post('/googleSignIn', UserController.googleSignIn)

module.exports = router