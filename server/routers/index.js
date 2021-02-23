const router = require('express').Router()
const todoRouter = require('./todo')
const userRouter = require('./user')
const TodoController = require('../controllers/todoController')

router.get('/song', TodoController.getSong)
router.use('/todos', todoRouter)
router.use('/users', userRouter)

module.exports = router