const router = require('express').Router()
const todoRouter = require('./todo')
const userRouter = require('./user')
const HomeController = require('../controllers/HomeController')
const authenticate = require('../middleware/authenticate')

router.use('/users', userRouter)

router.use(authenticate)

router.get('/', HomeController.showAllTodosPublic)

router.use('/todos', todoRouter)


module.exports = router