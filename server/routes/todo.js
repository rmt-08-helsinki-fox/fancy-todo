const router = require("express").Router();
const { TodoController } = require("../controllers");
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

router.use(authenticate) // middleware
router.get("/", TodoController.showAll);
router.post("/", TodoController.add);

router.use("/:id", authorize) // middleware
router.get("/:id", TodoController.showById);
router.put("/:id", TodoController.update);
router.patch("/:id", TodoController.updateStatus);
router.delete("/:id", TodoController.delete);

module.exports = router;
