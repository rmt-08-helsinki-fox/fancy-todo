const router = require('express').Router();
const Controller = require('../controllers/user.js');

router.post('/register', Controller.postRegister);

router.post('/login', Controller.postLogin)

router.post('/oAuth', Controller.loginGoogle);

module.exports = router;