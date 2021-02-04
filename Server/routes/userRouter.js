const router = require('express').Router()
const userController = require('../controllers/userController')
const authenticate = require('../middleware/authenticate')

router.post('/register', userController.register)
router.post('/login', userController.login)

module.exports = router;
