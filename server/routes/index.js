const express = require('express')
const app = express()
const todo = require('./todo')
const user = require('./user')
const router = express.Router()

app.use('/user', user)

app.use('/todo', todo)

module.exports = router