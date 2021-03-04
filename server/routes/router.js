const express = require('express')
const router = express()
const todos = require('./todos')
const user = require('./user')

router.use('/todos',todos)
router.use('/users',user)

module.exports = router