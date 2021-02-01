const router = require('express').Router()
const TodosController = require('../controller/todosController')


router.get('/',TodosController.viewTodo)
router.post('/',TodosController.addTodo)
router.get('/:id',TodosController.find)
router.put('/:id',TodosController.update)
router.patch('/:id',TodosController.patch)
router.delete('/:id',TodosController.delete)


module.exports = router