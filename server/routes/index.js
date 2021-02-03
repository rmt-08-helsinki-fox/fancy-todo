const Controller = require('../controllers/controller')
const todoRouter = require('./todo')
const userRouter = require('./user')
const Qur_anRouter = require('./Qur_an')
const router = require('express').Router()

router.get('/', Controller.homePage)
router.use('/todos', todoRouter)
router.use('/user', userRouter)
router.use('/Qur-an', Qur_anRouter)

module.exports = router