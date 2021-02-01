const router = require('express').Router()
const TodoController =  require('../controllers/todoController')

router.get('/', TodoController.viewAll)

router.post('/', TodoController.create)

router.get('/:id', TodoController.viewById)

module.exports = router