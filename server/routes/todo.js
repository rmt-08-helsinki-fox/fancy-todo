const router = require('express').Router()
const TodoController = require('../controllers/todoController')

// POST TODOS
router.post('/', TodoController.addTodos)
// GET TODOS
router.get('/', TodoController.getTodos)
// GET TODOS BY ID
router.get('/:id', TodoController.getTodosById)
// PUT TODOS BY ID - UPDATE ALL ROWS
router.put('/:id', TodoController.updateTodosAll)
// PATCH TODOS BY ID - UPDATE SELECTED ROWS
router.patch('/:id', TodoController.updateTodosSelectedRows)
// DELETE TODOS BY ID
router.delete('/:id', TodoController.deleteTodos)

module.exports = router