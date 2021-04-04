const express = require('express')
const {RouterTodo} = require('./RouterTodo')
const {RouterUser} = require('./RouterUser')
const {RouterBrewery} = require('./RouterBrewery')

const router = express.Router()
router.use('/todos', RouterTodo)
router.use('/',RouterUser)
router.use('/brewery',RouterBrewery)


module.exports={
    router
}