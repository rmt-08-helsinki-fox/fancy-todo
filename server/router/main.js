const express = require("express");
const router = express.Router();
const todos = require("./todo")
const user = require("./user")

router.use("/todos", todos)
router.use("/users", user)

module.exports = router
