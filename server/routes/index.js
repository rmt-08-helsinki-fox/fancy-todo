const express = require('express');
const router = express.Router()

const userRouter = require('./user')
const todoRouter = require('./todo')

router.use('/todos', todoRouter)

router.use('/register', userRouter)

module.exports = router