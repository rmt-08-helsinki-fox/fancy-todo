const express = require('express')
const router = express.Router()
const user = require('./user')
const todo = require('./todo')
const { authenticate } = require('../middleware/auth')
const errHandler = require('../middleware/errorHandler')
const quotes = require('../api/axios')

router.use('/users', user)
router.use(authenticate)
router.get('/quotes', quotes)
router.use('/todos', todo)
router.use(errHandler)

module.exports = router