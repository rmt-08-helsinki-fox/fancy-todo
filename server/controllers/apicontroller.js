const axios = require("axios").default

class ApiController {
    static getWeather(req, res, next) {
        axios.get("https://api.openweathermap.org/data/2.5/weather?q=tangerang&appid=538ef4d63afd919c0b6c68dc287a89d3")
        .then(response => {
            let mainWeather
            let weatherDesc
            for (let i = 0; i < response.data.weather.length; i++) {
                mainWeather = response.data.weather[i].main
                weatherDesc = response.data.weather[i].description
            }
            res.status(200).json({mainWeather, weatherDesc})
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = ApiController