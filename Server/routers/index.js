const express = require('express')
const router = express.Router()
const ControllerUser = require('../controller/controllerUser')

router.get('/todos', ControllerUser.listTodo)
router.post('/todos', ControllerUser.addTodo)
router.get('/todos/:id', ControllerUser.getById)
router.put('/todos/:id', ControllerUser.editTodo)
router.patch('/todos/:id', ControllerUser.updateStatus)
router.delete('/todos/:id', ControllerUser.deleteTodo)
module.exports = router