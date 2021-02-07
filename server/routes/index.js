const router = require('express').Router()
const todoRouter = require('./todo')
const userRouter = require('./user')
const { authenticate } = require('../middlewares/auth')

router.use('/', userRouter)
router.use(authenticate)
router.use('/todos', todoRouter)


module.exports = router


