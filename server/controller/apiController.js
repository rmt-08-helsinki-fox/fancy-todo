const axios = require('axios')

class Controller {

  static getQuotes (req, res, next) {
    axios({
      method: 'GET',
      url: 'https://favqs.com/api/qotd'
    })
      .then(({ data }) => {
        const payload = {
          author: data.quote.author,
          quote: data.quote.body
        }
        res.status(200).json(payload)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

module.exports = Controller