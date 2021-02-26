const { User } = require('../models/index')
const axios = require('axios')

class ApiController {
  static getWeather(req, res, next) {
    const citySelected = req.params.city
    console.log(citySelected)
    User.findOne({
      where: {
        city: citySelected
      }
    })
      .then(() => {
        return axios({
          method: 'GET',
          url: `https://api.weatherbit.io/v2.0/forecast/daily?city=${citySelected}&key=${process.env.APIKEY_WEATHER}&include=minutely`
        })
      })
      .then(dataWeather => {
        res.status(200).json(dataWeather.data)
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }
}

module.exports = ApiController