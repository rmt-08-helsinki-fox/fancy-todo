const express = require('express')
const router = express.Router()
const ToDoController = require('../controllers/ToDoController.js')

router.post("/", ToDoController.createToDo)

router.get("/", ToDoController.getAll)

router.get("/:id", ToDoController.getById)

router.put("/:id", ToDoController.editAllFieldById)

router.patch("/:id", ToDoController.editSpecificFieldById)

router.delete("/:id", ToDoController.deleteById)

module.exports = router