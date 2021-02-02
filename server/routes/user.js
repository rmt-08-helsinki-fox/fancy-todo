const router = require('express').Router();

const UserController  = require('../controller/userController');


router.get('/register', UserController.getRegister);
router.post('/register', UserController.postRegister);
router.get('/login', UserController.getLogin);
router.post('/login', UserController.postLogin);

module.exports = router;