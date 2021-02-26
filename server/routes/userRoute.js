const router = require('express').Router()
const UserController = require('../controllers/userController')
const ApiController = require('../controllers/apiController')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googlelogin', UserController.login)
router.get('/weather/:city', ApiController.getWeather)

module.exports = router