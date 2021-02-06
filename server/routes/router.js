const express = require('express')
const router = express.Router()
const todos = require('./todo')
const users = require('./user')
const Todo = require('../controllers/todoController')
const authenticate = require('../middleware/authenticate')


router.use('/', users)
router.use(authenticate)
router.use('/todos', todos)
router.get('/weather', Todo.getWeather)


module.exports = router