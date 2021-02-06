const axios = require("axios");

class WeatherController {
  //weatherstack.com
  static showWeather(req, res, next) {
    console.log("masuk")
    const { city } = req.body
    console.log(req.body)
    const ACCESS_KEY = process.env.ACCESS_KEY

    axios.get(`http://api.weatherstack.com/current?access_key=${ACCESS_KEY}&query=${city}`)
    .then(response => {
      const apiResponse = response.data;
      if (apiResponse.success === false) {
        throw {name: 'MissingDataError', message: apiResponse.error}
      } else {
        console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
        let data = {
          city: apiResponse.location.name,
          temperature: apiResponse.current.temperature,
          icons: apiResponse.current.weather_icons,
          description: apiResponse.current.weather_descriptions[0]
        }
        res.status(200).json(data)
      }
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }
}

module.exports = WeatherController;