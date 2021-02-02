const router = require('express').Router()
const TodoRouter = require('./todo')
const UserRouter = require('./user')
const WeatherController = require('../controller/WeatherController')

router.use('/todos',TodoRouter)
router.use('/users',UserRouter)
router.get('/weathers',WeatherController.getWeather)

module.exports = router