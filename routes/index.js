const router = require('express').Router()
const Controller = require('../controller/controller')
const authenticate = require('../middlewares/authenticate')
const authorizeByRole = require('../middlewares/authorize')


router.post('/register', Controller.register)
router.post('/login', Controller.login)

router.use(authenticate)

router.post('/todos', Controller.postTodos)
router.get('/todos', Controller.getTodos)
router.get('/search', Controller.changeMyFate)

//butuh authorize
router.use(authorizeByRole)
router.get('/todos/:id', Controller.getTodosById)
router.put('/todos/:id', Controller.putTodosById)
router.patch('/todos/:id', Controller.patchTodosById)



module.exports = router