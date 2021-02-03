const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/register", UserController.postUserRegister);
router.post("/login", UserController.postUserLogin)

module.exports = router;
