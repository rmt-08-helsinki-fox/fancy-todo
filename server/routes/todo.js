const router = require("express").Router();
const { TodoController } = require("../controllers");

router.get("/", TodoController.showAll);
router.post("/", TodoController.add);
router.get("/:id", TodoController.showById);
router.put("/:id", TodoController.update);
router.patch("/:id", TodoController.updateStatus);
router.delete("/:id", TodoController.delete);

module.exports = router;
