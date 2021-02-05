const router = require('express').Router () 
const TodosController = require('../controllers/todosController')
const authorization = require('../middlewares/authorization')

router.post ('/', TodosController.addTodo)  
router.get('/',TodosController.showTodos) 
router.get('/:id',authorization,TodosController.findOneById)
router.put('/:id',authorization,TodosController.update)
router.patch('/:id',authorization,TodosController.changeStatus) 
router.delete('/:id',authorization,TodosController.delete)

module.exports = router