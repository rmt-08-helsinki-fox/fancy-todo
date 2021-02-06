const express = require('express')
const {Authentication} = require('../middlewares/Authentication')
// const {TodoAuthorization} = require('../middlewares/Authorization')
const {BreweryController} = require('../controllers')

const RouterBrewery = express.Router()

// RouterBrewery.use(Authentication)

RouterBrewery.get('/list', BreweryController.getRandomList)

// RouterTodo.post('/', TodoController.addTodo)
// RouterTodo.get('/', TodoController.read)

// RouterTodo.use("/:id",TodoAuthorization)
// RouterTodo.get('/:id', TodoController.readById)
// RouterTodo.put('/:id', TodoController.editWhole)
// RouterTodo.patch('/:id', TodoController.edit)
// RouterTodo.delete('/:id', TodoController.delete)


module.exports={
    RouterBrewery
}