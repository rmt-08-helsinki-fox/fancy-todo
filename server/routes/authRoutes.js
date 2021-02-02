const router = require('express').Router();
const AuthController = require('../controller/authController');

router.post('/registration', AuthController.registration);
router.post('/login', AuthController.login);


module.exports = router