const express = require('express')
const {Authentication} = require('../middlewares/Authentication')
const {TodoAuthorization} = require('../middlewares/Authorization')
const {TodoController} = require('../controllers')

const RouterTodo = express.Router()

RouterTodo.use(Authentication)
RouterTodo.post('/', TodoController.addTodo)
RouterTodo.get('/', TodoController.read)

// RouterTodo.use(TodoAuthorization)
RouterTodo.get('/:id', Authentication, TodoAuthorization, TodoController.readById)
RouterTodo.put('/:id', Authentication, TodoAuthorization, TodoController.editWhole)
RouterTodo.patch('/:id', Authentication, TodoAuthorization, TodoController.edit)
RouterTodo.delete('/:id', Authentication, TodoAuthorization, TodoController.delete)


module.exports={
    RouterTodo
}