const router = require("express").Router();
const UserController = require("../controllers/userController");
const { route } = require("./todoRouter");

router.post("/register", UserController.register);

router.post("/login", UserController.login);

router.post("/google-signin", UserController.googleSignIn);

module.exports = router;
