const todos = require('express').Router()
const todoController = require('../controller/todos')

// todos.get('/', (req, res) => {
//     res.send("from todos")
// })

todos.post('/', todoController.createTodo)

todos.get('/', todoController.readAll)
todos.get('/:id', todoController.readById)
todos.put('/:id', todoController.putTodo)
todos.patch('/:id', todoController.patchTodo)
todos.delete('/:id', todoController.deleteTodo)


module.exports = todos