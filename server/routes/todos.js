const router = require('express').Router();
const TodoController = require('../controllers/todoController')
const {authorize} = require('../middlewares/auth')
const ApiController = require('../controllers/apiController')

router.get("/quotes", ApiController.categoryQuote)
router.get("/", TodoController.getTodo)
router.post("/", TodoController.postTodo)

router.get("/:id", authorize, TodoController.getTodoById)
router.put("/:id", authorize, TodoController.putTodo)
router.patch("/:id", authorize, TodoController.patchTodo)
router.delete("/:id", authorize, TodoController.deleteTodo)

module.exports= router