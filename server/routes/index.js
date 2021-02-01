// const express = require('express')
// const router = express.Router()
const router = require('express').Router()
const todosRouter = require('./todoRouter')
const userRouter = require('./userRouter')


router.use('/todos', todosRouter)
router.use('/users', userRouter)

module.exports = router