const axios = require('axios');

class ThirdPartyAPI{
  static getCurrWeather(req,res,next){
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=bandung&appid=${process.env.WEATHER_API_KEY}`
      )
      .then(data => {
        res.status(200).json(data.data.weather)
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = ThirdPartyAPI