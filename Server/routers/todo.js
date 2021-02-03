const express = require('express')
const router = express.Router()
const ControllerTodo = require('../controller/controllerTodo')
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')

router.get('/calendar', ControllerTodo.seeCalendar)

router.use(authenticate)
router.get('/', ControllerTodo.listTodo)
router.post('/', ControllerTodo.addTodo)
router.use(authorize)
router.get('/:id', ControllerTodo.getById)
router.put('/:id', ControllerTodo.editTodo)
router.patch('/:id', ControllerTodo.updateStatus)
router.delete('/:id', ControllerTodo.deleteTodo)

module.exports = router