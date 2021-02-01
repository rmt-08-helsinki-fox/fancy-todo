const router = require('express').Router()
const todos = require('./todos')
const user = require('./')

router.use('/user', user)
router.use('/todos', todos)

module.exports = router