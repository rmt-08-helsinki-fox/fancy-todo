const router = require('express').Router()
const usersController = require('../controllers/usersController')


router.post('/signup', usersController.signUp)
router.post('/signin', usersController.signIn)
router.post('/signinGoogle', usersController.signinGoogle)


module.exports = router