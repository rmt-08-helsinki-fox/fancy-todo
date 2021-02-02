const router = require('express').Router()
const todoRouter = require('./todosRoute')
const userRouter = require('./userRoute')
const authenticate = require('../middlewares/authenticate')

// route user
router.use('/users', userRouter)

// middleware auten
router.use(authenticate)

// route todo
router.use('/todos', todoRouter)

module.exports = router