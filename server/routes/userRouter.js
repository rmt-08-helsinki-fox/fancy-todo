const express = require('express')
const router = express.Router()
const Controller = require('../controllers/userController.js')

router.post('/signUp', Controller.postSignUp)
router.post('/signIn', Controller.postSignIn)
router.post('/googleLogin', Controller.googleLogin)

module.exports = router