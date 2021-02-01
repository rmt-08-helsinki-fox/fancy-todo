const router = require('express').Router()
const Controller = require('../controller/controller')

router.post('/todos', Controller.postTodos)
router.get('/todos', Controller.getTodos)
router.get('/todos/:id', Controller.getTodosById)
router.put('/todos/:id', Controller.putTodosById)
router.patch('/todos/:id', Controller.patchTodosById)


module.exports = router