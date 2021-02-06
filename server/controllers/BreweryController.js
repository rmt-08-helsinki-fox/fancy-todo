const axios = require('axios')

class BreweryController {
    static getRandomList(req, res, next){
        axios({
            method: 'GET',
            url: 'https://api.openbrewerydb.org/breweries'
        })
        .then((result)=>{
            console.log(result)
            res.status(200).json(result.data)
        })
        .catch((err)=>{
            next({name: 'BREWERY_ERROR'})
        })
    }
}

module.exports={
    BreweryController
}