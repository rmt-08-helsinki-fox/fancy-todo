const axios = require('axios').default

class WeatherController{

    static getWeather(req,res,next){
        let weather = {
            method: 'GET',
            url: 'http://api.weatherstack.com/current?access_key=7ad2f0064d52f415536ad4a1795e0fc9&query=Indonesia'
        }
        axios.request(weather)
        .then(data => {
            let aboutWeather = {
                location: data.data.location,
                currenct: data.data.current
            }
            res.status(200).json(aboutWeather)
        }).catch(err=>{
            console.log(err)
            next(err)
        })
    }

}

module.exports = WeatherController