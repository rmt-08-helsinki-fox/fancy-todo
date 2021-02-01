const express = require('express');
const router = express.Router()
const todoController = require("../controllers/todoController.js")

router.get('/todos', todoController.getToDos)
router.post('/todos', todoController.addToDos)

// router.get('/todos/:id')

// router.put('/todos/:id')

// router.patch('/todos/:id')

// router.patch('/todos/:id')

module.exports = router