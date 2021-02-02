const express = require('express')
const router = express.Router()
const todos = require('./todos.js')

router.use("/todos", todos)

module.exports = router