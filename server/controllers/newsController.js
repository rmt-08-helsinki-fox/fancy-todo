const Axios = require('axios')

class NewsController {
    static async newsIndo(req, res, next) {
        try {
            let URL = 'http://newsapi.org/v2/top-headlines?country=id&apiKey='
            let APIKEY = process.env.NEWS_API_KEY

            let response = await Axios.get(URL + APIKEY)
            // console.log(response)

            return res.json(response.data.articles)
        } catch (err) {
            console.log(err)
            return next(err)
        }
    }

    static async newsCategory(req, res, next) {
        try {
            let APIKEY = process.env.NEWS_API_KEY
            let category = req.params.category
            // business entertainment health science sports technology
            let URL = `http://newsapi.org/v2/top-headlines?country=id&category=${category}&apiKey=${APIKEY}`

            console.log('>>> category : ', category)
            console.log('>>> URL : ', URL)

            let response = await Axios.get(URL)
            // console.log(response)

            return res.json(response.data.articles)
        } catch (err) {
            console.log(err)
            return next(err)
        }
    }
}

module.exports = NewsController