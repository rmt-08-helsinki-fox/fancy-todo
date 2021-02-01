const router = require('express').Router()
const todoRouter = require('./todo')
const userRouter = require('./user')
const HomeController = require('../controllers/HomeController')

router.get('/', HomeController.showAllTodosPublic)

router.use('/todos', todoRouter)

router.use('/users', userRouter)


module.exports = router