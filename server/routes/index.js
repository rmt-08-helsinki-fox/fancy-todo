const express = require('express')
const router = express.Router()
const todo = require('./todoRouter.js')
const user = require('./userRouter')

router.use('/todos', todo)
router.use('/', user)

module.exports = router