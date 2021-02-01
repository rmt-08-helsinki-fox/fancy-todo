const router = require('express').Router();
const AuthController = require('../controller/authController');

router.post('/auth/registration', AuthController.registration);
router.post('/auth/login', AuthController.login);


module.exports = router