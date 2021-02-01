const express = require('express')
const router = express.Router()
const Controller = require('../controller/controller')

router.get('/todos', Controller.listTodo)
router.post('/todos', Controller.addTodo)
router.get('/todos/:id', Controller.getById)

module.exports = router