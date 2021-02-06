const axios = require('axios')

class DashboardController {
  static calender(req, res) {
    axios.get('https://calendarific.com/api/v2/holidays/', {
      params: {
        api_key: process.env.API_KEY_CALENDER,
        country: 'ID',
        year: '2021'
      }
    })
      .then(result => {
        res.status(200).json(result.data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static covid(req, res) {
    axios.get('https://covid-api.mmediagroup.fr/v1/cases', {
      params: {
        country: 'Indonesia'
      }
    })
      .then(result => {
        res.status(200).json(result.data.All)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static newyorktimes(req, res) {
    axios.get(`https://api.nytimes.com/svc/topstories/v2/home.json`, {
      params: {
        'api-key': process.env.NEWS_API_KEY
      }
    })
      .then(response => {
        let results = response.data.results.slice(0, 4);
        let output = [];
        let objOutput = {};
        results.forEach(result => {
          objOutput = {
            title: result.title,
            abstract: result.abstract,
            url: result.url,
            imageUrl: result.multimedia[0].url
          }
          output.push(objOutput);
        })
        res.status(200).json(output);
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }

  static weather(req, res) {
    axios.get('https://www.metaweather.com/api/location/1047378/')
      .then(result => {
        res.status(200).json(result.data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static bmkg(req, res) {
    axios.get('https://ibnux.github.io/BMKG-importer/cuaca/501193.json')
      .then(result => {
        res.status(200).json(result.data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }


}

module.exports = DashboardController