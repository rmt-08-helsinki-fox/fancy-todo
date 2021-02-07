const axios = require('axios') 

class WeatherController { 
    static getTodayWeather (req,res,next) { 
        const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_ACCESS_KEY}&query=Jakarta`
        axios 
            .get(url) 
            .then((response) => { 
                let arr = [] 
                let newStatus = response.status  
                if (newStatus !== 200) { 
                    throw { 
                        name : 'WeatherError',
                        status : newStatus,
                        msg : response.statusText
                    }
                }
                let obj = { 
                    location : response.data.location.name,
                    time : response.data.location.localtime,
                    temperature : response.data.current.temperature,
                    icons : response.data.current.weather_icons,
                    descriptions : response.data.current.weather_descriptions
                }
                arr.push(obj)
                res.status(newStatus).json(arr)
            }) 
            .catch((err) => { 
                console.log(err,'ini err di WeatherController getTodayWeather ')
                next(err)
            })
    }
} 

module.exports = WeatherController 
