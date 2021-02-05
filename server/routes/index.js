const routes = require('express').Router()
const todos = require('./todo')
const users = require('./user')


routes.use('/todos', todos)
routes.use('/users', users)

module.exports = routes