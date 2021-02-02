const axios = require('axios')

function quoteOfTheDay (req, res, next) {
  axios({
    method: 'GET',
    url: 'https://favqs.com/api/qotd'
  })
    .then(({ data }) => {
      res.status(200).json(data)
    })
    .catch(err => {
      console.log(err)
    })
}

module.exports = quoteOfTheDay