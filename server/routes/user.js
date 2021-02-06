const router = require('express').Router();
const userController = require('../controllers/userControler')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/googleLogin',userController.oAuthLogin)

module.exports = router