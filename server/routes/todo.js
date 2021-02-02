const TodoController = require("../controller/todoController");
const router = require("express").Router();
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

router.use(authenticate);
router.post("/", TodoController.postTodos);
router.get("/", TodoController.getTodos);
router.get("/:id",authorize, TodoController.getTodoById);
router.put("/:id", authorize, TodoController.putTodoById);
router.patch("/:id", authorize, TodoController.patchTodoById);
router.delete("/:id", authorize, TodoController.delTodoById);
router.get("/weather", TodoController.getWeather);

module.exports = router;
