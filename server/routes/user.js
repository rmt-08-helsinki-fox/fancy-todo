//@ts-check
const express = require("express")
const router = express.Router()

const UserController = require("../controllers/userController")

router.post("/register", UserController.register)
router.post("/login", UserController.login)
// ? GoogleLogin
router.post("/googleLogin", UserController.googleLogin)

module.exports = router
