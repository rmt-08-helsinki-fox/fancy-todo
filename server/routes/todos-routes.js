const express = require('express')
const router = express.Router()
const TodosController = require('../controller/todos-controller')
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')


router.use(authenticate)

// ============= add todo================
router.post('/', TodosController.createTodo)

// ============== read todo ===========
router.get('/', TodosController.readTodo)

// =========== read todo by id ===========
router.get('/:id', authorize, TodosController.readTodoById)

// =============== edit todo all fields ============
router.put('/:id', authorize, TodosController.editTodoAllFields)

// ===== edit todo per fields ============
router.patch('/:id', authorize, TodosController.updateStatusById)

// ============ delete todo ==========
router.delete('/:id', authorize, TodosController.deleteTodo)

module.exports = router