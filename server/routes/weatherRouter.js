const app = require('express').Router()
const WeatherContoller = require('../controller/weatherController')

app.get('/', WeatherContoller.getWeather)

module.exports = app