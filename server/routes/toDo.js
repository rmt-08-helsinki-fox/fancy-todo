//@ts-check
const express = require("express")
const router = express.Router()

const ToDoController = require("../controllers/toDoController")

const { authenticate } = require("../middlewares/authenticate")
const { authorize } = require("../middlewares/authorize")

router.use(authenticate)
// ? 1. Create ToDo
router.post("/", ToDoController.create)
// ? 2. Read ToDo
router.get("/", ToDoController.read)

// ? 3. Get ToDo by id
router.get("/:id", authorize, ToDoController.findById)
// ? 4. Update ToDo (using put)
router.put("/:id", authorize, ToDoController.updatePut)
// ? 5. Update ToDo (using patch)
router.patch("/:id", authorize, ToDoController.updatePatch)
// ? 6. Delete ToDo
router.delete("/:id", authorize, ToDoController.destroy)

module.exports = router
