const axios = require('axios')

class WeatherController{
  static getWeather (req, res){
    const ACCESS_KEY = process.env.ACCESS_KEY_WEATHERSTACK
    let { city } = req.query
    axios({
      method: "get",
      url: `http://api.weatherstack.com/current?access_key=${ACCESS_KEY}&query=Jakarta`,
    })
    .then(response => {
      let { data } = response
      if(data.success == false){
        return res.status(data.error.code).json(data.error.info)
      }
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json({msg : 'Internal Server Error'})
    })
  }
}

module.exports = WeatherController