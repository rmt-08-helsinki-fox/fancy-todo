const axios = require('axios')

class newsApi {
  static async getData (req, res, next) {
    try {
      let url = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${process.env.API_KEY}`
      let news = await axios.get(url)

      res.status(200).json(news.data.articles)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = newsApi