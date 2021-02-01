const express = require('express')
const router = express.Router()
const TodoRouter = require('./todoRoute')
const UserRouter = require('./UserTodo')


router.use('/users',UserRouter)

router.use('/todos',TodoRouter)









module.exports= router