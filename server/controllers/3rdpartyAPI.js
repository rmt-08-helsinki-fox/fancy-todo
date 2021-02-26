const axios = require('axios')
const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY

class ThirdPartyAPI {
  static getWeather (req, res, next) {
    axios({
      method: 'GET',
      url: `http://api.openweathermap.org/data/2.5/weather?q=Jakarta&appid=${OPEN_WEATHER_API_KEY}`
    })
      .then(response => {
        res.status(200).json(response.data)
      })
      .catch(err => {
        next(err);
      })
  }
}

module.exports = ThirdPartyAPI