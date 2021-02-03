const express = require('express')
const router = express.Router()
const ToDoController = require('../controllers/ToDoController.js')

const authenticate = require('../middlewares/authenticate.js')
const authorize = require('../middlewares/authorize.js')

router.use(authenticate)
router.post("/", ToDoController.createToDo)

router.get("/", ToDoController.getAll)

router.get("/:id", authorize, ToDoController.getById)

router.put("/:id", authorize, ToDoController.editAllFieldById)

router.patch("/:id", authorize, ToDoController.editSpecificFieldById)

router.delete("/:id", authorize, ToDoController.deleteById)

module.exports = router