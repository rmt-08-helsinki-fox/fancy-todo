const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.get('/register', UserController.register)

router.post('/register', UserController.registerPost)

router.get('/login', UserController.login)

router.post('/login', UserController.loginPost)

module.exports = router