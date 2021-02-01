const router = require('express').Router()
const TodoController = require('../controller/TodoController')

router.post('/',TodoController.addTodo)
router.get('/',TodoController.getList)
router.get('/:id',TodoController.getData)
router.put('/:id',TodoController.updateData)
router.patch('/:id',TodoController.updateStatus)
router.delete('/:id',TodoController.deletedData)


module.exports = router