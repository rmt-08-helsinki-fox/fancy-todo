const express = require('express')
const router = express.Router()
const todos = require('./todos.js')
const users = require('./users.js')

router.use("/todos", todos)

router.use("/users", users)

module.exports = router