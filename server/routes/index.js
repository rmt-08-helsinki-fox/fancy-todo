const express = require('express')
const router = express.Router()
const todoRouter = require('./todos-routes')
const userRouter = require('./users-routes')

router.use('/todos', todoRouter)
router.use('/users', userRouter)


module.exports = router
