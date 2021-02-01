const router = require('express').Router()
const TodoController = require('../controllers/TodoController')

router.get('/', (req, res) => {
  res.send('tos')
})

router.post('/todos', TodoController.postNewTodo)
router.get('/todos', TodoController.getAllTodos)
router.put('/todos/:id', TodoController.updateTodo)
router.patch('/todos/:id', TodoController.patchTodo)
router.delete('/todos/:id', TodoController.deleteTodo)

module.exports = router