const router = require("express").Router();
const { TodoController } = require("../controllers");

router.route("/").get(TodoController.showAll).post(TodoController.add);
router.route("/:id")
  .get(TodoController.showById)
  .put(TodoController.update)
  .patch(TodoController.updateStatus)
  .delete(TodoController.delete)

module.exports = router;
