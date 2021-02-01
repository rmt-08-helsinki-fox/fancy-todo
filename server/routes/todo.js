
const router = require('express').Router()
const ToDoController = require("../controllers/todoController.js")

router.get('/', ToDoController.getToDos)

router.post('/', ToDoController.addToDos)
router.get('/:id', ToDoController.getId)
router.put('/:id', ToDoController.updateToDos)
router.patch('/:id', ToDoController.patchToDos)
router.delete('/:id', ToDoController.destroyToDos)

module.exports = router