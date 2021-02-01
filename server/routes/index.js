const express = require('express')
const app = express()
const userRouter = require('./userRouter')
const todoRouter = require('./todoRouter')

app.use('/user', userRouter)
app.use('/todos', todoRouter)

module.exports = app