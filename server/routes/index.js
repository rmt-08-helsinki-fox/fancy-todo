const Controller = require('../controllers/controller')
const todoRouter = require('./todo')
const userRouter = require('./user')
const router = require('express').Router()

router.get('/', Controller.homePage)
router.use('/todos', todoRouter)
router.use('/user', userRouter)

module.exports = router