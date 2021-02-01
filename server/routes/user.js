const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.get('/', UserController.showAllUsers)

router.post('/register', UserController.register)

router.post('/login', UserController.login)

router.get('/:username', UserController.showUserByUsername)


module.exports = router