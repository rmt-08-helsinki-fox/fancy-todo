
const router = require('express').Router()
const ToDoController = require("../controllers/todoController.js")
const authenticate = require("../middlewares/authenticate")
const authorize = require("../middlewares/authorize")

// authenticate
router.use(authenticate)
router.get('/', ToDoController.getToDos)
router.post('/', ToDoController.addToDos)
router.get('/weather', ToDoController.todayWeather)

//authorize
router.use('/:id', authorize)
router.get('/:id', ToDoController.getId)
router.put('/:id', ToDoController.updateToDos)
router.patch('/:id', ToDoController.patchToDos)
router.delete('/:id', ToDoController.destroyToDos)

module.exports = router