const express = require('express')
const router = express()
const todos = require('./todos')

router.use('/todos',todos)

module.exports = router