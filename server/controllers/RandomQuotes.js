const axios = require('axios')

class RandomQuotes {
  static async getQuote(req, res, next) {
    try {
      const response = await axios({
        method: "GET",
        url: "http://api.forismatic.com/api/1.0/",
        params: {
          method: "getQuote",
          key: 457653,
          format: "json",
          lang: "en"
        }
      })

      if(!response) throw (error)

      res.status(200).json({
        randomQuote: response.data.quoteText
      })
    } 
    catch (error) {
      next(error)
    }
  }
}

module.exports = RandomQuotes