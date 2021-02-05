const express = require('express');
const WeatherController = require('../controllers/weather');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.use(authenticate);

router.get('/', WeatherController.weather);

module.exports = router;
