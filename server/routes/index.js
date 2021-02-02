const router = require('express').Router()
const todoRoute = require('../routes/todo')
const userRoute = require('../routes/user')
const HomeController = require('../controllers/homeController')

router.use('/todos', todoRoute)
router.use('/users', userRoute)
router.use('/', HomeController.showHome)

module.exports = router