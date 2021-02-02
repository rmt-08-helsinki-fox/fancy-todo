const router = require('express').Router () 
const Controller = require('../controllers/todos')

router.post ('/todos', Controller.addTodo)  
router.get('/todos',Controller.showTodos)
router.get('/todos/:id',Controller.findOneById)
router.put('/todos/:id',Controller.update)
router.patch('/todos/:id',Controller.changeStatus) 
router.delete('/todos/:id',Controller.delete)

module.exports = router