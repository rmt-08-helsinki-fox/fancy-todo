const express = require("express")
const router = express.Router()
const UserControll = require("../controllers/userControll")

router.post("/register", UserControll.register)
router.post("/login", UserControll.login)

router.post("/loginGoogle", UserControll.loginGoogle)

module.exports = router