const express = require("express")
const router = express.Router()
const todo = require('./todo.js')

router.use('/todos', todo)


module.exports = router