const express = require('express');
const router = express.Router();
const WeatherController = require('../controllers/weatherController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.use(authentication);

router.post('/:id', authorization, WeatherController.postForecastWeather);

module.exports = router;