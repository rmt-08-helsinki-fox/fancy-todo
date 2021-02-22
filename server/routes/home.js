const router = require('express').Router()
const HomeController = require('../controllers/homeController')

router.use('/', HomeController.showHome)

module.exports = router