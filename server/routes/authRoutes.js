const router = require('express').Router();
const AuthController = require('../controller/authController');

router.post('/registration', AuthController.registration);
router.post('/login', AuthController.login);
router.post('/loginOauth', AuthController.oauthGoogleLogin);


module.exports = router