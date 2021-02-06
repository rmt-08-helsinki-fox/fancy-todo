const router = require('express').Router()
const todoController = require('../controller/todoController')
const authenticate = require('../middlewares/authentication')
const authorize = require('../middlewares/authorization')


router.use(authenticate)

router.post('/', todoController.PostAddTodo) //token authenticate

router.get('/', todoController.getTodo) //token authenticate


router.use('/:id',authorize)

router.get('/:id', todoController.findTodo) //authorization

router.put('/:id',  todoController.putTodo) //authorization

router.patch('/:id', todoController.patchTodo) //authorization

router.delete('/:id', todoController.destroyTodo) //authorization

module.exports = router