const route = require('express').Router()
const todoRouter = require('./todo')
const userRouter = require('./user')

route.use('/todos', todoRouter)
route.use('/users', userRouter)

module.exports = route