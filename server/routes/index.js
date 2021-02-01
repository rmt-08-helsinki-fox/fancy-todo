const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/TodoController')

router.get('/', TodoController.test)

module.exports = router