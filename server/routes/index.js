const Controller = require('../controllers/controller')
const todoRouter = require('./todo')
const router = require('express').Router()

router.get('/', Controller.homePage)
router.use('/todos', todoRouter)

module.exports = router