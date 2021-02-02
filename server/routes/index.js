const express = require('express')
const router = express.Router()
const todos = require('./todos')
const UserController = require('../controllers/userController')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.use('/todos', todos)

module.exports = router