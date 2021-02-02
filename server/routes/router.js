const express = require('express')
const router = express.Router()
const todos = require('./todo')
const users = require('./user')

router.use('/todos', todos)
router.use('/', users)

module.exports = router