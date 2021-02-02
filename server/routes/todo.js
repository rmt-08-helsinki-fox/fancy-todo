const router = require('express').Router()
const TodoController = require('../controller/TodoController')
const authencicate = require('../middleware/authencicate')
const authorize = require('../middleware/authorize')



router.use(authencicate)
router.post('/',TodoController.addTodo)
router.get('/',TodoController.getList)

router.get('/:id',authorize,TodoController.getData)
router.put('/:id',authorize,TodoController.updateData)
router.patch('/:id',authorize,TodoController.updateStatus)
router.delete('/:id',authorize,TodoController.deletedData)


module.exports = router