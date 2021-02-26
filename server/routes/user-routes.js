const router = require('express').Router()
const ControllerUser = require('../controllers/user-controller')

router.post('/register', ControllerUser.register)
router.post('/google-login', ControllerUser.googleLogin)
router.post('/login', ControllerUser.login)



module.exports = router