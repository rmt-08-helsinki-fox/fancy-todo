const express = require('express')
const router = express.Router()
const todos = require('./todos.js')
const users = require('./users.js')
const randomQuotes = require('./randomQuotes.js')

router.use("/todos", todos)

router.use("/users", users)

router.use("/quotes", randomQuotes)

module.exports = router