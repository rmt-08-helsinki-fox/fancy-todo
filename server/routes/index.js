const express = require('express')
const app = express()
const userRouter = require('./userRouter')
const todoRouter = require('./todoRouter')
const weatherRouter = require('./weatherRouter')
const { authentication } = require('../middlewares/auth')

app.use('/user', userRouter)
app.use(authentication)
app.use('/todos',todoRouter)
app.use('/weather', weatherRouter)

module.exports = app