const router = require('express').Router()
const todos = require('./todo')
const users = require('./user')

router.use('/todos', todos)
router.use('/users', users)

module.exports = router