const router = require('express').Router()
const Controller = require('../controllers/userController')
const ApiController = require('../controllers/apiController')

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.get('/weather/:city', ApiController.getWeather)


module.exports = router