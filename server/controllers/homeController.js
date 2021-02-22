const axios = require('axios');
const { response } = require('express');


class HomeController {

  static showHome(req, res, next) {
    axios.get('http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en')
    .then(quotes => {
      let dataQuotes;
      if(quotes.data.quoteText) {
          dataQuotes = {
          quotes: quotes.data.quoteText,
          author: `-${quotes.data.quoteAuthor}` || '-unknown'
        }
      } else {
        dataQuotes = {
          quotes: 'Glad to see you again!',
          author: `-Sutin`
        }
      }
      res.status(200).json(dataQuotes)
    })
    .catch(err => {
      next(err)
    })

  }
}

module.exports = HomeController