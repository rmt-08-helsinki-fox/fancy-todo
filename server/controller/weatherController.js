const axios = require('axios')

class WeatherContoller {
  static getWeather(req, res, next) {
    const weather = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=Makassar`

    axios.get(weather)
      .then(response => {
        let currentWeather = {
          location: response.data.location,
          current: response.data.current
        }
        res.status(200).json(currentWeather)
      })
      .catch(err => {
        next(err)
      })
  }

}

module.exports = WeatherContoller