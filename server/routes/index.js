const router = require('express').Router()
const Controller = require('../controller/controller')
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')


router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('./googleLogin', Controller.googleLogin)
router.use(authenticate)

router.post('/todos', Controller.postTodos)
router.get('/todos', Controller.getTodos)
router.get('/search', Controller.changeMyFate)

//butuh authorize
// router.use(authorize)
router.get('/todos/:id', authorize, Controller.getTodosById)
router.put('/todos/:id', authorize, Controller.putTodosById)
router.patch('/todos/:id', authorize, Controller.patchTodosById)
router.delete('/delete/:id', authorize, Controller.delTodo)



module.exports = router