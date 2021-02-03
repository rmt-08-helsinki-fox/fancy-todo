const axios = require('axios')

class newsApi {
  static async getData (req, res, next) {
    try {
      let url = `http://newsapi.org/v2/top-headlines?country=id&apiKey=${process.env.API_KEY}`
      let news = await axios.get(url)
      const newsAPi = news.data.articles
      let result = []
      for (let i = 0; i < 3; i++) {
        result.push(newsAPi[i])
      }
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = newsApi