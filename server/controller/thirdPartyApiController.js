const axios = require('axios')

class ThirdPartyApiController {
    static weather(req, res, next) {
        axios.get(`http://api.weatherstack.com/current?access_key=${process.env.YOUR_ACCESS_KEY}&query=Tangerang Selatan`)
            .then(response => {
                res.status(200).json(response.data)
            })
            .catch(err=>{
                next(err)
            })
        }

    }

module.exports = ThirdPartyApiController