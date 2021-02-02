const router = require('express').Router();

const UserController  = require('../controller/userController');


router.post('/register', UserController.postRegister);
router.post('/login', UserController.postLogin);

module.exports = router;