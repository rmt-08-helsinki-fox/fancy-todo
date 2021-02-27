const axios = require('axios');


class WeatherController {
  static weather(req, res, next) {

    const city = req.decoded.city;
    const secret = process.env.WEATHER_ACCESS_KEY;

    axios
    .get(`http://api.weatherstack.com/current?access_key=${secret}&query=${city}`)
      .then((response) => {
        res.status(200).json(response.data)
      })
      .catch((err) => {
        console.log(err, 'weaher ==========================');
        next(err);
      })
  }
}


module.exports = WeatherController;