const router = require('express').Router()
const todos = require('./todos')
const users = require('./users')

router.use('/users', users)
router.use('/todos', todos)


module.exports = router;