const axios = require('axios')

class WeatherController {
    static showWeather(req, res, next) {
        const apiKey = process.env.WEATHER_KEY
        const url = `http://api.openweathermap.org/data/2.5/weather?q=Bandung&appid=${apiKey}`
        axios({
            method: 'GET',
            url: url
        })
        .then(data => {
            // console.log(data, '<<<<<');
            let output = {
                name: data.data.name,
                icon: data.data.weather[0].icon,
                description: data.data.weather[0].description,
                temp: data.data.main.temp
            }
            // console.log(output, '<<<<<<<');
            res.status(200).json(output)
        })
        .catch(err => next({status: 404}))
    }
}

module.exports = WeatherController