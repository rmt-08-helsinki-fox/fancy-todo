const express = require('express')
const router = express.Router()
const routerTodo = require('./todo')
const routerUser = require('./user')

router.use('/todos', routerTodo)
router.use('/users', routerUser)

module.exports = router