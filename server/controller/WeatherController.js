const axios = require('axios').default

class WeatherController{

    static getWeather(req,res,next){
        let weather = {
            method: 'GET',
            url: `http://api.weatherstack.com/current?access_key=${process.env.SECRET_KEY}&query=Depok`
        }
        process.env.SECRET_KEY
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