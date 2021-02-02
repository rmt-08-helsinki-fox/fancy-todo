const axios = require('axios');

class WeatherController{
  static getCurrWeather(req,res,next){
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=bandung&appid=43a1a0c6012ab55add13f5614df59ea2"
      )
      .then(data => {
        res.status(200).json(data.weather)
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = WeatherController