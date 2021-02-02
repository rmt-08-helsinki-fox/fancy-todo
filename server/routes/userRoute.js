const router = require('express').Router()
const UserController = require('../controllers/userController')

// proses mendaftar user baru
router.post('/register', UserController.register)

// proses login
router.post('/login', UserController.login)




module.exports = router