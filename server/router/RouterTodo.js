const express = require('express')
const {Auth} = require('../Auth')
const {TodoController} = require('../controllers')

const RouterTodo = express.Router()

RouterTodo.post('/', TodoController.addTodo)
RouterTodo.get('/', TodoController.read)
RouterTodo.get('/:id', TodoController.readById)
RouterTodo.put('/:id', TodoController.editWhole)
RouterTodo.patch('/:id', TodoController.edit)
RouterTodo.delete('/:id', TodoController.delete)


module.exports={
    RouterTodo
}