const router = require('express').Router()
const TodoController =  require('../controllers/todoController')
const {authentication} = require('../middlewares/authentication')
const {authorization} =require('../middlewares/authorization')

router.use(authentication)
router.use(authorization)

router.post('/', TodoController.create)

router.get('/', TodoController.viewAll)

router.get('/:id', TodoController.viewById)

router.put('/:id', TodoController.update)

router.patch('/:id', TodoController.updateStatus)

router.delete('/:id', TodoController.delete)

module.exports = router