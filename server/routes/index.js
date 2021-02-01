const express = require('express');
const router = express.Router()

const userRouter = require('./user')
const todoRouter = require('./todo')

router.use('/todos', todoRouter)

router.use('/users', userRouter)

module.exports = router