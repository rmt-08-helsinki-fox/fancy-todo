//@ts-check
const express = require("express")
const router = express.Router()

const Controller = require("../controllers/toDoController")

const { authenticate } = require("../middlewares/authenticate")
const { authorize } = require("../middlewares/authorize")

router.use(authenticate)
// ? 1. Create ToDo
router.post("/", Controller.create)
// ? 2. Read ToDo
router.get("/", Controller.read)

// ? 3. Get ToDo by id
router.get("/:id", authorize, Controller.findById)
// ? 4. Update ToDo (using put)
router.put("/:id", authorize, Controller.updatePut)
// ? 5. Update ToDo (using patch)
router.patch("/:id", authorize, Controller.updatePatch)
// ? 6. Delete ToDo
router.delete("/:id", authorize, Controller.destroy)

module.exports = router
