const express = require('express')
const {RouterTodo} = require('./RouterTodo')
const {RouterUser} = require('./RouterUser')

const router = express.Router()
router.use('/todos', RouterTodo)
router.use('/',RouterUser)


module.exports={
    router
}