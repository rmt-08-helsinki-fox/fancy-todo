const router = require('express').Router()
const todo = require('./todo')
const user = require('./user')
const DashboardController = require('../controllers/DashboardController')

router.get('/calender', DashboardController.calender)

router.get('/covid', DashboardController.covid)

router.get('/nyt', DashboardController.newyorktimes)

router.get('/weather', DashboardController.weather)

router.get('/bmkg', DashboardController.bmkg)

router.use('/users', user)

router.use('/todos', todo)

module.exports = router