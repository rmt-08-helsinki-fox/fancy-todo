const routes = require('express').Router()
const todos = require('./todo')

routes.use('/todos', todos)

module.exports = routes