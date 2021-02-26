const router = require("express").Router();
const { UserController } = require("../controllers");

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/loginWithGoogle/:google_token', UserController.loginWithGoogle)

module.exports = router;
