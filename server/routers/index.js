const express = require("express")
const router = express.Router()
const todo = require("./todo-router")
const user = require("./user-router")

router.use("/todos", todo)
router.use("/users", user)

module.exports = router