const express = require('express')
const router = express.Router()
const todoRouter = require('./todos-routes')
const userRouter = require('./users-routes')

router.use('/users', userRouter)
router.use('/todos', todoRouter)


module.exports = router
