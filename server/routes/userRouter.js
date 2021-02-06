const express = require("express");
const router = express.Router();
const controllers = require("../controllers/userControllers");

router.post("/register", controllers.register);
router.post("/login", controllers.login);
router.post("/login/google", controllers.googleLogin)
router.get("/user", controllers.getUser);

module.exports = router;
