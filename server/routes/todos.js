const router = require("express").Router()
const TodoController = require("../controllers/todocontroller")
const authenticate = require("../middlewares/authenticate")
const authorize = require("../middlewares/authorize")

router.use(authenticate)
router.get("/",TodoController.showTodo)
router.post("/",TodoController.postTodo)
// router.use(authorize)
router.get("/:id",authorize,TodoController.getTodo)
router.put("/:id",authorize,TodoController.putTodo)
router.patch("/:id",authorize,TodoController.patchTodo)
router.delete("/:id",authorize,TodoController.deleteTodo)

module.exports = router