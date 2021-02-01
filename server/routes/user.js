const router = require('express').Router();

const UserController  = require('../controller/userController');


router.get('/register', UserController.getRegister)

module.exports = router;