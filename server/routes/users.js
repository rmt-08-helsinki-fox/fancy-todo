const express = require('express');
const UserController = require('../controllers/user');
const router = express.Router();


router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/googleLogin', UserController.googleLogin);


module.exports = router;