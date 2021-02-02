const router = require("express").Router()
const TodoController = require("../controllers/TodoController")
const aunthetication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(aunthetication)
router.get("/",TodoController.showTodo)
router.post("/",TodoController.postTodo)
router.get("/:id", authorization, TodoController.getTodoId)
router.put("/:id", authorization, TodoController.putTodo)
router.patch("/:id", authorization, TodoController.patchTodo)
router.delete("/:id", authorization, TodoController.deleteTodo)

module.exports = router