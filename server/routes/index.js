const Controller = require('../controllers/controller')
const todoRouter = require('./todo')
const userRouter = require('./user')
const newsRouter = require('./news')
const router = require('express').Router()

router.get('/', Controller.homePage)
router.use('/todos', todoRouter)
router.use('/', userRouter)
router.use('/news', newsRouter)

module.exports = router