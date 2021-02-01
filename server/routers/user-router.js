const express = require("express")
const router = express.Router()
const UserControll = require("../controllers/userControll")

router.post("/register", UserControll.register)
router.post("/login", UserControll.login)

module.exports = router