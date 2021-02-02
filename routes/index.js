const router = require('express').Router()
const Controller = require('../controller/controller')

router.post('/todos', Controller.postTodos)
router.get('/todos', Controller.getTodos)
router.get('/todos/:id', Controller.getTodosById)
router.put('/todos/:id', Controller.putTodosById)
router.patch('/todos/:id', Controller.patchTodosById)
router.post('/register', Controller.register)
router.post('/login', Controller.login)

module.exports = router