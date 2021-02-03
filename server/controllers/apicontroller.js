const axios = require("axios").default

class ApiController {
    static checkWeather(req, res, next) {
        axios.get("https://api.openweathermap.org/data/2.5/weather?q=surabaya&appid=538ef4d63afd919c0b6c68dc287a89d3")
        .then(response => {
            let weather
            for (let i = 0; i < response.data.weather.length; i++) {
                weather = response.data.weather[i].main
            }
            res.status(200).json({weather})
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = ApiController 