const router = require('express').Router()
const UserController = require('../controllers/UserController')
const authenticate = require('../middleware/authenticate')

router.post('/register', UserController.register)

router.post('/login', UserController.login)

router.use(authenticate)

router.get('/', UserController.showAllUsers)

router.get('/:username', UserController.showUserByUsername)


module.exports = router