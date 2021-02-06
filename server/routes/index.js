const express = require("express")
const router = express.Router()
const todo = require('./todo.js')
const user = require('./user.js')

router.use('/', user)
router.use('/todos', todo)


module.exports = router