const axios = require("axios");
const { response } = require("express");
const http = require("https")

class WeatherController {
  //weatherstack.com
  static showWeather(req, res, next) {
    const ACCESS_KEY = process.env.ACCESS_KEY

    axios.get(`http://api.weatherstack.com/current?access_key=${ACCESS_KEY}&query=${req.query.query}`)
    .then(response => {
      const apiResponse = response.data;
      if (apiResponse.success === false) {
        throw {name: 'MissingDataError', message: apiResponse.error}
      } else {
        // console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
        res.status(200).json(apiResponse)
      }
    })
    .catch(err => {
      next(err)
    })
  }


  //masih coba-coba
  static showLocation(req, res) {
    var options = {
      "method": "GET",
      "hostname": "freegeoip.app",
      "port": null,
      "path": "/json/",
      "headers": {
        "accept": "application/json",
        "content-type": "application/json"
      }
    };
    let data;
    var req = http.request(options, function (res) {
      var chunks = [];
    
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
    
      res.on("end", function () {
        var body = Buffer.concat(chunks);
        // console.log(body)
        data = JSON.parse(body.toString())
        console.log(data)
        // console.log(body.toString());
      });
    });
    
    res.status(200).json(data)
    req.end();
  }
}

module.exports = WeatherController;