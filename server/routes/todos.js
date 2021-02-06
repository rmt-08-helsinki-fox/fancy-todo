const router = require('express').Router();
const TodoController = require('../controllers/todoController')
const {authorize} = require('../middlewares/auth')
const ApiController = require('../controllers/apiController')

router.get("/quote", ApiController.categoryQuote)
router.get("/", TodoController.getTodo)
router.post("/", TodoController.postTodo)

router.use("/:id", authorize)
router.get("/:id", TodoController.getTodoById)
router.put("/:id", TodoController.putTodo)
router.patch("/:id", TodoController.patchTodo)
router.delete("/:id", TodoController.deleteTodo)

module.exports= router