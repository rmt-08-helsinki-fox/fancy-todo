const express = require('express')
const router = express.Router()
const todos = require('./todo')

router.use('/todos', todos)

module.exports = router