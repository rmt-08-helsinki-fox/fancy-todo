const express = require('express')
const router = express.Router()
const TodosController = require('../controller/todos-controller')

// ============= add todo================
router.post('/', TodosController.createTodo)

// ============== read todo ===========
router.get('/', TodosController.readTodo)

// =========== read todo by id ===========
router.get('/:id', TodosController.readTodoById)

// =============== edit todo all fields ============
router.put('/:id', TodosController.editTodoAllFields)

// ===== edit todo per fields ============
router.patch('/:id', TodosController.editTodoPerFields)

// ============ delete todo ==========
router.delete('/:id', TodosController.deleteTodo)

module.exports = router