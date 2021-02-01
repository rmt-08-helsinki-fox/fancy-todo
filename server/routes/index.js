const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/todoController')

router.post('/todos', (req, res) => {
  TodoController.createTodos(req.body, res)
})

router.get('/todos', (req, res) => {
  TodoController.findTodos(res)
})

router.get('/todos/:id', (req, res) => {
  TodoController.findTodosById(req.params.id, res)
})

router.put('/todos/:id', (req, res) => {
  TodoController.editTodos(req.params.id, req.body, res)
})

router.patch('/todos/:id', (req, res) => {
  TodoController.editStatusTodos(req.params.id, req.body, res)
})

router.delete('/todos/:id', (req, res) => {
  TodoController.deleteTodo(req.params.id, res)
})

module.exports = router